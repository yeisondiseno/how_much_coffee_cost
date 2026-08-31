import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["en", "es", "fr", "pt", "de", "ja", "it", "ko", "pl"];
const messagesDir = join(process.cwd(), "public", "messages");
const legalDir = join(messagesDir, "legal");

const deepMerge = (target, source) => {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      target[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

for (const locale of LOCALES) {
  const basePath = join(messagesDir, `${locale}.json`);
  const legalPath = join(legalDir, `${locale}.json`);
  const base = JSON.parse(readFileSync(basePath, "utf8"));
  const legal = JSON.parse(readFileSync(legalPath, "utf8"));
  const merged = deepMerge(base, legal);
  writeFileSync(basePath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`Merged legal translations into ${locale}.json`);
}
