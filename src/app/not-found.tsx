import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "#02040A" }}
    >
      <div className="relative mb-8">
        <p
          className="font-bebas text-[20rem] leading-none opacity-5 select-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FF5A1F" }}
        >
          404
        </p>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            className="font-bebas text-white text-6xl mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            PAGE NOT FOUND
          </p>
          <p className="text-[#7B7F87] max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-8 py-4 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm hover:bg-[#FF7A3F] transition-colors"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          RETURN HOME
        </Link>
        <Link
          href="/collection"
          className="px-8 py-4 border border-white/20 text-white font-medium tracking-widest text-sm hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          VIEW COLLECTION
        </Link>
      </div>
    </div>
  );
}
