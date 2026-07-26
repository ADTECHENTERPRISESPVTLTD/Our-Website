import type { Metadata } from "next";
import "./globals.css";

// Using standard CSS font-family fallbacks to ensure 100% build reliability without network font dependency
const fontVariables = "--font-space-grotesk --font-inter";

export const metadata: Metadata = {
  title: "AD TECH Enterprises | Building Future Tech Talent",
  description: "AD TECH Enterprises Pvt. Ltd. is a modern software development and AI Automation company. We partner with educational institutions and businesses to build scalable digital products, AI chatbot assistants, and transition operations to AI-first workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
