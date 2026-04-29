import styles from "./HomeScrollJourney.module.css";

export type HouseJourneyStage =
  | "land"
  | "blueprint"
  | "approval"
  | "frame"
  | "construction"
  | "inspection"
  | "handover";

type HouseJourneyObjectProps = {
  className?: string;
  compact?: boolean;
  stage?: HouseJourneyStage;
};

export function HouseJourneyObject({ className, compact = false, stage = "land" }: HouseJourneyObjectProps) {
  return (
    <div
      className={`${styles.houseRoot} ${compact ? styles.houseRootCompact : ""} ${className ?? ""}`.trim()}
      data-stage={stage}
      aria-hidden="true"
    >
      <div className={styles.objectAura} />
      <div className={styles.blueprintGrid} data-blueprint-grid="" />
      <div className={styles.finalGlow} data-final-glow="" />

      <div className={styles.approvalCard} data-approval-card="">
        <span className={styles.approvalLabel}>ACT Documentation</span>
        <strong>Approved for Construction</strong>
        <span>Contracts, approvals and selections aligned.</span>
      </div>

      <div className={styles.keySymbol} data-key-symbol="">
        <span className={styles.keyRing} />
        <span className={styles.keyStem} />
        <span className={styles.keyTeeth} />
      </div>

      <div className={`${styles.detailPin} ${styles.detailPinNorth}`} data-detail-pin="">
        <span />
      </div>
      <div className={`${styles.detailPin} ${styles.detailPinWest}`} data-detail-pin="">
        <span />
      </div>
      <div className={`${styles.detailPin} ${styles.detailPinEast}`} data-detail-pin="">
        <span />
      </div>

      <div className={styles.houseViewport} data-house-viewport="">
        <svg viewBox="0 0 560 420" className={styles.objectSvg} role="presentation">
          <defs>
            <linearGradient id="houseBodyFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(28, 39, 54, 0.95)" />
              <stop offset="100%" stopColor="rgba(20, 24, 31, 0.98)" />
            </linearGradient>
            <linearGradient id="roofFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(205, 159, 100, 0.86)" />
              <stop offset="100%" stopColor="rgba(129, 91, 55, 0.92)" />
            </linearGradient>
            <linearGradient id="windowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(254, 222, 173, 0.92)" />
              <stop offset="100%" stopColor="rgba(210, 155, 89, 0.58)" />
            </linearGradient>
          </defs>

          <g className={styles.landOutline} data-land-outline="">
            <path d="M72 312C154 282 237 267 321 268C390 269 451 281 505 305" />
            <path d="M96 332C164 307 237 295 315 294C378 294 432 304 482 323" />
            <path d="M138 350C192 334 246 326 302 327C353 327 398 333 439 346" />
          </g>

          <g className={styles.measurementLines} data-measurement-lines="">
            <line x1="126" y1="112" x2="433" y2="112" />
            <line x1="126" y1="104" x2="126" y2="120" />
            <line x1="433" y1="104" x2="433" y2="120" />
            <line x1="156" y1="252" x2="156" y2="104" />
            <line x1="146" y1="252" x2="166" y2="252" />
            <line x1="146" y1="104" x2="166" y2="104" />
          </g>

          <g className={styles.frameLines} data-frame-lines="">
            <path d="M168 258V183L280 114L393 183V258" />
            <path d="M145 259H415" />
            <path d="M224 259V190H336V259" />
            <path d="M252 259V218H308V259" />
            <path d="M200 204H236V236H200Z" />
            <path d="M324 204H360V236H324Z" />
          </g>

          <g className={styles.houseShell} data-house-shell="">
            <path d="M169 258V182L280 114L392 182V258H169Z" fill="url(#houseBodyFill)" />
            <path d="M154 191L280 99L407 191L389 205L280 126L171 205Z" fill="url(#roofFill)" />
            <path d="M222 258V190H338V258H222Z" fill="rgba(18, 23, 29, 0.72)" />
          </g>

          <g className={styles.windowGroup} data-window-group="">
            <rect x="193" y="201" width="34" height="35" rx="4" fill="url(#windowGlow)" />
            <rect x="333" y="201" width="34" height="35" rx="4" fill="url(#windowGlow)" />
            <rect x="249" y="214" width="60" height="44" rx="5" fill="rgba(246, 201, 132, 0.82)" />
          </g>

          <g className={styles.roofHighlight}>
            <path d="M184 208L280 138L377 208" />
          </g>
        </svg>
      </div>
    </div>
  );
}
