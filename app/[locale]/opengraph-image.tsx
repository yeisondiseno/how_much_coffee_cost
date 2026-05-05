import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = Readonly<{ params: Promise<{ locale: string }> }>;

const Image = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CoffeeCalc" });

  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #1b0e07 0%, #3d1f0d 60%, #6b3a1f 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      <div style={{ fontSize: 96, marginBottom: 24 }}>☕</div>
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: "#fff8f0",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 20,
          maxWidth: 900,
        }}
      >
        {t("metadataTitle")}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#c8a97e",
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.4,
        }}
      >
        {t("metadataDescription")}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          fontSize: 22,
          color: "#7a5c3a",
          fontWeight: 600,
        }}
      >
        howmanycoffees.net
      </div>
    </div>,
    { ...size },
  );
};

export default Image;
