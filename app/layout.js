import { Caveat, Lora } from "next/font/google";
import "./globals.css";

const script = Caveat({ subsets: ["latin"], variable: "--f-script", weight: ["500", "700"] });
const serif = Lora({ subsets: ["latin"], variable: "--f-body", weight: ["400", "500"] });

export const metadata = {
  title: "Happy Birthday, Anagha 🎂",
  description: "A little something for your special day.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${script.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
