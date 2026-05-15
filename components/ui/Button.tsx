import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-molonglo-gold text-white shadow-sm hover:-translate-y-0.5 hover:bg-molonglo-bronze hover:shadow-md",
  secondary: "border border-zinc-300 bg-white text-zinc-900 shadow-sm hover:-translate-y-0.5 hover:border-molonglo-gold hover:bg-zinc-50 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
  ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white",
  danger: "bg-red-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
};

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      className={cn("inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none", variants[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({ className, variant = "primary", href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: keyof typeof variants; href: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2", variants[variant], className)}
      {...props}
    />
  );
}
