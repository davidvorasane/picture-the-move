import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Picture the Move"
            width={80}
            height={80}
          />
        </Link>

        <div className="footer-divider"></div>

        <nav className="footer-links">
          <Link href="#about">About</Link>
          <Link href="#help">Help & FAQs</Link>
          <Link href="#privacy">Privacy</Link>
          <Link href="#terms">Terms</Link>
        </nav>
      </div>

      <div className="footer-decoration">
        <span>⌁⌁⌁</span>
        <span>▲ ▲</span>
        <span>🌲 🌲</span>
      </div>
    </footer>
  );
}