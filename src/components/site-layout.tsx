import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { CustomCursor } from "./custom-cursor";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:cursor-none">
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
