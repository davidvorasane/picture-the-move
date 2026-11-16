import Link from "next/link";

export default function GetStarted() {
  return (
    <div className="get-started-card">
      <h2>Get Started</h2>

      <p className="get-started-description">
        Create a free account to build your Life Snapshot, explore cities,
        and compare your options.
      </p>

      <form className="get-started-form">
        <div className="input-field">
          <span>👤</span>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
          />
        </div>

        <div className="input-field">
          <span>✉️</span>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>

        <div className="input-field">
          <span>🔒</span>
          <input
            type="password"
            placeholder="Create a Password"
            name="password"
          />
        </div>

        <button type="submit" className="create-account-button">
          Create My Account
        </button>
      </form>

      <p className="login-prompt">
        Already have an account?{" "}
        <Link href="/login">Log In</Link>
      </p>
    </div>
  );
}