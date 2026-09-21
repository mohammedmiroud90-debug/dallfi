"use client";

import { usePathname } from "@/i18n/navigation";
import SiteHeader from "@/components/SiteHeader";

export default function ConditionalHeader({ notice }: { notice: React.ReactNode }) {
  const pathname = usePathname();
  
  // Show header on all pages including login
  return <SiteHeader notice={notice} />;
}