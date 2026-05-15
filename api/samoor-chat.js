const { Pool } = require('pg');

let pool;
function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

function safeText(value, max = 4000) {
  return String(value || '').slice(0, max).trim();
}

function detectLeadIntent(message) {
  const text = message.toLowerCase();
  const keywords = [
    'contact', 'call', 'email', 'meeting', 'quote', 'proposal', 'partnership', 'partner',
    'consult', 'advisory', 'service', 'governance', 'ai', 'transformation', 'invest',
    'تواصل', 'اتصال', 'شراكة', 'استشارة', 'عرض', 'اجتماع', 'حوكمة', 'ذكاء'
  ];
  return keywords.some((word) => text.includes(word));
}

async function ensureTables(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS samoor_conversations (
      id BIGSERIAL PRIMARY KEY,
      session_id TEXT,
      visitor_name TEXT,
      visitor_email TEXT,
      visitor_company TEXT,
      language TEXT,
      user_message TEXT NOT NULL,
      assistant_reply TEXT NOT NULL,
      lead_intent BOOLEAN DEFAULT FALSE,
      source TEXT DEFAULT 'website_chat',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS samoor_leads (
      id BIGSERIAL PRIMARY KEY,
      session_id TEXT,
      visitor_name TEXT,
      visitor_email TEXT,
      visitor_company TEXT,
      language TEXT,
      requirement TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

async function saveConversation(payload) {
  const db = getPool();
  if (!db) return { stored: false, reason: 'DATABASE_URL is not configured' };
  const client = await db.connect();
  try {
    await ensureTables(client);
    await client.query(
      `INSERT INTO samoor_conversations
       (session_id, visitor_name, visitor_email, visitor_company, language, user_message, assistant_reply, lead_intent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        payload.sessionId,
        payload.visitorName,
        payload.visitorEmail,
        payload.visitorCompany,
        payload.language,
        payload.message,
        payload.reply,
        payload.leadIntent,
      ]
    );
    if (payload.leadIntent || payload.visitorEmail) {
      await client.query(
        `INSERT INTO samoor_leads
         (session_id, visitor_name, visitor_email, visitor_company, language, requirement)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          payload.sessionId,
          payload.visitorName,
          payload.visitorEmail,
          payload.visitorCompany,
          payload.language,
          payload.message,
        ]
      );
    }
    return { stored: true };
  } finally {
    client.release();
  }
}

async function notifyLead(payload) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook || (!payload.leadIntent && !payload.visitorEmail)) return { notified: false };
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'ABHIN Samoor website chat',
        sessionId: payload.sessionId,
        visitorName: payload.visitorName,
        visitorEmail: payload.visitorEmail,
        visitorCompany: payload.visitorCompany,
        language: payload.language,
        message: payload.message,
        reply: payload.reply,
        leadIntent: payload.leadIntent,
        createdAt: new Date().toISOString(),
      }),
    });
    return { notified: response.ok };
  } catch (error) {
    return { notified: false, error: error.message };
  }
}

function fallbackReply(message, language) {
  if (language === 'ar') {
    return 'حياك الله، أنا Samoor مساعد ABHIN الذكي. أقدر أساعدك بمعلومات الشركة، الاستشارات، الشراكات، الحوكمة والتحول بالذكاء الاصطناعي. اكتب اسمك وبريدك واحتياجك وسأجهز الطلب للفريق.';
  }
  const lower = message.toLowerCase();
  if (lower.includes('partnership') || lower.includes('partner')) {
    return 'Thank you. I am Samoor, ABHIN’s AI assistant. Please share your organization name, country, objective, and preferred partnership model. I will prepare this as a lead for the ABHIN team.';
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('call') || lower.includes('meeting')) {
    return 'Thank you. Please share your name, email, company, and preferred meeting topic. I will capture the inquiry for ABHIN follow-up.';
  }
  if (lower.includes('ai') || lower.includes('governance') || lower.includes('consult')) {
    return 'ABHIN can support strategic advisory, governance, AI transformation, market expansion, and partnership development. Please describe your requirement and I will classify it for the ABHIN team.';
  }
  return 'Hello, I am Samoor, ABHIN’s AI assistant. I can help with company information, strategic advisory, AI transformation, governance support, partnerships, and routing inquiries to ABHIN.';
}

async function generateReply(message, language, leadIntent) {
  if (!process.env.OPENAI_API_KEY) return fallbackReply(message, language);

  const system = `You are Samoor, the official AI assistant for ABHIN, an international business, consultancy, governance, AI transformation, and strategic advisory platform based in Ajman Free Zone, UAE.

Your job:
- Answer visitors professionally and warmly.
- Explain ABHIN services: strategic business advisory, governance, AI transformation, operational improvement, market access, global partnerships, and UAE business support.
- If the visitor may be a lead, ask for name, email, company, country, requirement, and preferred contact method.
- Do not claim a human has already contacted them.
- Do not give legal, financial, or investment advice as final professional advice; say ABHIN can review formally.
- Keep answers concise, businesslike, and helpful.
- Respond in the visitor's language when clear. Default to English.`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: [
        { role: 'system', content: system },
        { role: 'user', content: `Language: ${language || 'en'}\nLead intent detected: ${leadIntent}\nVisitor message: ${message}` },
      ],
      max_output_tokens: 450,
    }),
  });

  if (!response.ok) return fallbackReply(message, language);
  const data = await response.json();
  return data.output_text || fallbackReply(message, language);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const message = safeText(body.message, 4000);
    const language = safeText(body.language || 'en', 20);
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const payload = {
      sessionId: safeText(body.sessionId || req.headers['x-vercel-id'] || '', 200),
      visitorName: safeText(body.visitorName, 200),
      visitorEmail: safeText(body.visitorEmail, 320),
      visitorCompany: safeText(body.visitorCompany, 240),
      language,
      message,
      leadIntent: detectLeadIntent(message),
    };

    const reply = await generateReply(message, language, payload.leadIntent);
    payload.reply = reply;

    const storage = await saveConversation(payload).catch((error) => ({ stored: false, error: error.message }));
    const notification = await notifyLead(payload);

    return res.status(200).json({
      reply,
      leadIntent: payload.leadIntent,
      stored: storage.stored,
      notified: notification.notified,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Samoor service error',
      reply: 'Samoor is temporarily unable to process this request. Please try again shortly or submit your inquiry through the contact form.',
    });
  }
};
