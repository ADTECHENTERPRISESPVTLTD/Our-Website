import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AD TECH Enterprises",
  description: "Building Future Tech Talent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-primary-bg text-brand-primary-text min-h-screen">
        {children}
      </body>
    </html>
  );
}