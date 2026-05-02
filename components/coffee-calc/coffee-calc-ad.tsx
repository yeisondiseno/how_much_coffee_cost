"use client";

import { useEffect } from "react";
// Next
import { usePathname } from "next/navigation";

// Types (module-local)
type CoffeeCalcAd = {
  slot: string;
};

declare global {
  var adsbygoogle: Record<string, unknown>[];
}

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
          style={{ display: "block" }}
          data-ad-client="ca-pub-8195825937047934"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};
