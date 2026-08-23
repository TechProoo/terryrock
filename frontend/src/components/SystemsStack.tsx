import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { systemsPage } from '../data/systemsPage';
import './SystemsStack.css';

gsap.registerPlugin(useGSAP, Flip);

/**
 * The five system groups as a Flip card stack, after GreenSock's card-stack
 * demo (demos.gsap.com/demo/card-stack).
 *
 * The demo clones and removes DOM nodes on every click, which would fight
 * React. Here the five cards stay mounted and only their order changes: Flip
 * records where each card was before the re-render and animates it to wherever
 * React put it. Same effect, no DOM surgery.
 */
export default function SystemsStack() {
  const { stack } = systemsPage;
  const root = useRef<HTMLDivElement>(null);

  const [order, setOrder] = useState(() => stack.cards.map((_, i) => i));
  const flipState = useRef<Flip.FlipState | null>(null);

  /* Front card goes to the back. Measure first, then let React reorder. */
  const advance = useCallback(() => {
    flipState.current = Flip.getState('.stk__card');
    setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);
  }, []);

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        targets: '.stk__card',
        absolute: true,
        ease: 'sine.inOut',
        duration: 0.62,
      });
      /* The card that wrapped round would otherwise slide across its
         neighbours; a short dip hands it to the back instead. */
      gsap.fromTo(
        '.stk__card:first-child',
        { opacity: 0, yPercent: 6 },
        { opacity: 1, yPercent: 0, duration: 0.42, ease: 'expo.out' },
      );
    },
    { dependencies: [order], scope: root },
  );

  /* `order` is back-to-front, so the last entry is the card on top. */
  const front = stack.cards[order[order.length - 1]];

  return (
    <section className="stk" ref={root}>
      <div className="stk__inner shell">
        <div className="stk__copy">
          <p className="micro stk__eyebrow">{stack.eyebrow}</p>
          <h2 className="stk__title">
            {stack.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          {/* Reads out whichever card is on top. */}
          <div className="stk__detail" aria-live="polite">
            <span className="tag stk__tag">{front.tag}</span>
            <h3 className="stk__cardTitle">
              {front.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
            <p className="stk__cardBody">{front.body}</p>
          </div>

          <button type="button" className="pill pill--outline stk__next" onClick={advance}>
            {stack.hint}
          </button>
        </div>

        <div className="stk__stage">
          <div className="stk__deck">
            {order.map((cardIndex, position) => {
              const card = stack.cards[cardIndex];
              return (
                <button
                  type="button"
                  key={card.tag}
                  className="stk__card"
                  style={{ '--p': position } as React.CSSProperties}
                  onClick={advance}
                  aria-label={`${card.tag} — next system`}
                  tabIndex={position === order.length - 1 ? 0 : -1}
                >
                  <img src={card.image} alt={card.alt} />
                  <span className="stk__cardVeil" aria-hidden="true" />
                  <span className="stk__cardTag">{card.tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
