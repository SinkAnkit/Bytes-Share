"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [slug, setSlug] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
    if (!trimmed) return;
    setIsNavigating(true);
    router.push(`/${trimmed}`);
  };

  return (
    <main className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-brand">
            <div className="nav-logo">
              <i className="fa-solid fa-clipboard"></i>
            </div>
            <span className="nav-name">Bytes<span className="text-gradient">Share</span></span>
          </div>
          <div className="nav-links">
            <span className="nav-badge">Free &amp; Open</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <i className="fa-solid fa-bolt"></i>
            Free online notepad &amp; clipboard
          </div>

          <h1 className="hero-title">
            Share text &amp; code across<br />
            <span className="text-gradient">any device, instantly</span>
          </h1>

          <p className="hero-desc">
            Paste your content, get a shareable link in seconds. No sign-up, no install. Works on every device. Auto-expires in 24 hours.
          </p>

          {/* Main Input Card */}
          <form onSubmit={handleSubmit} className="hero-form">
            <div className="input-card">
              <label className="input-label" htmlFor="clip-name-input">Create or access a clip</label>
              <div className="input-group">
                <span className="input-prefix">bytesshare/</span>
                <input
                  className="input-field"
                  type="text"
                  placeholder="your-clip-name"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  maxLength={64}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Clip name"
                  id="clip-name-input"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={!slug.trim() || isNavigating}
                id="go-button"
              >
                {isNavigating ? (
                  <>
                    <span className="spinner" />
                    Opening…
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-arrow-right"></i>
                    Open Clip
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Why Bytes Share</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap cyan">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <h3>Instant</h3>
            <p>No sign-up, no apps to install. Create a clip in under 3 seconds and share the link.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap cyan">
              <i className="fa-solid fa-laptop"></i>
            </div>
            <h3>Cross-Device</h3>
            <p>Works on any browser — phone, tablet, laptop, desktop. Paste on one, read on another.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap cyan">
              <i className="fa-solid fa-clock"></i>
            </div>
            <h3>Auto-Expires</h3>
            <p>Every clip self-destructs after 24 hours. Your data never stays longer than it needs to.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <h2 className="section-title">How it works</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-num">1</div>
            <div className="how-body">
              <h4>Pick a name</h4>
              <p>Choose any clip name like <code>meeting-notes</code> or <code>wifi-password</code>.</p>
            </div>
          </div>
          <div className="how-connector">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="how-step">
            <div className="how-num">2</div>
            <div className="how-body">
              <h4>Paste your text</h4>
              <p>Write or paste anything — code snippets, links, notes, passwords.</p>
            </div>
          </div>
          <div className="how-connector">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="how-step">
            <div className="how-num">3</div>
            <div className="how-body">
              <h4>Access anywhere</h4>
              <p>Open the same URL on any device and your content is right there.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <p>Ready to share?</p>
        <a href="#clip-name-input" className="btn btn-primary"
          onClick={(e) => { e.preventDefault(); document.getElementById('clip-name-input')?.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <i className="fa-solid fa-arrow-up"></i>
          Start a clip
        </a>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <span>Made by Sinkant</span>
        <span className="tm">BytesShare™</span>
      </footer>
    </main>
  );
}
