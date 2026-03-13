import type { Metadata } from "next";
import { Josefin_Sans, Kumbh_Sans, Open_Sans } from "next/font/google";
import "./globals.css";


const josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"], // Différents poids disponibles
});

export const metadata: Metadata = {
  title: "Gogym",
  description: "Votre salle de gym à la pointe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${josefin.variable} ${kumbhSans.variable} antialiased text-red-500 bg-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
