import styles from "./HouseWalkthroughScene.module.css";

export function HouseWalkthroughObject() {
  return (
    <div className={styles.objectShell} aria-hidden="true">
      <div className={styles.camera} data-house-camera>
        <div className={styles.landPlane} data-house-land>
          <span className={styles.siteLine} />
          <span className={styles.siteLine} />
          <span className={styles.siteLine} />
        </div>

        <div className={styles.houseObject} data-house-object>
          <div className={styles.exteriorLayer} data-house-exterior>
            <div className={styles.houseShadow} />
            <div className={styles.frontWall} data-house-front>
              <span className={styles.archLine} />
              <span className={`${styles.window} ${styles.windowLeft}`} />
              <span className={`${styles.window} ${styles.windowRight}`} />
              <span className={styles.entryDoor} data-house-door>
                <span className={styles.doorHandle} />
              </span>
              <span className={styles.doorGlow} data-house-door-glow />
            </div>
            <div className={styles.sideWall} data-house-side>
              <span className={styles.sideWindow} />
              <span className={styles.sideReveal} />
            </div>
            <div className={styles.roof} data-house-roof>
              <span className={styles.roofCap} />
            </div>
          </div>

          <div className={styles.interiorLayer} data-house-interior>
            <div className={styles.blueprintGrid} data-blueprint-grid />
            <div className={styles.roomPlane}>
              <span className={`${styles.wallLine} ${styles.wallBack}`} />
              <span className={`${styles.wallLine} ${styles.wallLeft}`} />
              <span className={`${styles.wallLine} ${styles.wallRight}`} />
              <span className={`${styles.frameLine} ${styles.frameLineOne}`} data-frame-line />
              <span className={`${styles.frameLine} ${styles.frameLineTwo}`} data-frame-line />
              <span className={`${styles.frameLine} ${styles.frameLineThree}`} data-frame-line />
              <span className={`${styles.frameLine} ${styles.frameLineFour}`} data-frame-line />
              <span className={`${styles.interiorWindow} ${styles.interiorWindowLeft}`} />
              <span className={`${styles.interiorWindow} ${styles.interiorWindowRight}`} />
              <span className={styles.floorGrain} />
            </div>

            <div className={styles.markerLayer}>
              <span className={`${styles.detailMarker} ${styles.detailMarkerOne}`} data-detail-marker>
                joinery
              </span>
              <span className={`${styles.detailMarker} ${styles.detailMarkerTwo}`} data-detail-marker>
                glazing
              </span>
              <span className={`${styles.detailMarker} ${styles.detailMarkerThree}`} data-detail-marker>
                finish
              </span>
            </div>

            <div className={styles.handoverLayer} data-handover-key>
              <span className={styles.keyRing} />
              <span className={styles.keyStem} />
              <span className={styles.keyTooth} />
            </div>

            <div className={styles.finalGlow} data-final-glow />
          </div>
        </div>
      </div>
    </div>
  );
}
