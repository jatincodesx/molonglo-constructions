import Link from "next/link";
import { HouseWalkthroughObject } from "./HouseWalkthroughObject";
import styles from "./HouseWalkthroughScene.module.css";

export type HouseWalkthroughStep = {
  title: string;
  body: string;
  cta?: {
    href: string;
    label: string;
  };
};

type HouseWalkthroughFallbackProps = {
  steps: HouseWalkthroughStep[];
};

export function HouseWalkthroughFallback({ steps }: HouseWalkthroughFallbackProps) {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackVisual}>
        <HouseWalkthroughObject />
      </div>

      <ol className={styles.fallbackCards}>
        {steps.map((step, index) => (
          <li key={step.title}>
            <article className={styles.fallbackCard}>
              <p className={styles.stepKicker}>Stage {String(index + 1).padStart(2, "0")}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.cta ? (
                <Link href={step.cta.href} className={styles.inlineCta}>
                  {step.cta.label}
                </Link>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
