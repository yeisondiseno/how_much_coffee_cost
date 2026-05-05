// React
import { type ReactNode } from "react";

export function TitleAccent({ children }: Readonly<{ children: ReactNode }>) {
  return <span className="coffee-calc-title-accent">{children}</span>;
}

export function renderTitleAccent(chunks: ReactNode) {
  return <TitleAccent>{chunks}</TitleAccent>;
}
