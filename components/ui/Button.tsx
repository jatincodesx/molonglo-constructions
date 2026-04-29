import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-molonglo-gold text-white hover:bg-molonglo-bronze",
  secondary: "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
  ghost: "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      className={cn("inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50", variants[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({ className, variant = "primary", href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: keyof typeof variants; href: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition", variants[variant], className)}
      {...props}
    />
  );
}
