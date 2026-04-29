import Link from "next/link";
import { HouseJourneyObject, type HouseJourneyStage } from "@/components/home/HouseJourneyObject";
import styles from "./HomeScrollJourney.module.css";

type JourneyChapter = {
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  stage: HouseJourneyStage;
  title: string;
};

export function HomeStaticJourneyFallback({ chapters }: { chapters: JourneyChapter[] }) {
  return (
    <div className={styles.fallbackScene}>
      <div className={styles.fallbackIntro}>
        <div className={styles.fallbackCopy}>
          <p className="eyebrow text-white/70">The Molonglo build journey</p>
          <h2 className={styles.sceneTitle}>A guided construction story that still works without animation.</h2>
          <p className={styles.sceneLead}>
            The same seven chapters remain visible in HTML, so the process is readable on mobile, on reduced motion, and when JavaScript enhancements are unavailable.
          </p>
        </div>
        <HouseJourneyObject stage="handover" compact className={styles.fallbackObject} />
      </div>

      <div className={styles.fallbackGrid}>
        {chapters.map((chapter, index) => (
          <article key={chapter.title} className={styles.fallbackCard}>
            <div className={styles.fallbackCardHeader}>
              <span className={styles.fallbackCardNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.fallbackStageLabel}>{chapter.stage}</span>
            </div>
            <h3 className={styles.fallbackCardTitle}>{chapter.title}</h3>
            <p className={styles.fallbackCardBody}>{chapter.body}</p>
            {chapter.ctaHref && chapter.ctaLabel ? (
              <Link href={chapter.ctaHref} className="cta mt-6">
                {chapter.ctaLabel}
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
