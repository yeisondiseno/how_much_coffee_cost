// Next
import { DM_Sans, Playfair_Display } from "next/font/google";

export const coffeeCalcPlayfair = Playfair_Display({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-coffee-playfair",
});

export const coffeeCalcDmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-coffee-dm",
});
