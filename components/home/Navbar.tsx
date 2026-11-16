import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
        <Link href="/login" className="login-link">
          Log In
        </Link>

        <Link href="/signup" className="signup-button">
          Sign Up
        </Link>
      </div>
    </header>
  );
}