"use client";

import { usePathname } from "@/i18n/navigation";
import SiteHeader from "@/components/SiteHeader";

export default function ConditionalHeader({ notice }: { notice: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide home header on admin pages - admin has its own AdminHeader component
  const isAdminPage = pathname.includes('/admin');
  
  if (isAdminPage) {
    return null;
  }
  
  // Show header on all other pages including login
  return <SiteHeader notice={notice} />;
}