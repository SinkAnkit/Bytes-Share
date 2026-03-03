# Bytes Share

**A free online notepad to instantly share text, code, and notes across any device.**

**Live:** [bytesshare.vercel.app](https://bytesshare.vercel.app)

---

## Features

- **Instant Sharing** — Paste your text, get a shareable link in seconds. No sign-up required.
- **Cross-Device** — Works on any browser — phone, tablet, laptop, desktop.
- **Password Protection** — Optionally lock clips with a password. Content is only revealed after entering the correct password.
- **Auto-Expiry** — Clips self-destruct after 24 hours. Your data never stays longer than it needs to.
- **Modern UI** — Dark theme with glassmorphism, animated gradients, and full mobile/tablet responsiveness.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Database | [Upstash Redis](https://upstash.com/) (Serverless) |
| Hosting | [Vercel](https://vercel.com/) |
| Styling | Vanilla CSS with custom design system |
| Font | [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |

## Getting Started

### Prerequisites

- Node.js 18+
- An [Upstash Redis](https://console.upstash.com) database (free tier works)

### Setup

```bash
# Clone the repo
git clone https://github.com/SinkAnkit/Bytes-Share.git
cd Bytes-Share

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your Upstash Redis credentials to .env

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Your Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Your Upstash Redis REST token |

## Project Structure

```
bytes-share/
├── app/
│   ├── [slug]/page.tsx      # Dynamic clip page (read/write/delete)
│   ├── api/clip/[slug]/     # REST API (GET, POST, DELETE)
│   ├── globals.css           # Full design system
│   ├── layout.tsx            # Root layout with SEO metadata
│   └── page.tsx              # Landing page
├── .env.example
└── package.json
```

## How Password Protection Works

1. When saving a clip, optionally set a password.
2. The password is SHA-256 hashed server-side — the raw password is never stored.
3. When someone opens a protected clip, they see a lock screen.
4. After entering the correct password, the content is revealed.

## License

MIT
