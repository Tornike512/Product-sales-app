"use client";

import storeLogo from "../../../public/images/salesStores.png";

import Image from "next/image";

import "@/components/PreLoadLogo/PreLoadLogo.css";
import { useState } from "react";

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
