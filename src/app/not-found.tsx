import Link from "next/link";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      
      <main className="relative flex min-h-screen items-center justify-center bg-neutral-50 px-5 pb-20 pt-32 overflow-hidden">
        {/* Animated Orbs from Glass variant */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-[-10%] top-[10%] h-[60%] w-[60%] rounded-full bg-brand-primary-soft/30 blur-[120px] luxury-orbit" />
          <div className="absolute right-[-10%] bottom-[10%] h-[50%] w-[50%] rounded-full bg-brand-accent/15 blur-[100px] luxury-orbit-reverse" />
        </div>

        <Card 
          variant="glass-strong" 
          className="relative z-10 w-full max-w-lg border-white/40 p-8 text-center shadow-2xl shadow-neutral-900/5 md:p-14 reveal-rise"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/60 bg-white/50 shadow-inner backdrop-blur-md">
              <span className="text-4xl font-black tracking-tighter text-brand-primary">404</span>
            </div>
          </div>
          <h1 className="mb-4 text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mb-10 text-sm leading-relaxed text-neutral-600 md:text-base">
            Maaf, halaman yang Anda cari mungkin telah dipindahkan, diubah namanya, atau untuk sementara tidak tersedia.
          </p>
          <Link 
            href="/"
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-xl font-bold transition-all duration-300 ease-out",
              "bg-brand-primary text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary-hover hover:-translate-y-1 hover:shadow-lg active:bg-brand-primary-active active:translate-y-0",
              "h-12 gap-2.5 px-8 text-sm"
            )}
          >
            Kembali ke Beranda
          </Link>
        </Card>
      </main>

      <SiteFooter anchorBasePath="/" />
    </>
  );
}
