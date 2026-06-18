"use client";

// React
import { type ReactNode, useCallback, useEffect, useState } from "react";
// Libraries
import { GoogleTagManager } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import Script from "next/script";
// Components (local)
import { Link } from "@/i18n/navigation";
// Config
import { ADSENSE_CLIENT_ID, CONSENT_STORAGE_KEY, GTM_ID } from "@/lib/config";

type ConsentChoice = "accepted" | "rejected";

export const ConsentThirdParties = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const t = useTranslations("Consent");
  const [consent, setConsent] = useState<ConsentChoice | null | undefined>(
    undefined,
  );

  const grantConsent = useCallback(() => {
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
    });
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "accepted") {
      grantConsent();
      setConsent("accepted");
    } else if (raw === "rejected") {
      setConsent("rejected");
    } else {
      setConsent(null);
    }
  }, [grantConsent]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    grantConsent();
    setConsent("accepted");
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "rejected");
    setConsent("rejected");
  };

  const showBanner = consent === null;

  return (
    <>
      {children}
      {consent === "accepted" ? (
        <>
          <GoogleTagManager gtmId={GTM_ID} />
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </>
      ) : null}
      {showBanner ? (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-stone-200 bg-[#fff8f0] p-4 shadow-[0_-4px_24px_rgba(27,14,7,0.12)] md:p-5"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="min-w-0 text-sm text-stone-800">
              <p
                id="cookie-consent-title"
                className="font-semibold text-[#1b0e07]"
              >
                {t("bannerTitle")}
              </p>
              <p id="cookie-consent-desc" className="mt-1 text-stone-600">
                {t("bannerText")}{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#c05621] underline underline-offset-2 hover:text-[#a84819]"
                >
                  {t("privacyLink")}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
              <button
                type="button"
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 shadow-sm hover:bg-stone-50"
                onClick={handleReject}
              >
                {t("reject")}
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#c05621] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#a84819]"
                onClick={handleAccept}
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
