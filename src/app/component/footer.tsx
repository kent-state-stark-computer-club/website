import Image from "next/image";
import styles from "@/app/App.module.css"

export default function SiteFooter () {
    return (
        
        <footer className={styles.footer}>
          {/* Toggleable contact form */}
          <details>
            <summary className={styles.contactButton} role="button">Contact Us</summary>
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
            <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            />
            Club Git-Hub
        </a>
        <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.kent.edu/stark/computer-science"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            />
            University website
        </a>
        </footer>
    )
}
    

