"use client";

import { useState } from "react";
import storeLogo from "../../../public/images/salesStores.png";

import Image from "next/image";

import "@/components/PreLoadLogo/PreLoadLogo.css";

export default function PreLoadLogo() {
  const [showPreload, setShowPreload] = useState<boolean>(true);

  setTimeout(() => {
    setShowPreload(false);
  }, 2000);

  return (
    showPreload && (
      <div className="preload-container">
        <Image
          className="preload-logo"
          src={storeLogo}
          fill
          alt="Preload Logo"
        />
      </div>
    )
  );
}
