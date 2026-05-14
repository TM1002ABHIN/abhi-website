import React, { useState } from "react";

const colors = {
  ink: "#0F1720",
  deep: "#111827",
  slate: "#1E293B",
  steel: "#334155",
  bronze: "#9A7B4F",
  gold: "#C6A46B",
  sand: "#F7F5F0",
  cream: "#FCFBF8",
  pearl: "#F3F0EA",
  line: "#E5DED1",
  muted: "#64748B",
  white: "#FFFFFF",
};

const languages = {
  en: {
    dir: "ltr",
    name: "English",
    nav: ["About", "Platforms", "Strategy", "Contact"],
    heroBadge: "Independent investment and operations platform",
    heroTitle: "Building resilient companies with governance, capital, and operational excellence.",
    heroText:
      "ABHI is an international investment and consultancy platform focused on strategic advisory, governance, business transformation, AI-enabled operations, and long-term value creation across global sectors.",
    primary: "Explore the Platform",
    secondary: "Contact ABHI",
    visionLabel: "ABHI Standard",
    visionTitle: "Institutional discipline. Entrepreneurial execution.",
    visionText:
      "A platform built around governance, capital allocation, operating control, leadership, and market development.",
    aboutLabel: "About ABHI",
    aboutTitle: "A serious platform for investment, management, and scale.",
    aboutText1:
      "ABHI combines strategic investment, operational leadership, and governance discipline. The platform supports businesses from structuring and funding to execution, expansion, performance management, and transformation.",
    aboutText2:
      "The company follows a practical leadership model: protect margins, build demand, improve internal capability, strengthen customer value, and create sustainable partnerships.",
    platformsLabel: "Business Platforms",
    platformsTitle: "Focused sectors with measurable value creation.",
    platformsText:
      "ABHI prioritizes sectors where disciplined capital, market access, governance, and strong execution can create sustainable competitive advantage.",
    strategyLabel: "Strategic Model",
    strategyTitle: "Leadership through clarity, control, and execution.",
    strategyText:
      "The ABHI model combines market expansion, pricing discipline, customer segmentation, operational efficiency, financial control, and governance frameworks.",
    philosophyLabel: "Investment Philosophy",
    philosophyTitle: "Professional governance. Practical growth. Long-term returns.",
    philosophyText:
      "ABHI invests where it can add real operating value — improving structure, increasing capacity, building demand, strengthening teams, and protecting profitability.",
    contactLabel: "Contact",
    contactTitle: "Connect with ABHI.",
    contactText:
      "ABHI welcomes investor inquiries, strategic partnership requests, governance discussions, business transformation opportunities, and consultancy proposals.",
    aiAgent: "ABHI AI Agent",
    aiDesc: "Available for English, Arabic, German, and French inquiries.",
    aiButton: "Open Assistant",
    location: "Location",
    email: "Email",
    footer: "International investment, consultancy, and governance platform.",
    chatWelcome: "Welcome to ABHI AI. How can I assist you with investment advisory, consultancy, partnerships, or governance?",
    chatReceived: "Thank you. ABHI AI has received your inquiry. A live AI backend can be connected here to provide full multilingual responses, qualify requests, and route opportunities to the right team.",
    chatHeader: "ABHI AI Agent",
    chatSub: "English • UAE Arabic • Deutsch • Français",
    chatPlaceholder: "Type your message...",
    chatSend: "Send",
    chatFloating: "Live multilingual assistant",
    quickReplies: ["Strategic business advisory", "Partnership request", "AI consulting", "Governance support"],
  },
  ar: {
    dir: "rtl",
    name: "العربية",
    nav: ["من نحن", "المنصات", "الاستراتيجية", "تواصل معنا"],
    heroBadge: "منصة استثمار وتشغيل مستقلة",
    heroTitle: "بناء شركات قوية من خلال الحوكمة ورأس المال والتميز التشغيلي.",
    heroText:
      "تم تصميم ABHI كمنصة استثمار وتشغيل بمعايير دولية تركز على خلق قيمة طويلة الأمد في قطاعات الأغذية واللوجستيات والنقل والاستثمارات الاستراتيجية.",
    primary: "استكشف المنصة",
    secondary: "تواصل مع ABHI",
    visionLabel: "معيار ABHI",
    visionTitle: "انضباط مؤسسي وتنفيذ ريادي.",
    visionText: "منصة قائمة على الحوكمة وتخصيص رأس المال والسيطرة التشغيلية والقيادة وتطوير الأسواق.",
    aboutLabel: "عن ABHI",
    aboutTitle: "منصة جادة للاستثمار والإدارة والتوسع.",
    aboutText1:
      "تجمع ABHI بين الاستثمار الاستراتيجي والقيادة التشغيلية والانضباط في الحوكمة، وتدعم الشركات من مرحلة الهيكلة والتمويل إلى التنفيذ والتوسع وإدارة الأداء والتحول.",
    aboutText2:
      "تتبع الشركة نموذج قيادة عملي يركز على حماية الهوامش وبناء الطلب وتطوير القدرات الداخلية وتعزيز قيمة العملاء وبناء شراكات مستدامة.",
    platformsLabel: "منصات الأعمال",
    platformsTitle: "قطاعات مركزة لخلق قيمة قابلة للقياس.",
    platformsText:
      "تركز ABHI على القطاعات التي يمكن فيها لرأس المال المنضبط والوصول إلى الأسواق والحوكمة والتنفيذ القوي أن تصنع ميزة تنافسية مستدامة.",
    strategyLabel: "النموذج الاستراتيجي",
    strategyTitle: "قيادة من خلال الوضوح والسيطرة والتنفيذ.",
    strategyText:
      "يجمع نموذج ABHI بين التوسع في الأسواق والانضباط السعري وتقسيم العملاء والكفاءة التشغيلية والرقابة المالية وأطر الحوكمة.",
    philosophyLabel: "فلسفة الاستثمار",
    philosophyTitle: "حوكمة مهنية ونمو عملي وعوائد طويلة الأمد.",
    philosophyText:
      "تستثمر ABHI حيث يمكنها إضافة قيمة تشغيلية حقيقية من خلال تحسين الهيكل وزيادة القدرة وبناء الطلب وتقوية الفرق وحماية الربحية.",
    contactLabel: "تواصل معنا",
    contactTitle: "تواصل مع ABHI.",
    contactText:
      "ترحب ABHI باستفسارات المستثمرين وطلبات الشراكات الاستراتيجية ونقاشات الحوكمة وفرص تطوير الأعمال والمقترحات الاستشارية.",
    aiAgent: "وكيل ABHI الذكي",
    aiDesc: "متاح للاستفسارات بالعربية والإنجليزية والألمانية والفرنسية.",
    aiButton: "افتح المساعد",
    location: "الموقع",
    email: "البريد الإلكتروني",
    footer: "منصة دولية للاستثمار والاستشارات والحوكمة.",
    chatWelcome: "حياك الله في وكيل ABHI الذكي. كيف نقدر نساعدك بخصوص الاستشارات الاستثمارية أو الشراكات أو الحوكمة أو تطوير الأعمال؟",
    chatReceived: "تم استلام طلبك، وشكراً لتواصلك. وكيل ABHI الذكي جاهز للربط لاحقاً مع نظام ذكاء اصطناعي مباشر يرد باللهجة الإماراتية/الخليجية المناسبة للأعمال، ويصنف الطلب ويوجهه للفريق المختص.",
    chatHeader: "وكيل ABHI الذكي",
    chatSub: "العربية الإماراتية • English • Deutsch • Français",
    chatPlaceholder: "اكتب رسالتك...",
    chatSend: "إرسال",
    chatFloating: "مساعد ذكي متعدد اللغات",
    quickReplies: ["استشارة استراتيجية للأعمال", "طلب شراكة", "استشارات ذكاء اصطناعي", "دعم الحوكمة"],
  },
  de: {
    dir: "ltr",
    name: "Deutsch",
    nav: ["Über uns", "Plattformen", "Strategie", "Kontakt"],
    heroBadge: "Unabhängige Investment- und Operationsplattform",
    heroTitle: "Wir bauen widerstandsfähige Unternehmen mit Governance, Kapital und operativer Exzellenz.",
    heroText:
      "ABHI ist als Investment- und Betriebsplattform nach internationalem Standard konzipiert und fokussiert auf langfristige Wertschöpfung in Lebensmittelindustrie, Logistik, Transport und strategischen Sektoren.",
    primary: "Plattform entdecken",
    secondary: "ABHI kontaktieren",
    visionLabel: "ABHI Standard",
    visionTitle: "Institutionelle Disziplin. Unternehmerische Umsetzung.",
    visionText: "Eine Plattform für Governance, Kapitalallokation, operative Kontrolle, Führung und Marktentwicklung.",
    aboutLabel: "Über ABHI",
    aboutTitle: "Eine professionelle Plattform für Investition, Management und Skalierung.",
    aboutText1:
      "ABHI verbindet strategische Investitionen, operative Führung und Governance-Disziplin. Die Plattform unterstützt Unternehmen von Strukturierung und Finanzierung bis Umsetzung, Expansion und Transformation.",
    aboutText2:
      "Das Führungsmodell ist praktisch: Margen schützen, Nachfrage aufbauen, interne Fähigkeiten verbessern, Kundennutzen stärken und nachhaltige Partnerschaften schaffen.",
    platformsLabel: "Geschäftsplattformen",
    platformsTitle: "Fokussierte Sektoren mit messbarer Wertschöpfung.",
    platformsText:
      "ABHI priorisiert Sektoren, in denen diszipliniertes Kapital, Marktzugang, Governance und starke Umsetzung nachhaltige Vorteile schaffen.",
    strategyLabel: "Strategisches Modell",
    strategyTitle: "Führung durch Klarheit, Kontrolle und Umsetzung.",
    strategyText:
      "Das ABHI-Modell kombiniert Marktexpansion, Preisdisziplin, Kundensegmentierung, operative Effizienz, Finanzkontrolle und Governance-Rahmenwerke.",
    philosophyLabel: "Investmentphilosophie",
    philosophyTitle: "Professionelle Governance. Praktisches Wachstum. Langfristige Renditen.",
    philosophyText:
      "ABHI investiert dort, wo echte operative Wertsteigerung möglich ist — durch Strukturverbesserung, Kapazitätsaufbau, Nachfrageentwicklung und Profitabilitätsschutz.",
    contactLabel: "Kontakt",
    contactTitle: "Kontaktieren Sie ABHI.",
    contactText:
      "ABHI begrüßt Investorenanfragen, strategische Partnerschaften, Governance-Gespräche, Transformationsprojekte und Beratungsanfragen.",
    aiAgent: "ABHI KI-Agent",
    aiDesc: "Verfügbar für Anfragen auf Englisch, Arabisch, Deutsch und Französisch.",
    aiButton: "Assistent öffnen",
    location: "Standort",
    email: "E-Mail",
    footer: "Internationale Investment-, Beratungs- und Governance-Plattform.",
    chatWelcome: "Willkommen beim ABHI KI-Agenten. Wie können wir Sie bei Investmentberatung, Consulting, Partnerschaften oder Governance unterstützen?",
    chatReceived: "Vielen Dank. ABHI AI hat Ihre Anfrage erhalten. Ein Live-KI-Backend kann hier später verbunden werden, um vollständige mehrsprachige Antworten zu liefern, Anfragen zu qualifizieren und Chancen an das passende Team weiterzuleiten.",
    chatHeader: "ABHI KI-Agent",
    chatSub: "Deutsch • English • العربية الإماراتية • Français",
    chatPlaceholder: "Nachricht eingeben...",
    chatSend: "Senden",
    chatFloating: "Mehrsprachiger KI-Assistent",
    quickReplies: ["Strategische Unternehmensberatung", "Partnerschaftsanfrage", "KI-Beratung", "Governance-Unterstützung"],
  },
  fr: {
    dir: "ltr",
    name: "Français",
    nav: ["À propos", "Plateformes", "Stratégie", "Contact"],
    heroBadge: "Plateforme indépendante d’investissement et d’exploitation",
    heroTitle: "Construire des entreprises solides grâce à la gouvernance, au capital et à l’excellence opérationnelle.",
    heroText:
      "ABHI est conçue comme une plateforme d’investissement et d’exploitation aux standards internationaux, axée sur la création de valeur à long terme dans l’agro-industrie, la logistique, le transport et les secteurs stratégiques.",
    primary: "Explorer la plateforme",
    secondary: "Contacter ABHI",
    visionLabel: "Standard ABHI",
    visionTitle: "Discipline institutionnelle. Exécution entrepreneuriale.",
    visionText: "Une plateforme fondée sur la gouvernance, l’allocation du capital, le contrôle opérationnel, le leadership et le développement des marchés.",
    aboutLabel: "À propos d’ABHI",
    aboutTitle: "Une plateforme professionnelle pour investir, gérer et développer.",
    aboutText1:
      "ABHI combine investissement stratégique, leadership opérationnel et discipline de gouvernance. La plateforme accompagne les entreprises de la structuration et du financement jusqu’à l’exécution, l’expansion et la transformation.",
    aboutText2:
      "Le modèle de leadership est pratique : protéger les marges, créer la demande, renforcer les capacités internes, améliorer la valeur client et bâtir des partenariats durables.",
    platformsLabel: "Plateformes d’affaires",
    platformsTitle: "Des secteurs ciblés pour une création de valeur mesurable.",
    platformsText:
      "ABHI privilégie les secteurs où le capital discipliné, l’accès au marché, la gouvernance et l’exécution forte créent un avantage durable.",
    strategyLabel: "Modèle stratégique",
    strategyTitle: "Leadership par la clarté, le contrôle et l’exécution.",
    strategyText:
      "Le modèle ABHI combine expansion de marché, discipline tarifaire, segmentation client, efficacité opérationnelle, contrôle financier et cadres de gouvernance.",
    philosophyLabel: "Philosophie d’investissement",
    philosophyTitle: "Gouvernance professionnelle. Croissance pratique. Rendements durables.",
    philosophyText:
      "ABHI investit là où elle peut ajouter une vraie valeur opérationnelle — améliorer la structure, augmenter la capacité, créer la demande, renforcer les équipes et protéger la rentabilité.",
    contactLabel: "Contact",
    contactTitle: "Contactez ABHI.",
    contactText:
      "ABHI accueille les demandes d’investisseurs, les partenariats stratégiques, les discussions de gouvernance, les opportunités de transformation et les propositions de conseil.",
    aiAgent: "Agent IA ABHI",
    aiDesc: "Disponible pour les demandes en anglais, arabe, allemand et français.",
    aiButton: "Ouvrir l’assistant",
    location: "Localisation",
    email: "E-mail",
    footer: "Plateforme internationale d’investissement, de conseil et de gouvernance.",
    chatWelcome: "Bienvenue chez l’agent IA ABHI. Comment pouvons-nous vous aider concernant le conseil en investissement, les partenariats, la gouvernance ou la transformation?",
    chatReceived: "Merci. ABHI AI a reçu votre demande. Un backend IA en direct pourra être connecté ici pour fournir des réponses multilingues complètes, qualifier les demandes et orienter les opportunités vers la bonne équipe.",
    chatHeader: "Agent IA ABHI",
    chatSub: "Français • English • العربية الإماراتية • Deutsch",
    chatPlaceholder: "Écrivez votre message...",
    chatSend: "Envoyer",
    chatFloating: "Assistant IA multilingue",
    quickReplies: ["Conseil stratégique d’entreprise", "Demande de partenariat", "Conseil IA", "Support gouvernance"],
  },
};

const platformData = {
  en: [
    ["01", "Strategic Investment Advisory", "Executive advisory, investment strategy, governance structuring, and long-term value creation frameworks for institutions and enterprises."],
    ["02", "Business Transformation & AI", "AI-enabled operational consulting, leadership transformation, digital modernization, and performance optimization."],
    ["03", "Global Partnerships & Expansion", "Cross-border partnerships, regional expansion strategies, investor relations, and international market positioning."],
  ],
  ar: [
    ["01", "الاستشارات الاستثمارية الاستراتيجية", "استشارات تنفيذية واستراتيجيات استثمار وهيكلة حوكمة وبناء أطر لخلق القيمة طويلة الأمد للمؤسسات والشركات."],
    ["02", "تحول الأعمال والذكاء الاصطناعي", "استشارات تشغيلية مدعومة بالذكاء الاصطناعي وتحول قيادي وتحديث رقمي وتحسين الأداء."],
    ["03", "الشراكات والتوسع العالمي", "شراكات عابرة للحدود واستراتيجيات توسع إقليمي وعلاقات مستثمرين وتموضع دولي في الأسواق."],
  ],
  de: [
    ["01", "Strategische Investmentberatung", "Executive Advisory, Investmentstrategie, Governance-Strukturierung und langfristige Wertschöpfungsmodelle für Institutionen und Unternehmen."],
    ["02", "Transformation & KI", "KI-gestützte operative Beratung, Führungstransformation, digitale Modernisierung und Leistungsoptimierung."],
    ["03", "Globale Partnerschaften & Expansion", "Internationale Partnerschaften, regionale Expansionsstrategien, Investor Relations und globale Marktpositionierung."],
  ],
  fr: [
    ["01", "Conseil stratégique en investissement", "Conseil exécutif, stratégie d’investissement, structuration de gouvernance et création de valeur à long terme pour les institutions et entreprises."],
    ["02", "Transformation & Intelligence Artificielle", "Conseil opérationnel assisté par IA, transformation du leadership, modernisation numérique et optimisation des performances."],
    ["03", "Partenariats mondiaux & Expansion", "Partenariats internationaux, stratégies d’expansion régionale, relations investisseurs et positionnement mondial."],
  ],
};

const metrics = [
  ["Global", "International Presence"],
  ["AI", "Strategic Intelligence"],
  ["Multi", "Multilingual Platform"],
  ["UAE", "Regional Headquarters"],
];

const pillars = ["Governance", "Capital Allocation", "Operational Control", "Market Expansion"];

function Button({ children, secondary = false }) {
  return (
    <button
      style={{
        border: secondary ? `1px solid rgba(255,255,255,0.35)` : "none",
        background: secondary ? "rgba(255,255,255,0.08)" : colors.bronze,
        color: "white",
        padding: "14px 22px",
        borderRadius: 999,
        fontWeight: 800,
        cursor: "pointer",
        letterSpacing: 0.2,
        boxShadow: secondary ? "none" : "0 18px 36px rgba(111,87,55,0.28)",
      }}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{ color: colors.bronze, fontSize: 12, fontWeight: 900, letterSpacing: 4.5, textTransform: "uppercase", margin: 0 }}>
      {children}
    </p>
  );
}

function CorporateCard({ children, dark = false }) {
  return (
    <div
      style={{
        background: dark ? "rgba(255,255,255,0.075)" : colors.cream,
        border: `1px solid ${dark ? "rgba(255,255,255,0.16)" : colors.line}`,
        borderRadius: 26,
        padding: 30,
        boxShadow: dark ? "none" : "0 24px 70px rgba(31,42,36,0.08)",
      }}
    >
      {children}
    </div>
  );
}

const container = {
  width: "min(1220px, calc(100% - 42px))",
  margin: "0 auto",
};

export default function ABHIAdvancedWebsite() {
  const [lang, setLang] = useState("en");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", company: "", interest: "", message: "" });
  const t = languages[lang];
  const platforms = platformData[lang];
  const displayMessages = messages.length ? messages : [{ role: "agent", text: t.chatWelcome }];

  const handleLeadSubmit = (event) => {
    event.preventDefault();
    setChatOpen(true);
    setMessages((current) => [
      ...current,
      {
        role: "agent",
        text: `Thank you ${leadForm.name || ""}. ABHI has received your request regarding ${leadForm.interest || "your inquiry"}. Our corporate team can review and follow up through the approved communication channel.`,
      },
    ]);
    setLeadForm({ name: "", company: "", interest: "", message: "" });
  };

  const sendMessage = async (preset) => {
    const text = preset || chatInput.trim();
    if (!text || isSending) return;

    const userMessage = { role: "user", text };
    const nextMessages = [...displayMessages, userMessage].filter((message) => message.text !== t.chatWelcome || messages.length > 0);

    setMessages((current) => [...current, userMessage]);
    setChatInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/abhi-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: lang,
          message: text,
          history: nextMessages.map((message) => ({ role: message.role, content: message.text })),
          company: "ABHI",
        }),
      });

      if (!response.ok) throw new Error("AI service unavailable");

      const data = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: "agent",
          text: data.reply || t.chatReceived,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "agent",
          text: t.chatReceived,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div dir={t.dir} style={{ minHeight: "100vh", background: colors.sand, color: colors.ink, fontFamily: "Inter, Arial, sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(15,23,32,0.88)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(18px)" }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: colors.cream, color: colors.deep, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 950, fontSize: 20 }}>
              A
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 950, fontSize: 20, letterSpacing: 1.4 }}>ABHI</div>
              <div style={{ color: "#D7CCBA", fontSize: 12 }}>{t.footer}</div>
            </div>
          </div>

          <nav style={{ display: "flex", gap: 22, fontSize: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {t.nav.map((label, index) => {
              const links = ["#about", "#platforms", "#strategy", "#contact"];
              return (
                <a key={label} href={links[index]} style={{ color: "#F3EFE6", textDecoration: "none", fontWeight: 750 }}>{label}</a>
              );
            })}
            <select
              aria-label="Select website language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 999,
                padding: "9px 12px",
                fontWeight: 800,
                outline: "none",
              }}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
          </nav>
        </div>
      </header>

      <main>
        <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${colors.deep} 0%, ${colors.slate} 40%, ${colors.steel} 72%, ${colors.bronze} 100%)`, color: "white" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "72px 72px", opacity: 0.28 }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(198,164,107,0.22), transparent 28%), radial-gradient(circle at 10% 80%, rgba(255,255,255,0.08), transparent 30%)" }} />

          <div style={{ ...container, position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 46, padding: "98px 0 108px" }}>
            <div>
              <div style={{ display: "inline-flex", border: "1px solid rgba(255,255,255,0.24)", borderRadius: 999, padding: "10px 15px", color: "#EFE6D6", fontWeight: 800, fontSize: 14, marginBottom: 26 }}>
                {t.heroBadge}
              </div>
              <h1 style={{ fontSize: "clamp(42px, 5.8vw, 78px)", lineHeight: 0.97, margin: 0, letterSpacing: -2.4, color: "white", maxWidth: 900 }}>
                {t.heroTitle}
              </h1>
              <p style={{ marginTop: 28, maxWidth: 720, color: "#EFE6D6", fontSize: 18.5, lineHeight: 1.85 }}>
                {t.heroText}
              </p>
              <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginRight: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: colors.gold, boxShadow: "0 0 18px rgba(198,164,107,0.9)" }} />
                  <span style={{ color: "#D6DCE5", fontSize: 14, letterSpacing: 1 }}>GLOBAL • AI ENABLED • MULTILINGUAL</span>
                </div>
                <Button>{t.primary}</Button>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    border: `1px solid rgba(255,255,255,0.35)`,
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    padding: "14px 22px",
                    borderRadius: 999,
                    fontWeight: 800,
                    cursor: "pointer",
                    letterSpacing: 0.2,
                  }}
                >
                  {t.secondary}
                </button>
              </div>
            </div>

            <CorporateCard dark>
              <SectionLabel>{t.visionLabel}</SectionLabel>
              <h2 style={{ color: "white", fontSize: 34, lineHeight: 1.1, margin: "18px 0 10px" }}>{t.visionTitle}</h2>
              <p style={{ color: "#EFE6D6", lineHeight: 1.75, fontSize: 16.5 }}>{t.visionText}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginTop: 30 }}>
                {metrics.map(([value, label]) => (
                  <div key={label} style={{ border: "1px solid rgba(255,255,255,0.16)", borderRadius: 19, padding: 16, background: "rgba(255,255,255,0.08)" }}>
                    <div style={{ color: "white", fontSize: 27, fontWeight: 950 }}>{value}</div>
                    <div style={{ color: "#D7CCBA", fontSize: 12, marginTop: 5 }}>{label}</div>
                  </div>
                ))}
              </div>
            </CorporateCard>
          </div>
        </section>

        <section style={{ background: colors.cream, borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}` }}>
          <div style={{ ...container, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 0 }}>
            {[
              ["Global", "International Investment & Advisory"],
              ["UAE", "Headquartered in Ajman"],
              ["AI", "AI-Driven Strategic Intelligence"],
              ["Multi", "Multilingual Communication"],
            ].map(([value, label]) => (
              <div key={label} style={{ padding: "34px 26px", borderRight: `1px solid ${colors.line}` }}>
                <div style={{ fontSize: 38, fontWeight: 900, color: colors.deep }}>{value}</div>
                <div style={{ color: colors.muted, marginTop: 8, lineHeight: 1.5 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ position: "relative", overflow: "hidden", background: colors.deep }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.28 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(15,23,32,0.92), rgba(15,23,32,0.68))" }} />
          <div style={{ ...container, position: "relative", padding: "120px 0" }}>
            <div style={{ maxWidth: 760 }}>
              <SectionLabel>United Arab Emirates</SectionLabel>
              <h2 style={{ color: "white", fontSize: "clamp(42px,5vw,72px)", lineHeight: 1.02, margin: "18px 0" }}>
                A platform inspired by the UAE vision for innovation, leadership, and global connectivity.
              </h2>
              <p style={{ color: "#D7CCBA", fontSize: 20, lineHeight: 1.9, maxWidth: 680 }}>
                ABHI reflects the modern UAE identity — ambitious, globally connected, technology-driven, and focused on sustainable long-term growth.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
                <div style={{ width: 76, height: 48, borderRadius: 10, overflow: "hidden", boxShadow: "0 10px 24px rgba(0,0,0,0.35)", display: "flex", background: "white" }}>
                  <div style={{ width: "25%", height: "100%", background: "#CE1126" }} />
                  <div style={{ width: "75%", height: "100%" }}>
                    <div style={{ height: "33.333%", background: "#00732F" }} />
                    <div style={{ height: "33.333%", background: "#FFFFFF" }} />
                    <div style={{ height: "33.333%", background: "#000000" }} />
                  </div>
                </div>
                <div style={{ color: "white", fontWeight: 800, letterSpacing: 2 }}>UNITED ARAB EMIRATES</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: colors.deep, padding: "90px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ ...container }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 20, flexWrap: "wrap", marginBottom: 42 }}>
              <div>
                <SectionLabel>Interactive UAE Experience</SectionLabel>
                <h2 style={{ color: "white", fontSize: "clamp(36px,4vw,60px)", lineHeight: 1.02, margin: "18px 0 0" }}>
                  A modern UAE-inspired digital presence.
                </h2>
              </div>
              <div style={{ color: "#D7CCBA", maxWidth: 460, lineHeight: 1.8, fontSize: 17 }}>
                Cinematic visuals inspired by the UAE’s leadership, innovation, architecture, and international connectivity.
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 22 }}>
              <div style={{ position: "relative", borderRadius: 30, overflow: "hidden", minHeight: 520, background: "#000" }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src="https://cdn.coverr.co/videos/coverr-dubai-skyline-at-night-1560911656626/1080p.mp4"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,32,0.82), rgba(15,23,32,0.15))" }} />
                <div style={{ position: "absolute", left: 34, bottom: 34, right: 34 }}>
                  <div style={{ color: colors.gold, fontWeight: 900, letterSpacing: 3, fontSize: 12 }}>GLOBAL PRESENCE</div>
                  <div style={{ color: "white", fontSize: 38, fontWeight: 900, marginTop: 12, lineHeight: 1.1 }}>
                    International vision inspired by the UAE future economy.
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 22 }}>
                <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", minHeight: 248, background: "#000" }}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src="https://cdn.coverr.co/videos/coverr-flying-over-dubai-5176/1080p.mp4"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,32,0.7), transparent)" }} />
                  <div style={{ position: "absolute", left: 24, bottom: 24, color: "white", fontWeight: 800, fontSize: 24 }}>
                    Innovation & Connectivity
                  </div>
                </div>

                <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", minHeight: 248, background: "#000" }}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src="https://cdn.coverr.co/videos/coverr-driving-through-dubai-1560911609484/1080p.mp4"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,32,0.7), transparent)" }} />
                  <div style={{ position: "absolute", left: 24, bottom: 24, color: "white", fontWeight: 800, fontSize: 24 }}>
                    Leadership & Transformation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" style={{ ...container, padding: "88px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 50, alignItems: "start" }}>
            <div>
              <SectionLabel>{t.aboutLabel}</SectionLabel>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.02, marginTop: 18, letterSpacing: -1.3 }}>{t.aboutTitle}</h2>
            </div>
            <div style={{ color: colors.muted, fontSize: 18, lineHeight: 1.9 }}>
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 28 }}>
                {pillars.map((pillar) => (
                  <div key={pillar} style={{ background: colors.cream, border: `1px solid ${colors.line}`, borderRadius: 16, padding: 15, fontWeight: 850, color: colors.deep }}>
                    {pillar}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="platforms" style={{ background: colors.cream, padding: "88px 0" }}>
          <div style={container}>
            <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
              <SectionLabel>{t.platformsLabel}</SectionLabel>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.04, margin: "18px 0 0", letterSpacing: -1.2 }}>{t.platformsTitle}</h2>
              <p style={{ color: colors.muted, fontSize: 18, lineHeight: 1.85 }}>{t.platformsText}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 52 }}>
              {platforms.map(([number, title, text]) => (
                <CorporateCard key={title}>
                  <div style={{ width: 56, height: 4, background: `linear-gradient(90deg, ${colors.gold}, transparent)`, borderRadius: 999, marginBottom: 22 }} />
                  <div style={{ color: colors.bronze, fontWeight: 950, fontSize: 14, letterSpacing: 3 }}>{number}</div>
                  <h3 style={{ fontSize: 25, margin: "18px 0 10px", letterSpacing: -0.5 }}>{title}</h3>
                  <p style={{ color: colors.muted, lineHeight: 1.78 }}>{text}</p>
                </CorporateCard>
              ))}
            </div>
          </div>
        </section>

        <section id="strategy" style={{ ...container, padding: "110px 0 88px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 50, alignItems: "center" }}>
            <div>
              <SectionLabel>{t.strategyLabel}</SectionLabel>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.04, marginTop: 18, letterSpacing: -1.2 }}>{t.strategyTitle}</h2>
              <p style={{ color: colors.muted, fontSize: 18, lineHeight: 1.85 }}>{t.strategyText}</p>
            </div>
            <CorporateCard>
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: colors.gold, fontWeight: 900, letterSpacing: 3, fontSize: 12 }}>EXECUTION FRAMEWORK</div>
                <div style={{ fontSize: 30, fontWeight: 900, marginTop: 10, color: colors.deep }}>Integrated leadership architecture</div>
              </div>
              {pillars.map((pillar, index) => (
                <div key={pillar} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, alignItems: "start", padding: "18px 0", borderBottom: index === pillars.length - 1 ? "none" : `1px solid ${colors.line}` }}>
                  <div style={{ width: 42, height: 42, borderRadius: 14, background: colors.deep, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 950 }}>{index + 1}</div>
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontSize: 20 }}>{pillar}</h3>
                    <p style={{ margin: 0, color: colors.muted, lineHeight: 1.65 }}>A disciplined capability supporting institutional-quality decisions and consistent execution.</p>
                  </div>
                </div>
              ))}
            </CorporateCard>
          </div>
        </section>

        <section style={{ background: colors.deep, color: "white", padding: "110px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(198,164,107,0.14), transparent 30%)" }} />
          <div style={container}>
            <div style={{ borderRadius: 34, padding: 4, background: `linear-gradient(135deg, ${colors.bronze}, #C7A875)` }}>
              <div style={{ borderRadius: 30, background: "linear-gradient(135deg, #26332B, #344438)", padding: 44 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 34, alignItems: "center" }}>
                  <div>
                    <SectionLabel>{t.philosophyLabel}</SectionLabel>
                    <h2 style={{ color: "white", fontSize: "clamp(33px, 4vw, 50px)", lineHeight: 1.05, marginTop: 18 }}>{t.philosophyTitle}</h2>
                    <p style={{ color: "#EFE6D6", fontSize: 18, lineHeight: 1.85 }}>{t.philosophyText}</p>
                  </div>
                  <div style={{ justifySelf: "start" }}>
                    <Button>{t.primary}</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" style={{ ...container, padding: "110px 0 88px" }}>
          <div style={{ marginBottom: 26, background: colors.pearl, border: `1px solid ${colors.line}`, borderRadius: 18, padding: 18 }}>
            <div style={{ color: colors.deep, fontWeight: 900, marginBottom: 8 }}>UAE Compliance Notice</div>
            <div style={{ color: colors.muted, lineHeight: 1.7, fontSize: 14 }}>
              ABHI presents information for general corporate communication purposes only. Nothing on this platform constitutes regulated financial services, securities offering, legal advice, banking activities, or licensed investment solicitation under the laws and regulations of the United Arab Emirates. Any regulated activities are subject to applicable UAE laws, licensing requirements, and competent authority approvals.
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 44 }}>
            <div>
              <SectionLabel>{t.contactLabel}</SectionLabel>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.04, marginTop: 18, letterSpacing: -1.2 }}>{t.contactTitle}</h2>
              <p style={{ color: colors.muted, fontSize: 18, lineHeight: 1.85 }}>{t.contactText}</p>
            </div>
            <CorporateCard>
              <form onSubmit={handleLeadSubmit} style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                <input
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  placeholder="Full name"
                  style={{ border: `1px solid ${colors.line}`, borderRadius: 14, padding: 13, fontSize: 14 }}
                />
                <input
                  value={leadForm.company}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  placeholder="Company / Organization"
                  style={{ border: `1px solid ${colors.line}`, borderRadius: 14, padding: 13, fontSize: 14 }}
                />
                <select
                  value={leadForm.interest}
                  onChange={(e) => setLeadForm({ ...leadForm, interest: e.target.value })}
                  style={{ border: `1px solid ${colors.line}`, borderRadius: 14, padding: 13, fontSize: 14, background: colors.white }}
                >
                  <option value="">Select inquiry type</option>
                  <option value="Strategic Business Advisory">Strategic Business Advisory</option>
                  <option value="Strategic Partnership">Strategic Partnership</option>
                  <option value="AI Transformation">AI Transformation</option>
                  <option value="Governance Consulting">Governance Consulting</option>
                  <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                </select>
                <textarea
                  value={leadForm.message}
                  onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                  placeholder="Brief message"
                  rows={4}
                  style={{ border: `1px solid ${colors.line}`, borderRadius: 14, padding: 13, fontSize: 14, resize: "vertical" }}
                />
                <button type="submit" style={{ border: "none", background: colors.bronze, color: "white", borderRadius: 999, padding: "14px 18px", fontWeight: 900, cursor: "pointer" }}>
                  Submit Corporate Inquiry
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 18, borderBottom: `1px solid ${colors.line}` }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: colors.deep }}>ABHI Contact Gateway</div>
                  <div style={{ color: colors.muted, marginTop: 6 }}>Secure multilingual corporate communication interface</div>
                </div>
                <div style={{ width: 14, height: 14, borderRadius: 999, background: "#10B981", boxShadow: "0 0 20px rgba(16,185,129,0.9)" }} />
              </div>
              {[
                ["⌂", t.location, "Ajman Free Zone, Ajman, United Arab Emirates"],
                
              ].map(([icon, label, value]) => (
                <div key={label} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 14, background: colors.pearl, border: `1px solid ${colors.line}`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.bronze, fontWeight: 950 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 950, fontSize: 17 }}>{label}</div>
                    <div style={{ color: colors.muted, marginTop: 5, lineHeight: 1.55 }}>{value}</div>
                  </div>
                </div>
              ))}
            </CorporateCard>
          </div>
        </section>
      </main>

      {chatOpen && (
        <div
          style={{
            position: "fixed",
            right: 26,
            bottom: 110,
            zIndex: 60,
            width: "min(390px, calc(100vw - 34px))",
            background: colors.cream,
            border: `1px solid ${colors.line}`,
            borderRadius: 28,
            boxShadow: "0 30px 80px rgba(15,23,32,0.28)",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "linear-gradient(135deg, #111827, #334155)", color: "white", padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 950, fontSize: 18 }}>{t.chatHeader}</div>
              <div style={{ color: "#D7CCBA", fontSize: 12, marginTop: 4 }}>{t.chatSub}</div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.18)", width: 34, height: 34, borderRadius: 999, cursor: "pointer", fontWeight: 900 }}>
              ×
            </button>
          </div>

          <div style={{ padding: 18, maxHeight: 330, overflowY: "auto", background: colors.pearl }}>
            {displayMessages.map((message, index) => (
              <div key={index} style={{ display: "flex", justifyContent: message.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "12px 14px",
                    borderRadius: message.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: message.role === "user" ? colors.bronze : colors.white,
                    color: message.role === "user" ? "white" : colors.ink,
                    border: message.role === "user" ? "none" : `1px solid ${colors.line}`,
                    lineHeight: 1.55,
                    fontSize: 14,
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, borderTop: `1px solid ${colors.line}` }}>
            {t.quickReplies.map((item) => (
              <button key={item} disabled={isSending} onClick={() => sendMessage(item)} style={{ border: `1px solid ${colors.line}`, background: colors.white, color: colors.deep, padding: "9px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: isSending ? "not-allowed" : "pointer", opacity: isSending ? 0.6 : 1 }}>
                {item}
              </button>
            ))}
          </div>

          {isSending && (
            <div style={{ padding: "0 18px 12px", background: colors.pearl, color: colors.muted, fontSize: 13 }}>
              ABHI AI is preparing a live response...
            </div>
          )}

          <div style={{ padding: 14, display: "flex", gap: 8, background: colors.cream }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder={t.chatPlaceholder}
              style={{ flex: 1, border: `1px solid ${colors.line}`, borderRadius: 999, padding: "12px 14px", outline: "none", fontSize: 14 }}
            />
            <button disabled={isSending} onClick={() => sendMessage()} style={{ border: "none", background: isSending ? colors.muted : colors.bronze, color: "white", borderRadius: 999, padding: "0 16px", fontWeight: 900, cursor: isSending ? "not-allowed" : "pointer" }}>
              {isSending ? "..." : t.chatSend}
            </button>
          </div>
        </div>
      )}

      <div
        onClick={() => setChatOpen(true)}
        style={{
          position: "fixed",
          right: 26,
          bottom: 28,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "linear-gradient(135deg, #1E293B, #334155)",
          color: "white",
          padding: "14px 18px",
          borderRadius: 999,
          boxShadow: "0 20px 45px rgba(15,23,32,0.35)",
          border: "1px solid rgba(255,255,255,0.12)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.bronze})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            boxShadow: "0 10px 24px rgba(198,164,107,0.35)",
          }}
        >
          ✦
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: 0.4 }}>ABHI AI</div>
          <div style={{ fontSize: 12, color: "#D7CCBA" }}>{t.chatFloating}</div>
        </div>
      </div>

      {!cookieAccepted && (
        <div style={{ position: "fixed", left: 24, bottom: 24, zIndex: 70, width: "min(420px, calc(100vw - 48px))", background: colors.cream, border: `1px solid ${colors.line}`, borderRadius: 24, padding: 20, boxShadow: "0 24px 70px rgba(15,23,32,0.25)" }}>
          <div style={{ fontWeight: 950, color: colors.deep, marginBottom: 8 }}>Cookie & Privacy Notice</div>
          <div style={{ color: colors.muted, lineHeight: 1.6, fontSize: 13 }}>
            ABHI may use cookies, analytics, CRM tools, and AI-assisted communication to improve the website experience and manage corporate inquiries. By continuing, you acknowledge our privacy and AI communication notice.
          </div>
          <button onClick={() => setCookieAccepted(true)} style={{ marginTop: 14, border: "none", background: colors.deep, color: "white", borderRadius: 999, padding: "10px 16px", fontWeight: 900, cursor: "pointer" }}>
            Accept
          </button>
        </div>
      )}

      <section style={{ background: colors.cream, borderTop: `1px solid ${colors.line}`, padding: "46px 0" }}>
        <div style={{ ...container, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
          <div>
            <div style={{ fontWeight: 950, color: colors.deep, marginBottom: 10 }}>Privacy Policy</div>
            <p style={{ color: colors.muted, lineHeight: 1.65, fontSize: 14 }}>ABHI handles submitted information for corporate communication, inquiry review, relationship management, and service improvement. Personal information should be processed in line with applicable UAE data protection requirements.</p>
          </div>
          <div>
            <div style={{ fontWeight: 950, color: colors.deep, marginBottom: 10 }}>Terms of Use</div>
            <p style={{ color: colors.muted, lineHeight: 1.65, fontSize: 14 }}>Website content is provided for general information only and does not create a client, advisory, investment, legal, financial, or fiduciary relationship.</p>
          </div>
          <div>
            <div style={{ fontWeight: 950, color: colors.deep, marginBottom: 10 }}>AI Disclaimer</div>
            <p style={{ color: colors.muted, lineHeight: 1.65, fontSize: 14 }}>The AI assistant supports preliminary communication only. Outputs may require human review and should not be treated as regulated advice, legal advice, financial advice, or official ABHI approval.</p>
          </div>
          <div>
            <div style={{ fontWeight: 950, color: colors.deep, marginBottom: 10 }}>Systems Ready</div>
            <p style={{ color: colors.muted, lineHeight: 1.65, fontSize: 14 }}>Prepared for OpenAI backend, analytics, CRM integration, lead routing, human escalation, multilingual support, and approved communication channels.</p>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${colors.line}`, padding: 32, textAlign: "center", color: colors.muted, fontSize: 14 }}>
        <div style={{ marginBottom: 10 }}>© 2026 ABHI. {t.footer}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>AI Disclaimer</span>
          <span>Cookie Notice</span>
          <span>UAE Compliance</span>
        </div>
      </footer>
    </div>
  );
}
