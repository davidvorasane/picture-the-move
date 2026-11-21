import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/profile/LogoutButton";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const firstName = user.fullName.split(" ")[0];

  return (
    <main className="profile-page">
      <section className="profile-banner">
        <div className="profile-topbar">
          <div className="profile-brand">
            <Image
              src="/logo.png"
              alt="Picture the Move"
              width={56}
              height={56}
            />

            <span>Picture the Move</span>
          </div>

          <LogoutButton />
        </div>
      </section>

      <section className="profile-content">
        <div className="profile-welcome">
          <Image
            src="/profile-placeholder.png"
            alt="Profile placeholder"
            width={120}
            height={120}
            className="profile-avatar"
          />

          <div>
            <h1>Welcome back, {firstName}!</h1>

            <p>
              Manage your Life Snapshot, find new
              cities, and keep track of the places
              you&apos;re considering.
            </p>
          </div>
        </div>

        <div className="profile-dashboard">
          <section className="snapshot-card">
            <div className="snapshot-heading">
              <div className="snapshot-title">
                <span className="snapshot-icon">📋</span>

                <div>
                  <h2>Your Life Snapshot</h2>

                  <p>
                    A quick look at what matters most
                    to you right now.
                  </p>
                </div>
              </div>

            <Link
                href="/profile/life-snapshot"
                className="edit-snapshot-button">
                ✎ Edit Life Snapshot
            </Link>
            </div>

            <div className="snapshot-list">
              <div className="snapshot-row">
                <span className="snapshot-row-icon">👤</span>
                <strong>Personal</strong>
                <span>Not completed</span>
              </div>

              <div className="snapshot-row">
                <span className="snapshot-row-icon">📍</span>
                <strong>Current City</strong>
                <span>Not completed</span>
              </div>

              <div className="snapshot-row">
                <span className="snapshot-row-icon">🏠</span>
                <strong>Home &amp; Family</strong>
                <span>Not completed</span>
              </div>

              <div className="snapshot-row">
                <span className="snapshot-row-icon">💼</span>
                <strong>Work &amp; Income</strong>
                <span>Not completed</span>
              </div>

              <div className="snapshot-row">
                <span className="snapshot-row-icon">🚗</span>
                <strong>Transportation &amp; Commute</strong>
                <span>Not completed</span>
              </div>

              <div className="snapshot-row">
                <span className="snapshot-row-icon">❤️</span>
                <strong>Lifestyle &amp; Priorities</strong>
                <span>Not completed</span>
              </div>

              <div className="snapshot-row">
                <span className="snapshot-row-icon">🎯</span>
                <strong>Moving Goals</strong>
                <span>Not completed</span>
              </div>
            </div>
          </section>

          <div className="profile-actions">
            <section className="profile-action-card cities-card">
              <div className="action-icon">🔭</div>

              <div className="action-content">
                <h2>Find New Cities</h2>

                <p>
                  Search for a city, see how well it
                  fits your life, and explore the
                  details.
                </p>

                <button
                  type="button"
                  className="profile-action-button"
                >
                  Find Cities →
                </button>
              </div>
            </section>

            <section className="profile-action-card saved-card">
              <div className="action-icon">🔖</div>

              <div className="action-content">
                <h2>Saved Cities</h2>

                <p>
                  View the cities you&apos;re considering,
                  compare your options, and dive
                  deeper into the analysis.
                </p>

                <button
                  type="button"
                  className="profile-action-button"
                >
                  View Saved Cities →
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}