import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <Head>
    <link rel="preload" href="/Commercial-Office-Space-1.avif" as="image" />
    <link
      rel="preload"
      href="/depositphotos_235840898-stock-photo-chinese-employees-work-wework-working.avif"
      as="image"
    />
    <link
      rel="preload"
      href="/depositphotos_649045064-stock-photo-corner-stylish-open-space-office.avif"
      as="image"
    />
    <link
      rel="preload"
      href="/gettyimages-1145667876-612x612.avif"
      as="image"
    />
    <link
      rel="preload"
      href="/photo-1571624436279-b272aff752b5.avif"
      as="image"
    />
  </Head>;

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
