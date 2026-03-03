import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bytes Share — Internet Clipboard",
  description:
    "Instantly share text snippets across devices. Pick a URL, paste your content, and access it from anywhere.",
  keywords: ["clipboard", "share", "text", "snippet", "paste", "internet clipboard"],
  openGraph: {
    title: "Bytes Share — Internet Clipboard",
    description: "Instantly share text snippets across devices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-pattern" />
        <div className="grid-overlay" />
        {children}
        <footer className="footer">
          Bytes Share — Your instant internet clipboard
        </footer>
      </body>
    </html>
  );
}
