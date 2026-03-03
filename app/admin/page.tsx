import { cookies } from "next/headers";
import Login from "./login";
import Dashboard from "./dashboard";

function isAuthenticated(token: string | undefined): boolean {
  if (!token) return false;

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) return false;

  const expectedToken = btoa(`${expectedUsername}:${expectedPassword}`);
  return token === expectedToken;
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const authenticated = isAuthenticated(token);

  if (!authenticated) {
    return <Login />;
  }

  return <Dashboard />;
}
