import type { Route } from "./+types/dashboard";
import { WelcomeScreen } from "../modules/dashboard/screens/WelcomeScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Valkyrie System" },
  ];
}

export default function Dashboard() {
  return <WelcomeScreen />;
}
