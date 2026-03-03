import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byte Share — Internet Clipboard",
  description:
    "Instantly share text snippets across devices. Pick a URL, paste your content, and access it from anywhere.",
  keywords: ["clipboard", "share", "text", "snippet", "paste", "internet clipboard"],
  openGraph: {
    title: "Byte Share — Internet Clipboard",
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
          Byte Share — Your instant internet clipboard
        </footer>
      </body>
    </html>
  );
}
