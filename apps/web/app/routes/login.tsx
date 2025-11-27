import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { LoginScreen } from "../modules/auth/screens/LoginScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Valkyrie System" },
    { name: "description", content: "Login to your account" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (email && password) {
    const headers = new Headers();
    headers.append("Set-Cookie", "auth_token=mock_token; Path=/; HttpOnly; SameSite=Lax");
    return redirect("/", { headers });
  }

  return { error: "Invalid credentials" };
}

export default function Login() {
  return <LoginScreen />;
}
