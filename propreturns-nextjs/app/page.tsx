"use client";

export default function Home() {
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
