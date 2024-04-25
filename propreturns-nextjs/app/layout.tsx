import "./globals.css";
import Head from "next/head";

<Head>
  <link rel="preload" href="/Commercial-Office-Space-1.webp" as="image" />
  <link
    rel="preload"
    href="/depositphotos_235840898-stock-photo-chinese-employees-work-wework-working.webp"
    as="image"
  />
  <link
    rel="preload"
    href="/depositphotos_649045064-stock-photo-corner-stylish-open-space-office.webp"
    as="image"
  />
  <link rel="preload" href="/gettyimages-1145667876-612x612.webp" as="image" />
  <link
    rel="preload"
    href="/photo-1571624436279-b272aff752b5.webp"
    as="image"
  />
</Head>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
