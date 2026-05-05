"use client";

import { usePathname } from "next/navigation";
import { AnalyticsTracker } from "@/components/site/AnalyticsTracker";

export function SiteChrome({
  children,
  header,
  footer,
  floatingCta = null
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  floatingCta?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <AnalyticsTracker />
      <main className="overflow-x-clip bg-white">{children}</main>
      {footer}
      {floatingCta}
    </>
  );
}
