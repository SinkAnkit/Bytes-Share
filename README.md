# Bytes Share

A free online notepad to share text, code, and notes across any device. Paste your content, get a link, access it anywhere. Clips auto-expire in 24 hours.

**Live:** [bytesshare.vercel.app](https://bytesshare.vercel.app)

---

## Features

- **Instant sharing** — paste text, get a link. No sign-up required.
- **Cross-device** — works on any browser (phone, tablet, desktop).
- **Password protection** — optionally lock clips with a password (SHA-256 hashed server-side).
- **Auto-expiry** — clips self-destruct after 24 hours.
- **50KB limit** — keeps things lightweight and fast.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Database | Upstash Redis (serverless) |
| Hosting | Vercel |
| Styling | Vanilla CSS |
| Fonts | Inter + JetBrains Mono |
| Icons | Font Awesome 6 |

## Getting Started

```bash
git clone https://github.com/SinkAnkit/Bytes-Share.git
cd Bytes-Share
npm install

# Add your Upstash Redis credentials
cp .env.example .env
# Edit .env with UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

## Project Structure

```
├── app/
│   ├── [slug]/page.tsx      # Clip page (read/write/delete)
│   ├── api/clip/[slug]/     # REST API (GET, POST, DELETE)
│   ├── globals.css          # Styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── .env.example
└── package.json
```

## How Password Protection Works

1. When saving, optionally set a password.
2. Password is SHA-256 hashed server-side — raw password is never stored.
3. Protected clips show a lock screen until the correct password is entered.

## License

MIT
