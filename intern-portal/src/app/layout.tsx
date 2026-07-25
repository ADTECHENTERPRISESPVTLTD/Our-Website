import "./globals.css";

export const metadata = {
  title: "AD TECH Intern Portal",
  description: "Intern Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}