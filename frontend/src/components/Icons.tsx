/**
 * Line icons, all drawn on a 24×24 grid with `currentColor` strokes so they
 * pick up whatever surface they land on.
 */

type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export function IconMenu({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 8h16M4 15h16" />
    </svg>
  );
}

export function IconPin({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconEye({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" />
      <circle cx="12" cy="12" r="2.9" />
    </svg>
  );
}

/* The social marks all default to 22 rather than the 16 the UI icons use: they
   sit alone on glass in the hero rail, and at the line weight this set shares
   they read as scuffs at anything smaller. Keeping the default equal across
   them is what makes the rail read as one row rather than three sizes. */

export function IconInstagram({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* The note: a stem down the right, the flag off its top, and the disc at the
   foot. The stem stops on the disc's rightmost point so the two meet cleanly
   at any size rather than crossing. */
export function IconTikTok({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M15 3.6v11.5" />
      <path d="M15 3.6c.4 2.3 2.1 3.9 4.4 4.2" />
      <circle cx="11.1" cy="15.1" r="3.9" />
    </svg>
  );
}

/* A roster mark, not a portrait: head over shoulders on the same 24 grid as
   the rest. The shoulders are an arc rather than a closed shape so it reads at
   the weight the set shares instead of filling in to a blob at small sizes. */
export function IconAvatar({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="8.6" r="3.9" />
      <path d="M4.9 19.7a7.4 7.4 0 0 1 14.2 0" />
    </svg>
  );
}

export function IconX({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4.6 4.6l14.8 14.8M19.4 4.6L4.6 19.4" />
    </svg>
  );
}

export function IconArrow({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 12h13M12.6 6.2 18.4 12l-5.8 5.8" />
    </svg>
  );
}

export function IconInfo({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11.2v5" />
      <circle cx="12" cy="8.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChevron({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9.4 5.6 15.8 12l-6.4 6.4" />
    </svg>
  );
}

export function IconPhone({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6.3 3.6h3l1.5 3.7-1.9 1.1a10.4 10.4 0 0 0 4.7 4.7l1.1-1.9 3.7 1.5v3a1.8 1.8 0 0 1-2 1.8A14.9 14.9 0 0 1 4.5 5.6a1.8 1.8 0 0 1 1.8-2Z" />
    </svg>
  );
}

export function IconMail({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7 7.1 5.2a2 2 0 0 0 2.2 0L20.2 7" />
    </svg>
  );
}

export function IconShare({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="17.5" cy="6" r="2.6" />
      <circle cx="6.5" cy="12" r="2.6" />
      <circle cx="17.5" cy="18" r="2.6" />
      <path d="m8.9 10.8 6.3-3.4M8.9 13.2l6.3 3.4" />
    </svg>
  );
}

/**
 * The WhatsApp mark. Solid rather than stroked — it is a logo, and the
 * recognisable silhouette is the point.
 */
export function IconWhatsApp({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.14-.18.19-.3.29-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.16-3.48-8.4" />
    </svg>
  );
}
