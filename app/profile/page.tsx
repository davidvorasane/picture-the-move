import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <p className="profile-eyebrow">
          Picture the Move
        </p>

        <h1>
          Welcome, {user.fullName}!
        </h1>

        <p>
          You are successfully logged in.
        </p>

        <p>{user.email}</p>

        <p className="profile-note">
          Your Life Snapshot and profile will go
          here next.
        </p>
      </div>
    </main>
  );
}