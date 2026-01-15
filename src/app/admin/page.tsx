import { auth, clerkClient} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

const AdminPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Get user from Clerk
  const { clerkClient } = await import("@clerk/nextjs/server");
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const email = user.emailAddresses?.[0]?.emailAddress;

  if (!email || email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  return <AdminDashboardClient />;
};

export default AdminPage;