import { brand } from '../data/site';

type MarkProps = {
  className?: string;
  /** Rendered height in px; width follows the lockup's own aspect ratio. */
  height?: number;
  /**
   * Decorative instances (the marks that sit above a section heading, where the
   * company name is already in the heading) pass `decorative` so the logo is
   * hidden from assistive tech instead of repeating the name.
   */
  decorative?: boolean;
};

/**
 * The TerryRock Technical lockup. It is a wide horizontal mark — roughly 3.5:1 —
 * so it is sized by height and never squeezed into a square.
 */
export default function BrandMark({ className, height = 30, decorative = false }: MarkProps) {
  return (
    <img
      className={className}
      src={brand.logo}
      height={height}
      style={{ height, width: 'auto' }}
      alt={decorative ? '' : brand.legalName}
      aria-hidden={decorative || undefined}
      draggable={false}
    />
  );
}
