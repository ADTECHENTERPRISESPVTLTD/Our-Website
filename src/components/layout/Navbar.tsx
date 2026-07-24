import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0B1120]/90 backdrop-blur-md text-[#F8FAFC] py-0 px-6 shadow-md border-b border-[#374151]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/AD tech logo.png"
            alt="AD Tech Logo"
            className="h-16 w-16 object-contain"
          />

          <h1 className="text-2xl font-bold">
            AD TECH
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-8 text-[#CBD5E1]">

          <li>
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
          </li>

          <li>
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
          </li>

          <li>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </li>

          <li>
            <Link
              href="/requirement"
              className="bg-white text-[#0B1120] px-5 py-2 rounded-lg font-semibold hover:bg-[#CBD5E1] transition"
            >
              Submit Requirement
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
}