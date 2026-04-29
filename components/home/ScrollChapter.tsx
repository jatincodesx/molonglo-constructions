import Link from "next/link";
import styles from "./HomeScrollJourney.module.css";

type ScrollChapterProps = {
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  index: number;
  isActive: boolean;
  title: string;
};

export function ScrollChapter({ body, ctaHref, ctaLabel, index, isActive, title }: ScrollChapterProps) {
  return (
    <article
      className={`${styles.chapterCard} ${isActive ? styles.chapterCardActive : ""}`}
      aria-hidden={isActive ? undefined : true}
    >
      <p className={styles.chapterStep}>Chapter {String(index + 1).padStart(2, "0")}</p>
      <h3 className={styles.chapterTitle}>{title}</h3>
      <p className={styles.chapterBody}>{body}</p>
      {ctaHref && ctaLabel ? (
        <Link href={ctaHref} className="cta mt-7">
          {ctaLabel}
        </Link>
      ) : null}
    </article>
  );
}
