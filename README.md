# Kent State Stark Computer Club Website

Lightweight, high-performance static website for the Kent State University Stark Computer Club.

## Features & Performance

- **Zero Frameworks / Pure Static**: Stripped of React, Next.js, and heavy client-side JavaScript bundles.
- **Minimal TCP Packets ("14KB Rule")**: The entire page (HTML, inline styling, embedded SVG icons, and vanilla scripts) fits within the initial TCP congestion window (~14.6 KB) and transfers in a single round-trip over gzip/brotli.
- **No Heavy Assets**: Replaced 10+ MB of unoptimized background images and favicons with native CSS gradients and a 300-byte SVG favicon.
- **Live Meeting Countdown**: Real-time ticker counting down to weekly Friday meetings at 11:30 AM EST/EDT.
- **Discord Card Integration**: Community server widget with live online presence and member counts via edge-cached `/api/discord`.
- **Contact Form**: Collapsible contact modal backed by zero-dependency `/api/contact` (Resend integration) with mailto fallback.
- **Responsive & Dark/Light Mode**: Auto-adapts to system appearance preferences with Kent State Navy & Gold accents.

## Environment Variables (Optional)

Configure these in your Vercel Project Settings if you want live Discord counters and automated email delivery:

| Variable | Description |
|---|---|
| `DISCORD_INVITE` | Discord invite code (e.g. `xyz123` from `discord.gg/xyz123`) |
| `RESEND_API_KEY` | Resend API key for delivering contact form messages |
| `CONTACT_TO_EMAIL` | Destination email address to receive contact submissions |

## Reverting to Previous Version

The previous Next.js / React implementation is safely archived on the `archive/react-nextjs` branch:

```bash
# To view or switch to the archived React branch:
git checkout archive/react-nextjs

# To restore main back to the React version if ever needed:
git checkout main
git reset --hard archive/react-nextjs
```
