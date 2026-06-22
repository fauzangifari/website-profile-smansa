"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDownIcon, List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { SiteNavItem } from "@/config/site";
import { cn } from "@/lib/utils";

type AppNavbarProps = {
  items: SiteNavItem[];
  anchorBasePath?: string;
};

function resolveHref(href: string, anchorBasePath?: string) {
  if (!anchorBasePath || !href.startsWith("#")) {
    return href;
  }
  return `${anchorBasePath}${href}`;
}

export function AppNavbar({ items, anchorBasePath }: AppNavbarProps) {
  const [open, setOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setOpen(false);
    setExpandedMobileItem(null);
  };

  const isItemActive = (item: SiteNavItem): boolean => {
    if (item.label === "Beranda" && pathname === "/") return true;
    if (item.href && item.href !== "#" && !item.href.startsWith("#")) {
      if (item.href === "/") return pathname === "/";
      if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
    }
    if (item.children) {
      return item.children.some((child) => {
        if (child.href && child.href !== "#" && !child.href.startsWith("#")) {
          if (child.href === "/") return pathname === "/";
          if (pathname === child.href || pathname.startsWith(`${child.href}/`)) return true;
        }
        return false;
      });
    }
    return false;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 font-sans">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl bg-white/72 px-4 shadow-md backdrop-blur-2xl transition-all duration-300">
        <Link
          href={resolveHref("#beranda", anchorBasePath)}
          className="flex min-w-0 items-center gap-3"
          aria-label="SMA Negeri 1 Samarinda"
        >
          <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-md border border-white/70 bg-white shadow-sm">
            <Image
              src="/images/brand/logo.png"
              alt="Logo SMA Negeri 1 Samarinda"
              width={15}
              height={15}
              className="h-11 w-auto object-contain"
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block whitespace-nowrap text-sm font-extrabold tracking-tight text-neutral-900">
              SMA Negeri 1
            </span>
            <span className="block whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-brand-primary">
              Samarinda
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {items.slice(0, 8).map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const active = isItemActive(item);

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={resolveHref(item.href, anchorBasePath)}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-semibold transition-all duration-300",
                    active
                      ? "text-brand-primary bg-brand-primary/10"
                      : "text-neutral-700 hover:bg-brand-primary-soft hover:text-brand-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="group relative">
                <button
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-all duration-300",
                    active
                      ? "text-brand-primary bg-brand-primary/10"
                      : "text-neutral-700 hover:bg-brand-primary-soft hover:text-brand-primary"
                  )}
                >
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    {item.label}
                    <CaretDownIcon
                      size={14}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </span>
                </button>
                
                {/* Dropdown */}
                <div className="invisible absolute left-0 top-full min-w-52 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                  <div className="rounded-xl border border-neutral-200 bg-white/95 p-2 shadow-lg shadow-neutral-900/10 backdrop-blur-xl">
                    <div className="grid gap-1">
                      {item.children?.map((child) => {
                        const childActive = isItemActive(child);
                        return (
                          <Link
                            key={child.label}
                            href={resolveHref(child.href, anchorBasePath)}
                            className={cn(
                              "rounded-lg px-3 py-2.5 text-sm font-semibold transition focus:outline-none",
                              childActive
                                ? "bg-brand-primary/10 text-brand-primary"
                                : "text-neutral-700 hover:bg-brand-primary-soft hover:text-brand-primary focus:bg-brand-primary-soft focus:text-brand-primary"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={resolveHref("#", anchorBasePath)}
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold text-neutral-700 hover:bg-white/70 hover:text-brand-primary"
          >
            Cari
          </Link>
          <Link
            href={resolveHref("https://spmb.sman1samarinda.sch.id", anchorBasePath)}
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary-hover active:scale-95"
          >
            SPMB
          </Link>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="glass"
          className="lg:hidden"
          onClick={() => {
            setOpen((v) => !v);
            setExpandedMobileItem(null);
          }}
        >
          <div className="transition-transform duration-200">
            {open ? (
              <X size={24} weight="bold" />
            ) : (
              <List size={24} weight="bold" />
            )}
          </div>
        </Button>
      </nav>

      {/* Mobile Menu Overlay — CSS transitions instead of Framer Motion */}
      <div
        className={cn(
          "mx-auto mt-3 max-w-7xl lg:hidden font-sans transition-all duration-300 ease-out",
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        )}
      >
        <div className="rounded-xl border border-white/50 bg-white/72 p-4 shadow-xl backdrop-blur-2xl">
          <div className="grid gap-1">
            {items.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isExpanded = expandedMobileItem === item.label;
              const active = isItemActive(item);

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={resolveHref(item.href, anchorBasePath)}
                    className={cn(
                      "rounded-md px-3 py-3 text-sm font-semibold transition-colors",
                      active
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-neutral-800 hover:bg-white/70"
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="rounded-md">
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-semibold transition-colors",
                      active
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-neutral-800 hover:bg-white/70"
                    )}
                    onClick={() => setExpandedMobileItem(isExpanded ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <CaretDownIcon
                      size={16}
                      weight="bold"
                      className={cn("transition-transform duration-300", isExpanded && "rotate-180")}
                    />
                  </button>
                  
                  {/* Expandable children — CSS grid transition */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-3 mt-1 grid border-l border-brand-primary/20 pl-3">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={resolveHref(child.href, anchorBasePath)}
                            className={cn(
                              "rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-white/70 hover:text-brand-primary",
                              isItemActive(child) ? "text-brand-primary" : "text-neutral-700"
                            )}
                            onClick={closeMobileMenu}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              href={resolveHref("https://spmb.sman1samarinda.sch.id", anchorBasePath)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-brand-primary px-4 text-sm font-semibold text-white shadow-sm"
              onClick={closeMobileMenu}
            >
              Informasi SPMB
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
