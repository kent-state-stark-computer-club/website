import Image from "next/image";
import { Suspense } from "react";
import DiscordCard from "@/app/component/DiscordCard";
import StyleFooter from "@/app/component/footer";
import styles from "@/app/App.module.css"
import Countdown from "./component/countdown";

export default function Home() {
  return (
    <div className={styles.App}>
      <main className={styles.layout}>
        <div className={styles.content}>
          <Countdown />
          <div className={styles.contentBox}>
            <div className={styles.h1}> Part of Kent State Computer Science?</div>
            <div className={styles.h1}> Join our club!</div>
            <Suspense fallback={<div>Loading Discord…</div>}>
              <DiscordCard />
            </Suspense>
          </div>
        </div>
      </main>
      <StyleFooter />
    </div>
  );
}
