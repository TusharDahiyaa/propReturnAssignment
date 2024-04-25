"use client";

import Head from "next/head";

export default function Home() {
  <Head>
    <title>PropReturn Assignment</title>
    <meta
      name="description"
      content="Assignment for propReturn NextJS Marketplace"
    />
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
    <link
      rel="preload"
      href="/gettyimages-1145667876-612x612.webp"
      as="image"
    />
    <link
      rel="preload"
      href="/photo-1571624436279-b272aff752b5.webp"
      as="image"
    />
  </Head>;

  return (
    <div className="flex items-center h-screen justify-center flex-col gap-5">
      <img src="./logo_best.avif" className="w-52 md:w-auto h-auto" alt="" />
      <h1 className="text-2xl md:text-5xl font-mono">Assignment</h1>
      <button
        className="bg-violet-500 px-4 py-4 md:text-xl font-bold rounded-xl"
        onClick={() => {
          window.location.href = "/properties";
        }}
      >
        Navigate to the assessment!
      </button>
    </div>
  );
}
