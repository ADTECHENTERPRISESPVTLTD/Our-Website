import "./globals.css";

export const metadata = {
  title: "AD TECH Intern Portal",
  description: "Intern Portal - Track tasks, attendance, and manage your work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Background grid overlay visible on all pages */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" aria-hidden="true" />
        <main className="relative z-[1] min-h-screen">{children}</main>
      </body>
    </html>
  );
}

