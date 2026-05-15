"use client";

import { useEffect } from "react";
// Next
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT_ID } from "@/lib/config";

// Types (module-local)
type CoffeeCalcAd = {
  slot: string;
};

declare global {
  var adsbygoogle: Record<string, unknown>[];
}

// million-ignore
export const CoffeeCalcAd = ({ slot }: CoffeeCalcAd) => {
  // Hooks
  const pathname = usePathname();

  useEffect(() => {
    try {
      globalThis.adsbygoogle = globalThis.adsbygoogle || [];
      globalThis.adsbygoogle.push({});
    } catch (error) {
      console.error("Error cargando el anuncio de AdSense:", error);
    }
  }, [pathname]);

  return (
    <div className="coffee-calc-ad">
      <div className="coffee-calc-ad-box">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "250px" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          suppressHydrationWarning
        ></ins>
      </div>
    </div>
  );
};
