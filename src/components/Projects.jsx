import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJETOS, hexToRgb, rgbToCmyk, inkFor } from '../data.js';

gsap.registerPlugin(ScrollTrigger);

const mix = (a, b, t) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v * t + B[i] * (1 - t))).join(', ')})`;
};

function Swatch({ cor, main, onCopy }) {
  const rgb = hexToRgb(cor.hex);
  const cmyk = rgbToCmyk(rgb);
  const ink = inkFor(cor.hex);
  return (
    <button
      type="button"
      className={`swatch${main ? ' swatch--main' : ''}`}
      style={{ background: cor.hex, color: ink }}
      data-cursor-color={cor.hex}
      onClick={() => onCopy(cor)}
      aria-label={`${cor.nome}, ${cor.hex}. Copiar HEX`}
    >
      <span className="swatch__fill" />
      <span className="swatch__row">
        <span>{cor.nome}</span>
        <span className="swatch__hex">{cor.hex.replace('#', '')}</span>
      </span>
      <span className="swatch__more">
        <span>RGB {rgb.join(' ')}</span>
        <span>CMYK {cmyk.join(' ')}</span>
      </span>
    </button>
  );
}

export default function Projects() {
  const root = useRef(null);
  const [toast, setToast] = useState(null);
  const [open, setOpen] = useState(null);
  const dialog = useRef(null);

  const copy = async cor => {
    try {
      await navigator.clipboard.writeText(cor.hex);
    } catch {
      /* sem permissão de área de transferência: ainda mostra o HEX */
    }
    setToast({ ...cor, id: Date.now() });
    clearTimeout(copy.t);
    copy.t = setTimeout(() => setToast(null), 1800);
  };

  const openImg = p => {
    setOpen(p);
    dialog.current?.showModal();
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.project').forEach(el => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          tl.from(el.querySelectorAll('.swatch__fill'), {
            scaleY: 1,
            duration: 0.9,
            ease: 'expo.inOut',
            stagger: 0.12
          })
            .from(el.querySelector('.project__img'), { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'expo.out' }, 0)
            .from(el.querySelectorAll('.project__title > *'), { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 0.2);

          gsap.fromTo(
            el.querySelector('.project__img img'),
            { yPercent: -6, scale: 1.12 },
            { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: el, scrub: true } }
          );

          // o fundo da seção assume um tom da paleta do projeto em foco
          ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: self =>
              self.isActive &&
              gsap.to(root.current, { '--tint': el.dataset.tint, duration: 0.9, ease: 'power2.out' })
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="projects" id="projetos" ref={root}>
      <header className="projects__head wrap">
        <h2 className="h-section">Projetos</h2>
        <p className="lead">
          Cada marca começa pela cor certa. Passe pelas paletas, abra os detalhes e clique numa cor para copiar o HEX.
        </p>
      </header>

      <div className="wrap projects__list">
        {PROJETOS.map((p, i) => (
          <article className={`project${i % 2 ? ' project--flip' : ''}`} key={p.slug} data-tint={mix(p.cores[0].hex, '#F2EBE2', 0.1)}>
            <div className="project__title">
              <h3>{p.cliente}</h3>
              <p>{p.setor}</p>
            </div>
            <button type="button" className="project__img" onClick={() => openImg(p)} data-cursor="Ver">
              <img src={p.img} alt={`Identidade visual ${p.cliente}`} loading="lazy" />
            </button>
            <div className="palette" role="group" aria-label={`Paleta ${p.cliente}`}>
              {p.cores.map((c, j) => (
                <Swatch key={c.hex + j} cor={c} main={j === 0} onCopy={copy} />
              ))}
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="toast"
            role="status"
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            <span className="toast__chip" style={{ background: toast.hex }} />
            {toast.hex} copiado
          </motion.div>
        )}
      </AnimatePresence>

      <dialog className="lightbox" ref={dialog} onClick={e => e.target === dialog.current && dialog.current.close()}>
        {open && <img src={open.img} alt={`Identidade visual ${open.cliente}`} />}
        <button type="button" className="lightbox__close" onClick={() => dialog.current.close()}>
          Fechar
        </button>
      </dialog>
    </section>
  );
}
