import { Card } from "@/components/ui/card";

export default function PrestasiLoading() {
  return (
    <div className="flex flex-col gap-12 font-sans">
      {/* Hero banner skeleton */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-100 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 p-8 md:p-14">
        <div className="flex flex-col items-center gap-5">
          <div className="size-16 animate-pulse rounded-2xl bg-neutral-200" />
          <div className="h-6 w-32 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-10 w-3/4 animate-pulse rounded-xl bg-neutral-200" />
          <div className="h-5 w-1/2 animate-pulse rounded-xl bg-neutral-200" />
        </div>
      </div>

      {/* Filter skeleton */}
      <div className="rounded-2xl border border-neutral-100 bg-white/80 p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="h-11 animate-pulse rounded-xl bg-neutral-200" />
          <div className="flex gap-3">
            <div className="h-9 w-32 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-9 w-32 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-9 w-48 animate-pulse rounded-lg bg-neutral-200" />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} variant="glass-soft" className="flex flex-col gap-0 overflow-hidden p-0">
            <div className="h-40 w-full animate-pulse bg-neutral-200" />
            <div className="flex flex-col gap-3 p-5">
              <div className="h-4 w-3/4 animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-4 w-full animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-3 w-1/2 animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-3 w-2/3 animate-pulse rounded-lg bg-neutral-200" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
