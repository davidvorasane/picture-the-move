import Image from "next/image";
import Navbar from "@/components/home/Navbar";
import GetStarted from "@/components/home/GetStarted";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="hero">
        <Image
          src="/hero-background.png"
          alt=""
          fill
          priority
          className="hero-background"
        />

        <div className="hero-content">
          <Image
            src="/hero-logo.png"
            alt="Picture the Move"
            width={900}
            height={400}
            priority
            className="hero-logo"
          />

          <p>
            A personalized city comparison tool that helps you decide where
            your life could fit best.
          </p>
        </div>

        <GetStarted />
      </main>
    </>
  );
}