import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-white">
      <div className="container max-w-3xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="heading-lg mt-4">The page you are looking for could not be found.</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-700">
          The link may have changed, or the page may have been removed during the rebuild. Use the links below to keep exploring the site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="cta">Go Home</Link>
          <Link href="/contact" className="cta-secondary">Contact Molonglo Construction</Link>
        </div>
      </div>
    </section>
  );
}
