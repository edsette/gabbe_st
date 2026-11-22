import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Cursor que segue o ponteiro com mola e assume a cor do que está embaixo dele (data-cursor-color).
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [state, setState] = useState({ color: null, big: false, label: '' });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');
    const move = e => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target.closest?.('[data-cursor-color], a, button, [data-cursor]');
      if (!t) return setState(s => (s.big || s.color ? { color: null, big: false, label: '' } : s));
      setState({
        color: t.dataset.cursorColor || null,
        big: true,
        label: t.dataset.cursor || ''
      });
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden="true">
      <motion.div
        className="cursor__dot"
        animate={{
          scale: state.label ? 5.2 : state.big ? 2.6 : 1,
          backgroundColor: state.color || '#AD6D4A'
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      />
      {state.label && (
        <motion.span className="cursor__label" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          {state.label}
        </motion.span>
      )}
    </motion.div>
  );
}
