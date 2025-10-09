import Image from "next/image";
import styles from "@/app/App.module.css";


{/* TODO: fix footer so its tighter. smaller gap between rows */}
export default function SiteFooter() {
  return (
    <footer className={`${styles.footer} flex flex-col items-center gap-0.5`}>
      <div className="flex flex-row items-center gap-3 ">
      {/* Toggleable contact form */}
      <details>
        <summary className={styles.contactButton} role="button">
          Contact Us
        </summary>
        <form method="post" action="/api/contact" className={styles.contactForm}>
          <input
            className={styles.contactInput}
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          <input
            className={styles.contactInput}
            type="text"
            name="message"
            placeholder="Your message"
            required
          />
          <button className={styles.contactButton} type="submit">Send</button>
        </form>
      </details>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/kent-state-stark-computer-club"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
        Club Git-Hub
      </a>

      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://www.kent.edu/stark/computer-science"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
        University website
      </a>
      </div>
      {/* Privacy note (simple + unobtrusive) */}
      <p className="text-center text-xs text-neutral-500 m-0 p-0 leading-snug">
        This site uses privacy-preserving analytics from Vercel (no cookies or personal data).{" "}
          <a
            className="underline underline-offset-2"
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        .
      </p>

      {/*collapsible details version*/}
      {/*
      <details className="mt-2 text-center text-xs text-neutral-500">
        <summary className="cursor-pointer underline underline-offset-2">
          Privacy & Analytics
        </summary>
        <div className="mt-1">
          We use Vercel’s privacy-preserving analytics to measure aggregate usage—no cookies,
          IP addresses, or personal data are stored.
          <a
            className="ml-1 underline underline-offset-2"
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noopener noreferrer"
          >
            More info
          </a>.
        </div>
      </details>
      */}
    </footer>
  );
}
