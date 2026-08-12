type SectionHeadingProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
  prominent?: boolean;
};

export function SectionHeading({
  headingId,
  eyebrow,
  title,
  description,
  inverse = false,
  prominent = false,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
      <p
        className={`pt-1 font-mono text-xs font-medium tracking-[0.18em] uppercase ${
          inverse ? "text-[var(--accent-light)]" : "text-[var(--accent)]"
        }`}
      >
        {eyebrow}
      </p>
      <div>
        <h2
          className={`font-medium tracking-[-0.04em] text-balance ${
            prominent
              ? "text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
              : "text-3xl leading-[1.12] sm:text-4xl"
          }`}
          id={headingId}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 max-w-2xl text-base leading-7 sm:text-lg ${
              inverse ? "text-white/65" : "text-[var(--muted)]"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
