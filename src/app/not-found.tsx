export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-black px-8 text-center">
      <div>
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">{"// 404"}</span>
        <h1 className="mt-5 text-[clamp(2rem,6vw,4rem)] font-extrabold tracking-[-0.04em] text-white">Signal lost.</h1>
        <p className="mt-4 text-gray-400">That page does not exist.</p>
        <a href="/" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-7 py-4 text-[15px] font-semibold text-black">Back to base</a>
      </div>
    </main>
  );
}
