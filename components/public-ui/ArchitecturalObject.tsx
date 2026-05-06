type ArchitecturalObjectProps = {
  className?: string;
  variant?: "cinematic" | "accent";
};

export function ArchitecturalObject({ className = "", variant = "cinematic" }: ArchitecturalObjectProps) {
  return (
    <div className={`architectural-object ${className}`} data-architectural-object data-variant={variant} aria-hidden="true">
      <div className="architectural-object__camera">
        <div className="architectural-object__site">
          <span />
          <span />
          <span />
        </div>

        <div className="architectural-object__home">
          <div className="architectural-object__exterior">
            <div className="architectural-object__shadow" />
            <div className="architectural-object__front">
              <span className="architectural-object__window architectural-object__window--left" />
              <span className="architectural-object__window architectural-object__window--right" />
              <span className="architectural-object__door" />
              <span className="architectural-object__entry-glow" />
            </div>
            <div className="architectural-object__side">
              <span />
            </div>
            <div className="architectural-object__roof" />
          </div>

          <div className="architectural-object__interior">
            <div className="architectural-object__blueprint" />
            <span className="architectural-object__room architectural-object__room--living" />
            <span className="architectural-object__room architectural-object__room--kitchen" />
            <span className="architectural-object__room architectural-object__room--entry" />
            <span className="architectural-object__line architectural-object__line--one" />
            <span className="architectural-object__line architectural-object__line--two" />
            <span className="architectural-object__line architectural-object__line--three" />
          </div>

          <div className="architectural-object__construction">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="architectural-object__handover">
            <span className="architectural-object__warmth" />
            <span className="architectural-object__key" />
          </div>
        </div>
      </div>
    </div>
  );
}
