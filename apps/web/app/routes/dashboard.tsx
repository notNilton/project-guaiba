import type { Route } from "./+types/dashboard";
import { DashboardScreen } from "../modules/dashboard/pages/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Valkyrie System" },
  ];
}

export default function Dashboard() {
  return <DashboardScreen />;
}
