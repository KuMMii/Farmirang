import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./Navbar";
import Script from "next/script";
import ChatButton from "./chatButton";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <Script strategy="beforeInteractive" src={process.env.API_URL} />
        <div className="flex flex-col h-full">
          <NavBar />
          <div className="pt-[5rem] h-full">{children}</div>
          {/* <ChatButton /> */}
        </div>
      </body>
    </html>
  );
}
