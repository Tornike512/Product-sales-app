"use client";

import { usePathname } from "next/navigation";

import "./Footer.css";

export default function Footer() {
  const pathname = usePathname();
  console.log(pathname);

  if (pathname === "/register-page" || pathname === "/sign-in-page") {
    return null;
  }

  return (
    <footer>
      <p>&copy; 2025 SaleStores. All rights reserved.</p>
    </footer>
  );
}
