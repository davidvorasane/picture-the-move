"use client";

import { useState, type FormEvent } from "react";
import Login from "./Login";

type AuthMode = "signup" | "login";

type GetStartedProps = {
  authMode: AuthMode;
  onAuthModeChange: (mode: AuthMode) => void;
};

export default function GetStarted({
  authMode,
  onAuthModeChange,
}: GetStartedProps) {
  if (authMode === "login") {
    return (
      <Login
        onSwitchToSignUp={() =>
          onAuthModeChange("signup")
        }
      />
    );
  }

  return (
    <SignUpForm
      onAuthModeChange={onAuthModeChange}
    />
  );
}

type SignUpFormProps = {
  onAuthModeChange: (mode: AuthMode) => void;
};

function SignUpForm({
  onAuthModeChange,
}: SignUpFormProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formData = new FormData(
      event.currentTarget
    );

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Unable to create your account."
        );
        return;
      }

      setSuccess(
        "Account created! You can now log in."
      );

    } catch {
      setError(
        "Unable to connect. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="get-started-card">
      <h2>Get Started</h2>

      <p className="get-started-description">
        Create a free account to build your Life
        Snapshot, explore cities, and compare your
        options.
      </p>

      <form
        className="get-started-form"
        onSubmit={handleSubmit}
      >
        <div className="input-field">
          <span>👤</span>

          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            autoComplete="name"
            required
          />
        </div>

        <div className="input-field">
          <span>✉️</span>

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="input-field">
          <span>🔒</span>

          <input
            type="password"
            placeholder="Create a Password"
            name="password"
            autoComplete="new-password"
            required
          />
        </div>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        {success && (
          <p className="auth-success">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="auth-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating Account..."
            : "Create My Account"}
        </button>
      </form>

      <p className="login-prompt">
        Already have an account?{" "}
        <button
          type="button"
          className="auth-switch"
          onClick={() =>
            onAuthModeChange("login")
          }
        >
          Log In
        </button>
      </p>
    </div>
  );
}