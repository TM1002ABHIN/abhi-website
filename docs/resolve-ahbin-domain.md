# Resolve ahbin.com Vercel Domain Blocker

## Current state

The ABHIN website deploys successfully to Vercel, but the project has no custom domains attached and production is not publicly live.

Known project details:

- Vercel team ID: `team_uDsRWNC7MFhK1YvBhZBaWstH`
- Vercel project ID: `prj_qTUAAxH0FQJLhVItpQMKc7HC6RFQ`
- Vercel project name: `abhi-website`
- Latest production deployment after redirect fix: `dpl_8gFSderDiHyPkQ2iwFyj5K32UC95`

## Required Vercel actions

Open Vercel dashboard:

1. Go to `abhi-website`.
2. Open **Settings > Domains**.
3. Add these domains:
   - `ahbin.com`
   - `www.ahbin.com`
4. Follow any verification prompt shown by Vercel.
5. Open **Settings > Deployment Protection**.
6. Disable authentication/protection for production if the website should be public.

## Required DNS records

At the domain registrar or DNS provider, point the domain to Vercel:

- Root/apex `ahbin.com`: use the A record target shown by Vercel for apex domains.
- `www.ahbin.com`: use the CNAME target shown by Vercel, commonly Vercel's CNAME target.

Use the exact DNS records shown by Vercel because verification requirements can vary by account and domain state.

## Verification checklist

After DNS propagates:

```bash
nslookup ahbin.com
nslookup www.ahbin.com
curl -I https://ahbin.com
curl -I https://www.ahbin.com
```

Expected result:

- `https://ahbin.com` returns a permanent redirect to `https://www.ahbin.com`.
- `https://www.ahbin.com` returns `200 OK`.
- TLS certificate is valid.
- No Vercel Authentication page appears.

## Why this cannot be fixed only in code

The repository already contains Vercel redirect configuration. The remaining blocker lives in Vercel project settings and DNS provider settings, not in the website code.
