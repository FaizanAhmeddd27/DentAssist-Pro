import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient"; // adjust path if different

const AdminPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const email = user.emailAddresses?.[0]?.emailAddress;

  if (!email || email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  return <AdminDashboardClient />;
};

export default AdminPage;
