export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-[#F8FAFC] py-2 px-6 border-t border-[#374151]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div>
          <h2 className="text-lg font-semibold">
            AD Tech Enterprises Pvt. Ltd.
          </h2>

          <p className="text-[#94A3B8] text-sm">
            Building Future Tech Talent
          </p>
        </div>

        <div className="text-right text-sm text-[#94A3B8]">
          <p>hradtechenterpriseschepvtltd@gmail.com</p>
          <p>+91 83193 58568</p>
        </div>

      </div>

      <div className="text-center text-xs text-[#94A3B8] mt-2">
        © 2026 AD Tech Enterprises Pvt. Ltd. All rights reserved.
      </div>

    </footer>
  );
}