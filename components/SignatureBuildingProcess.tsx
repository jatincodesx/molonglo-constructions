const steps = [
  {
    title: "Initial Consultation",
    body: "We discuss your site, goals, requirements and budget so the project starts from a practical foundation."
  },
  {
    title: "Design & Planning",
    body: "We work with your designer, architect, or planning team to align the design, documentation, budget, and buildability."
  },
  {
    title: "Approvals & Contracts",
    body: "Approvals, scope and contract details are coordinated before construction begins."
  },
  {
    title: "Construction",
    body: "Our skilled team brings your vision to life with quality craftsmanship and attention to detail."
  },
  {
    title: "Final Inspection",
    body: "Thorough quality checks ensure everything meets our high standards before handover."
  },
  {
    title: "Handover",
    body: "Welcome to your new home. We provide full documentation and support even after completion."
  }
];

export function SignatureBuildingProcess() {
  return (
    <section className="section bg-[var(--color-stone)]">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Our Signature Building Process</p>
          <h2 className="heading-lg mt-4">A clear sequence from consultation to handover.</h2>
          <p>
            Every stage is designed to keep the project clear, well-managed and aligned with the quality expectations of a premium Canberra home.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="h-full bg-[var(--color-paper)] p-6">
              <p className="text-sm font-semibold text-molonglo-gold">
                Step {index + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-700">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
