import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from './components/footer'
import Navbar from "./components/nav";
const inter = Inter({ subsets: ["latin"] });
import {Providers} from '@/app/providers'

export const metadata: Metadata = {
  title: "PicCraft",
  description: "A website which lets you edit images when you upload them",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` h-screen w-screen ${inter.className}`}>
        <Providers>
        <Navbar/>
        {children}
        <Footer/>
        </Providers>
        </body>
    </html>
  );
}
