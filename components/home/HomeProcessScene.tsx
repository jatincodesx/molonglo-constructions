import { ScrollScene } from "@/components/public-ui/ScrollScene";

const steps = [
  ["01", "Consult", "Clarify the block, goals, timing and budget before the project gathers momentum."],
  ["02", "Plan", "Turn the brief into documentation, approvals thinking and buildable decisions."],
  ["03", "Construct", "Manage the site with clear sequencing, trade coordination and practical communication."],
  ["04", "Handover", "Complete the home with quality checks, documentation and support beyond the keys."]
];

export function HomeProcessScene() {
  return (
    <ScrollScene chapter tone="dark" className="premium-home-process">
      <div className="container grid min-h-svh items-center gap-12 py-[var(--section-padding)] lg:grid-cols-[0.8fr_1.2fr]">
        <div data-scroll-reveal>
          <p className="eyebrow text-white">Signature Building Process</p>
          <h2 className="heading-lg mt-4 text-white">A walk through the build, not a dense checklist.</h2>
          <p className="mt-5 text-lg leading-8 text-white/90">
            Every stage is designed to keep the project clear, well-managed and aligned with the quality expectations of a premium Canberra home.
          </p>
        </div>

        <ol className="process-walk">
          {steps.map(([number, title, body]) => (
            <li key={number} data-scroll-reveal>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ScrollScene>
  );
}
