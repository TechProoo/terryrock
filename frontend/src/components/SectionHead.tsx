import BrandMark from './BrandMark';

export type Clause = { readonly text: string; readonly tone: string };
export type Headline = readonly (readonly Clause[])[];

const toneClass: Record<string, string> = {
  plain: '',
  dim: 'c-dim',
  sand: 'c-sand',
};

type Props = {
  headline: Headline;
  lede?: string;
  /** Section-specific class for the h2, so each section keeps its own scale. */
  titleClassName: string;
};

/**
 * The centred mark / headline / lede stack every dark section opens with.
 * Clauses carry their own tone so a heading can shift colour mid-line.
 */
export default function SectionHead({ headline, lede, titleClassName }: Props) {
  return (
    <div className="section__head reveal">
      <BrandMark className="section__mark" height={40} decorative />

      <h2 className={titleClassName}>
        {headline.map((line, i) => (
          <span key={i} className="section__titleLine">
            {line.map((clause, j) => (
              <span key={j} className={toneClass[clause.tone]}>
                {clause.text}
                {j < line.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        ))}
      </h2>

      {lede ? <p className="section__lede">{lede}</p> : null}
    </div>
  );
}
