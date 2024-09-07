import { DashboardShell } from "@/app/dashboard/components/AppShell/AppShell";
import SideNav from "@/app/dashboard/components/SideNav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell sideNav={<SideNav />}>{children}</DashboardShell>;
}
