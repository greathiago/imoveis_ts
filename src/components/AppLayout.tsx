"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");
  return (
    <>
      {!isStudio && <Navbar />}
      <main className="bg-white">{children}</main>
      {!isStudio && <Footer />}
    </>
  );
}
