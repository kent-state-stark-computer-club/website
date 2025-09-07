import Image from "next/image";
import styles from "@/app/App.module.css"

export default function SiteFooter () {
    return (
        
        <footer className={styles.footer}>
        <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
            />
            Contact Us
        </a>
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
            University website →
        </a>
        </footer>
    )
}
    