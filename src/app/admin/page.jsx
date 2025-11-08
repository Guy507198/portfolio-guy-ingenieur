import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminIndex() {
  const isAuth = cookies().get("admin_auth")?.value === "1";
  redirect(isAuth ? "/admin/dashboard" : "/admin/login");
}
