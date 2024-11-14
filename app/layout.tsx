import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FilterProvider } from "./context/FilterContext";
import Image from "next/image";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pokedex Application",
  description: "An application to search pokemon information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#DC0A2D] h-lvh`}
      >
        <FilterProvider>
          <div className={`flex flex-col gap-4 text-white h-full p-8`}>
            <Link href="/">
              <div className="flex items-center gap-4">
                <Image src="../pokemon.svg" alt="pokemonLogo" width={30} height={100} />
                <h1 className="text-2xl">Pokédex</h1>
              </div>
            </Link>
            {children}
          </div>
        </FilterProvider>
      </body>
    </html>
  );
}
