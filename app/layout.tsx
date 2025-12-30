import Header from "@/components/custom/header";
import Refresher from "@/components/custom/refresher";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-manrope antialiased",
            manrope.variable
          )}
        >
          <Refresher>
            <Header />
            <main>{children}</main>
            <Toaster />
          </Refresher>
        </body>
      </StoreProvider>
    </html>
  );
}
