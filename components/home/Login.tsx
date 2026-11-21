"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type LoginProps = {
  onSwitchToSignUp: () => void;
};

export default function Login({
  onSwitchToSignUp,
}: LoginProps) {
    const router = useRouter();
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

    const form = event.currentTarget;

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Unable to log in."
        );
        return;
      }

      router.push("/profile");

      form.reset();
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
      <h2>Welcome Back</h2>

      <p className="get-started-description">
        Log in to continue building your Life
        Snapshot, exploring cities, and comparing
        your options.
      </p>

      <form
        className="get-started-form"
        onSubmit={handleSubmit}
      >
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
            placeholder="Password"
            name="password"
            autoComplete="current-password"
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
            ? "Logging In..."
            : "Log In"}
        </button>
      </form>

      <p className="login-prompt">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="auth-switch"
          onClick={onSwitchToSignUp}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}