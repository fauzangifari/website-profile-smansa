import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "glass"
  | "danger";

type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white shadow-sm hover:bg-brand-primary-hover active:bg-brand-primary-active",
  secondary:
    "bg-brand-primary-soft text-brand-primary hover:bg-brand-primary-soft/80 active:bg-brand-primary-soft/70",
  outline:
    "border border-neutral-300 bg-white text-neutral-900 hover:border-brand-primary/50 hover:bg-brand-primary-soft",
  ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
  glass:
    "border border-white/50 bg-white/60 text-neutral-900 shadow-sm backdrop-blur-xl hover:bg-white/75",
  danger: "bg-danger text-white shadow-sm hover:bg-danger/90 active:bg-danger/80",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-3 text-sm",
  md: "h-11 gap-2.5 px-4 text-sm",
  lg: "h-13 gap-3 px-5 text-base",
  icon: "size-10",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md font-semibold transition duration-200 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        "disabled:pointer-events-none disabled:opacity-55",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        iconLeft
      )}
      {children && <span>{children}</span>}
      {!isLoading ? iconRight : null}
    </button>
  );
}
