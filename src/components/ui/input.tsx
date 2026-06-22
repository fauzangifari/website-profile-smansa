import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ className, error, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error && id ? `${id}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-md border border-neutral-300 bg-white px-4 text-sm text-neutral-900 shadow-sm transition",
          "placeholder:text-neutral-500 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/15",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
          error ? "border-danger focus:border-danger focus:ring-danger/15" : null,
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SearchInput(props: Omit<InputProps, "type">) {
  return <Input type="search" {...props} />;
}
