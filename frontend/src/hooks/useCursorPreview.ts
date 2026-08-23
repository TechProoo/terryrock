import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type Options = {
  /** Selector for each hoverable row, scoped to the container. */
  row: string;
  /** Selector for the image inside a row that follows the pointer. */
  preview: string;
  /** Resting scale, so the image grows very slightly as it fades in. */
  from?: number;
};

/**
 * Rows that reveal a photograph tracking the pointer, after GreenSock's
 * cursor-tracking image preview demo.
 *
 * `gsap.quickTo` reuses one tween per property rather than spawning one per
 * mousemove, which is what keeps a pointer-rate handler cheap.
 *
 * Two things here are easy to get wrong and are the reason this is a hook
 * rather than copied into each section:
 *
 *   - Centring must be xPercent/yPercent, never a CSS translate. GSAP resolves
 *     an existing translate into `x`/`y` in pixels, and the pointer tween then
 *     overwrites the very offset that was doing the centring.
 *   - The listeners are bound to the document, so they have to be handed back
 *     for cleanup. Returning them from inside a `forEach` silently discards
 *     them and leaks a listener per row on every unmount.
 *
 * Pointer-driven, so it only runs where there is a real pointer; sections using
 * it are expected to show the same photographs another way on touch.
 */
export default function useCursorPreview(
  scope: RefObject<HTMLElement | null>,
  { row, preview, from = 0.92 }: Options,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(preview, { xPercent: -50, yPercent: -50, scale: from });

        const teardown: Array<() => void> = [];

        gsap.utils.toArray<HTMLElement>(row).forEach((element) => {
          const image = element.querySelector<HTMLElement>(preview);
          if (!image) return;

          const setX = gsap.quickTo(image, 'x', { duration: 0.4, ease: 'power3' });
          const setY = gsap.quickTo(image, 'y', { duration: 0.4, ease: 'power3' });

          /* The first move of a new row jumps rather than travelling across the
             page: quickTo takes a start value as its second argument. */
          let entering = false;
          const align = (event: MouseEvent) => {
            if (entering) {
              setX(event.clientX, event.clientX);
              setY(event.clientY, event.clientY);
              entering = false;
            } else {
              setX(event.clientX);
              setY(event.clientY);
            }
          };

          const stopFollow = () => document.removeEventListener('mousemove', align);
          const fade = gsap.to(image, {
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.out',
            paused: true,
            duration: 0.28,
            onReverseComplete: stopFollow,
          });

          const onEnter = (event: MouseEvent) => {
            entering = true;
            fade.play();
            document.addEventListener('mousemove', align);
            align(event);
          };
          const onLeave = () => fade.reverse();

          element.addEventListener('mouseenter', onEnter);
          element.addEventListener('mouseleave', onLeave);

          teardown.push(() => {
            stopFollow();
            element.removeEventListener('mouseenter', onEnter);
            element.removeEventListener('mouseleave', onLeave);
          });
        });

        return () => teardown.forEach((off) => off());
      });
    },
    { scope },
  );

  /* A pointer that leaves the window mid-hover never fires mouseleave on the
     row, which would strand a preview on screen. */
  useEffect(() => {
    const clear = () => {
      const images = scope.current?.querySelectorAll<HTMLElement>(preview);
      if (images?.length) gsap.to(images, { autoAlpha: 0, duration: 0.2, overwrite: true });
    };
    document.addEventListener('mouseleave', clear);
    return () => document.removeEventListener('mouseleave', clear);
  }, [scope, preview]);
}
