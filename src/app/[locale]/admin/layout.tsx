import type { Metadata } from "next";
import { AdminShell } from "@/components/AdminShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // For now, we'll rely on client-side authentication check in AdminShell
  // In production, you might want to add server-side auth validation using middleware
  return <AdminShell>{children}</AdminShell>;
}