import type { Route } from "./+types/dashboard";
import { DashboardScreen } from "../modules/dashboard/screens/DashboardScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Valkyrie System" },
  ];
}

export default function Dashboard() {
  return <DashboardScreen />;
}
