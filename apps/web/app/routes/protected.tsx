import { redirect } from "react-router";
import type { Route } from "./+types/protected";
import { ProtectedLayoutScreen } from "../modules/layout/screens/ProtectedLayoutScreen";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get("Cookie");
  const isAuthenticated = cookie?.includes("auth_token=mock_token");

  if (!isAuthenticated) {
    return redirect("/login");
  }

  return null;
}

export default function ProtectedLayout() {
  return <ProtectedLayoutScreen />;
}
