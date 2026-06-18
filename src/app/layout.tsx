import "~/styles/globals.css";

import { type Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "SAM - Silly App for Music",
  description: "Excercise website for creating a music content management app.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
