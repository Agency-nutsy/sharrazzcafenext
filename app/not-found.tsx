import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f050a] text-white px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-white/70 mb-8 max-w-md">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-black transition-colors"
      >
        Go Back Home
      </Link>
    </main>
  );
}



