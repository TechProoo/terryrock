import { brand } from '../data/site';

type MarkProps = {
  className?: string;
  /**
   * Rendered height; width follows the lockup's own aspect ratio. A number is
   * px. A CSS length — a `clamp()`, say — sizes it against the viewport the
   * way the rest of the page is sized, and `reserve` is then the px height the
   * `height` attribute claims.
   */
  height?: number | string;
  /**
   * The px height written to the `height` attribute when `height` is a CSS
   * length. The attribute holds the row open before the image loads, so
   * without it a fluid mark starts at nothing and the bar jumps.
   */
  reserve?: number;
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
export default function BrandMark({
  className,
  height = 30,
  reserve,
  decorative = false,
}: MarkProps) {
  return (
    <img
      className={className}
      src={brand.logo}
      height={typeof height === 'number' ? height : reserve}
      style={{ height, width: 'auto' }}
      alt={decorative ? '' : brand.legalName}
      aria-hidden={decorative || undefined}
      draggable={false}
    />
  );
}
