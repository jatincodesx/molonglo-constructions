"use client";

import styles from "@/components/home/HomeScrollJourney.module.css";

type ScrollProgressProps = {
  activeIndex: number;
  chapters: Array<{ title: string }>;
  progress: number;
};

export function ScrollProgress({ activeIndex, chapters, progress }: ScrollProgressProps) {
  return (
    <div className={styles.progressWrap} aria-label="Build journey progress">
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressFill} style={{ transform: `scaleY(${Math.max(0, Math.min(1, progress))})` }} />
      </div>
      <ol className={styles.progressList}>
        {chapters.map((chapter, index) => (
          <li
            key={chapter.title}
            className={`${styles.progressItem} ${index === activeIndex ? styles.progressItemActive : ""}`}
            aria-current={index === activeIndex ? "step" : undefined}
          >
            <span className={styles.progressNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.progressLabel}>{chapter.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
