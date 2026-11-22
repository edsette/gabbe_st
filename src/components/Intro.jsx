import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Mark from './Mark.jsx';

// Abertura: o símbolo se desenha sobre o petróleo, as três cores da marca sobem e revelam o site.
export default function Intro({ onDone }) {
  const root = useRef(null);
  const svg = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.documentElement.classList.add('is-locked');
      const finish = () => {
        document.documentElement.classList.remove('is-locked');
        onDone();
      };
      if (reduce) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, onComplete: finish });
        return;
      }
      const paths = svg.current.querySelectorAll('[data-draw]');
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(paths, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.14 })
        .from('.intro__word span', { yPercent: 110, duration: 0.7, ease: 'power3.out', stagger: 0.05 }, '-=0.5')
        .to('.intro__count', { innerText: 100, snap: { innerText: 1 }, duration: 1.2, ease: 'power1.inOut' }, 0)
        .to('.intro__brand', { y: -30, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, '+=0.35')
        .to('.intro__panel', { yPercent: -100, duration: 0.85, ease: 'expo.inOut', stagger: 0.09 }, '-=0.15')
        .set(root.current, { display: 'none' });

      const skip = () => tl.progress(1);
      root.current.addEventListener('click', skip);
    },
    { scope: root }
  );

  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro__panel" style={{ background: '#E9DDD1' }} />
      <div className="intro__panel" style={{ background: '#AD6D4A' }} />
      <div className="intro__panel intro__panel--top" style={{ background: '#004143' }}>
        <div className="intro__brand">
          <Mark className="intro__mark" drawRef={svg} />
          <div className="intro__word">
            {'GABBE'.split('').map((l, i) => (
              <span key={i}>{l === 'A' ? 'Λ' : l}</span>
            ))}
          </div>
        </div>
        <span className="intro__count">0</span>
      </div>
    </div>
  );
}
