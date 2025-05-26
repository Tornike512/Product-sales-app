"use client";

import { useState } from "react";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import storeLogo from "../../../public/images/salesStores.png";

import Image from "next/image";

import "@/components/PreLoadLogo/PreLoadLogo.css";

export default function PreLoadLogo() {
  const { loadingAll } = useGetAllProducts();

  return (
    loadingAll && (
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
