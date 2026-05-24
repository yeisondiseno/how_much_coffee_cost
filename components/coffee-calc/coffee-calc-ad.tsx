"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/config";

type CoffeeCalcAdProps = {
  slot: string;
};

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const loadAd = (ins: HTMLElement) => {
  if (ins.getAttribute("data-adsbygoogle-status")) return;

  (window.adsbygoogle = window.adsbygoogle || []).push({});
};

// million-ignore
export const CoffeeCalcAd = ({ slot }: CoffeeCalcAdProps) => {
  const insRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const ins = insRef.current;
    if (!ins) return;

    initializedRef.current = true;

    try {
      loadAd(ins);
    } catch (error) {
      initializedRef.current = false;
      console.error("Error cargando el anuncio de AdSense:", error);
    }
  }, [slot]);

  return (
    <div className="coffee-calc-ad">
      <div className="coffee-calc-ad-box">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "250px" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
};
