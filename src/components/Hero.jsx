import { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import SplitText from '../reactbits/SplitText.jsx';
import CircularText from '../reactbits/CircularText.jsx';
import Magnet from '../reactbits/Magnet.jsx';
import Mark from './Mark.jsx';
import { PROJETOS } from '../data.js';

// Amostras de cor dos projetos flutuando em volta do título, como cartelas sobre a mesa.
// [x%, y%, rotação]: margem direita e bordas, longe do título
const SPOTS = [
  [56, 16, -8], [92, 22, 6], [60, 82, -4], [86, 86, 10], [95, 54, -10],
  [72, 8, 4], [54, 50, -6], [80, 70, 8], [3, 92, 12], [46, 92, -12], [66, 30, 6], [97, 8, -3]
];

function Chip({ hex, nome, spot, i, mx, my, ready }) {
  const depth = 0.4 + (i % 4) * 0.35;
  const x = useTransform(mx, v => v * 28 * depth);
  const y = useTransform(my, v => v * 22 * depth);
  return (
    <motion.div
      className="chip"
      style={{ left: `${spot[0]}%`, top: `${spot[1]}%`, x, y }}
      initial={{ opacity: 0, scale: 0.3, rotate: spot[2] * 3 }}
      animate={ready ? { opacity: 1, scale: 1, rotate: spot[2] } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.5 + i * 0.06 }}
      whileHover={{ scale: 1.25, rotate: 0, zIndex: 5 }}
      data-cursor-color={hex}
    >
      <motion.span
        className="chip__inner"
        style={{ background: hex }}
        animate={{ y: [0, -8 - (i % 3) * 4, 0] }}
        transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="chip__label">
        {nome}
        <b>{hex}</b>
      </span>
    </motion.div>
  );
}

export default function Hero({ ready }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  const chips = useMemo(() => {
    const all = PROJETOS.flatMap(p => p.cores.map(c => ({ ...c, cliente: p.cliente })));
    const seen = new Set();
    return all.filter(c => !seen.has(c.hex) && seen.add(c.hex) && c.hex !== '#FFFFFF').slice(0, SPOTS.length);
  }, []);

  useEffect(() => {
    const move = e => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my]);

  const markX = useTransform(smx, v => v * -24);
  const markY = useTransform(smy, v => v * -18);

  return (
    <section className="hero" id="topo">
      <div className="hero__chips" aria-hidden="true">
        {chips.map((c, i) => (
          <Chip key={c.hex} {...c} spot={SPOTS[i]} i={i} mx={smx} my={smy} ready={ready} />
        ))}
      </div>

      <div className="hero__inner wrap">
        <div className="hero__copy">
          {ready ? (
            <SplitText
              tag="h1"
              className="hero__title"
              text="Marcas que se conectam, comunicam com verdade e deixam sua essência marcada."
              splitType="words"
              delay={60}
              duration={1}
              effect="rise"
              mask
              textAlign="left"
              threshold={0}
              rootMargin="0px"
            />
          ) : (
            <h1 className="hero__title" style={{ visibility: 'hidden' }}>
              Marcas que se conectam, comunicam com verdade e deixam sua essência marcada.
            </h1>
          )}
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Ajudo negócios a construir uma presença autêntica através de identidade visual, conteúdo e estratégia.
          </motion.p>
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Magnet padding={60} magnetStrength={3}>
              <a className="btn btn--solid" href="#contato">Iniciar um projeto</a>
            </Magnet>
            <a className="btn btn--line" href="#projetos">Conheça meu trabalho</a>
          </motion.div>
        </div>

        <motion.div
          className="hero__seal"
          style={{ x: markX, y: markY }}
          initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.3 }}
        >
          <CircularText
            text="GABBE • DESIGNER DE MARCAS • "
            size={360}
            fontSize={15}
            fontWeight={400}
            letterSpacing={1}
            repeat={2}
            spinDuration={28}
            onHover="slowDown"
            color="#D39A76"
            ring
            ringColor="rgba(233,221,209,.18)"
            className="seal"
          >
            <Mark className="hero__mark" />
          </CircularText>
        </motion.div>
      </div>

      <motion.a
        href="#crenca"
        className="hero__scroll"
        aria-label="Rolar para baixo"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
      </motion.a>
    </section>
  );
}
