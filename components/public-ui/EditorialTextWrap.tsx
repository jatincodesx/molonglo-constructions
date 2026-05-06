type EditorialTextWrapProps = {
  eyebrow?: string;
  title: string;
  text: string;
  className?: string;
};

export function EditorialTextWrap({ eyebrow, title, text, className = "" }: EditorialTextWrapProps) {
  return (
    <div className={`editorial-text-wrap ${className}`}>
      <div className="editorial-text-wrap__shape" aria-hidden="true" />
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="heading-lg mt-4">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-zinc-700">{text}</p>
    </div>
  );
}
