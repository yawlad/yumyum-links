import type { Metadata } from "next";
import "./globals.css";
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'], // выбери нужные
  display: 'swap',
});

export const metadata: Metadata = {
  title: "YumYum | Ссылки",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo2.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
