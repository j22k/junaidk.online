export default function Footer() {
  return (
    <footer className="w-full max-w-[960px] mx-auto px-6 py-8 border-t border-[rgba(29,29,31,0.08)] flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="font-dm font-light text-[12px] text-[rgba(29,29,31,0.35)]">
        &copy; {new Date().getFullYear()} Muhammed Junaid K
      </div>
      <div className="font-dm font-light text-[12px] text-[rgba(29,29,31,0.35)]">
        Next.js &middot; Tailwind &middot; Framer Motion
      </div>
    </footer>
  );
}