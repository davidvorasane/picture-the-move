import Image from "next/image";
import Link from "next/link";

type AuthMode = "signup" | "login";

type NavbarProps = {
  authMode: AuthMode;
  onAuthModeChange: (mode: AuthMode) => void;
};

export default function Navbar({
  authMode,
  onAuthModeChange,
}: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Picture the Move"
            width={48}
            height={48}
          />
        </Link>
      </div>

      <nav className="nav-links">
        <Link href="#how-it-works">How It Works</Link>
        <Link href="#features">Features</Link>
        <Link href="#about">About</Link>
      </nav>

      <div className="nav-actions">
        <button
          type="button"
          className={`login-link ${
            authMode === "login" ? "active" : ""
          }`}
          onClick={() => onAuthModeChange("login")}
        >
          Log In
        </button>

        <button
          type="button"
          className={`signup-button ${
            authMode === "signup" ? "active" : ""
          }`}
          onClick={() => onAuthModeChange("signup")}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}