import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import ScrollReveal from '../reactbits/ScrollReveal.jsx';
import ScrollVelocity from '../reactbits/ScrollVelocity.jsx';
import Magnet from '../reactbits/Magnet.jsx';
import SplitText from '../reactbits/SplitText.jsx';
import { QRCodeSVG } from 'qrcode.react';
import { SERVICOS, PROCESSO, TAGS, EMAIL, INSTAGRAM, waLink } from '../data.js';

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  ['Projetos', '#projetos'],
  ['Sobre', '#sobre'],
  ['Serviços', '#servicos'],
  ['Contato', '#contato']
];

/* ---------------- Cabeçalho ---------------- */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, 'change', v => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400 && !menu);
    setSolid(v > 60);
  });

  const links = (
    <>
      {NAV.map(([label, href]) => (
        <a key={href} href={href} onClick={() => setMenu(false)} className="nav__link">
          <span data-text={label}>{label}</span>
        </a>
      ))}
      <a className="btn btn--small" href={waLink()} target="_blank" rel="noopener" onClick={() => setMenu(false)}>
        Conversar no WhatsApp
      </a>
    </>
  );

  return (
    <>
    <nav className={`mnav${menu ? ' mnav--open' : ''}`} aria-label="Menu" aria-hidden={!menu} inert={!menu}>
      {links}
    </nav>
    <motion.header
      className={`header${solid ? ' header--solid' : ''}${menu ? ' header--menu' : ''}`}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header__inner wrap">
        <a href="#topo" className="header__logo" aria-label="Gabbe, voltar ao início">
          <img src={`${import.meta.env.BASE_URL}img/logo-horizontal.png`} alt="Gabbe Designer de Marcas" width="160" height="46" />
        </a>
        <nav className="nav" aria-label="Principal">
          {links}
        </nav>
        <button
          className={`burger${menu ? ' burger--open' : ''}`}
          aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menu}
          onClick={() => setMenu(m => !m)}
        >
          <span />
          <span />
        </button>
      </div>
    </motion.header>
    </>
  );
}

/* ---------------- Faixa de serviços que acelera com a rolagem ---------------- */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <ScrollVelocity
        texts={['Identidade visual  ◐  Social media  ◐  Sites  ◐  Mentoria Mercado Livre  ◐  ']}
        velocity={40}
        numCopies={4}
        className="marquee__text"
        skewWithVelocity={6}
      />
    </div>
  );
}

/* ---------------- Crença ---------------- */
export function Belief() {
  return (
    <section className="belief wrap" id="crenca">
      <ScrollReveal
        baseOpacity={0.12}
        enableBlur
        blurStrength={6}
        baseRotation={2}
        containerClassName="belief__reveal"
        textClassName="belief__text"
        wordAnimationEnd="bottom 60%"
      >
        Acredito que um bom marketing vai além da estética: ele precisa comunicar, engajar e gerar resultados reais.
      </ScrollReveal>
      <div className="belief__brand" aria-label="Cores da marca Gabbe">
        {[
          ['Petróleo', '#004143'],
          ['Terracota', '#AD6D4A'],
          ['Bege', '#E9DDD1']
        ].map(([n, h], i) => (
          <motion.span
            key={h}
            style={{ background: h }}
            data-cursor-color={h}
            title={`${n} ${h}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Sobre (texto aprovado, não alterar) ---------------- */
export function About() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about__photo', {
          clipPath: 'inset(18% 18% 18% 18% round 200px)',
          ease: 'none',
          scrollTrigger: { trigger: '.about__photo', start: 'top 90%', end: 'top 30%', scrub: true }
        });
        gsap.fromTo(
          '.about__photo img',
          { scale: 1.25, yPercent: -4 },
          { scale: 1.05, yPercent: 4, ease: 'none', scrollTrigger: { trigger: root.current, scrub: true } }
        );
        gsap.from('.about__body p, .about__tags li', {
          y: 24,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.about__body', start: 'top 75%' }
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="about" id="sobre" ref={root}>
      <div className="wrap about__grid">
        <figure className="about__photo">
          <img src={`${import.meta.env.BASE_URL}img/gabriela.jpg`} alt="Gabriela Sette" loading="lazy" />
        </figure>
        <div className="about__body">
          <h2 className="h-section">Prazer, sou Gabriela Sette</h2>
          <p>
            Sou graduada em Publicidade e Propaganda e atualmente curso pós-graduação em Escrita Criativa e
            Copywriting. Atuo na área de marketing desde 2018, desenvolvendo estratégias que unem criatividade,
            comunicação e resultados.
          </p>
          <p>
            Minha experiência é voltada para Design Gráfico e Social Media, criando identidades visuais, conteúdos e
            campanhas que fortalecem marcas e geram conexão com o público. Além disso, possuo conhecimento técnico em
            vendas online, com atuação em marketplaces como Mercado Livre e Shopee, auxiliando empresas a aumentarem
            sua presença digital e potencializarem suas vendas.
          </p>
          <p>
            Acredito que um bom marketing vai além da estética: ele precisa comunicar, engajar e gerar resultados
            reais. Por isso, busco desenvolver soluções criativas e estratégicas, alinhadas aos objetivos de cada
            cliente.
          </p>
          <ul className="about__tags">
            {TAGS.map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Serviços ---------------- */
export function Services() {
  const [active, setActive] = useState(null);
  return (
    <section className="services" id="servicos">
      <div className="wrap">
        <header className="services__head">
          <h2 className="h-section">O que podemos criar juntos para a sua marca?</h2>
          <p className="lead">
            Antes de criar qualquer detalhe visual, eu mergulho na essência do seu negócio. Porque uma marca forte
            começa com estratégia, propósito e conexão.
          </p>
        </header>
        <ul className="services__list" onMouseLeave={() => setActive(null)}>
          {SERVICOS.map((s, i) => (
            <li
              key={s.titulo}
              className={`service${active === i ? ' service--on' : ''}`}
              onMouseEnter={() => setActive(i)}
              style={{ '--c': s.cor }}
            >
              {active === i && (
                <motion.span
                  layoutId="service-bg"
                  className="service__bg"
                  style={{ background: s.cor }}
                  transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                />
              )}
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
              <a href={waLink(s.assunto)} target="_blank" rel="noopener" className="service__cta">
                Quero conversar sobre {s.assunto}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Processo (sequência real: numeração faz sentido) ---------------- */
export function Process() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.process__line i', {
          scaleX: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 70%', scrub: true }
        });
        gsap.utils.toArray('.step').forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: root.current, start: `top+=${i * 60} 70%` }
          });
        });
      });
    },
    { scope: root }
  );
  return (
    <section className="process" ref={root}>
      <div className="wrap">
        <h2 className="h-section">Como trabalhamos</h2>
        <div className="process__line" aria-hidden="true">
          <i />
        </div>
        <ol className="process__steps">
          {PROCESSO.map((p, i) => (
            <li className="step" key={p.titulo}>
              <span className="step__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Mentoria Mercado Livre ---------------- */
export function Mentoria() {
  const beneficios = [
    'Aumente suas vendas',
    'Anuncie com estratégia',
    'Conquiste o Buy Box',
    'Mais visibilidade e reputação'
  ];
  const diferenciais = ['Atendimento individual', 'Planos personalizados', 'Acompanhamento próximo', 'Foco em resultados'];
  return (
    <section className="mentoria" id="mentoria">
      <div className="wrap mentoria__grid">
        <div>
          <h2 className="h-section">Mentoria Mercado Livre</h2>
          <p className="mentoria__title">
            <SplitText text="Venda mais." tag="span" splitType="chars" delay={35} effect="rise" mask textAlign="left" />
            <SplitText text="Venda melhor." tag="span" splitType="chars" delay={35} effect="rise" mask textAlign="left" />
          </p>
          <p className="mentoria__text">
            Mentoria personalizada para vendedores que querem se destacar no Mercado Livre. Estratégias práticas,
            resultados reais: do iniciante ao avançado, eu te guio!
          </p>
          <Magnet padding={50} magnetStrength={3}>
            <a className="btn btn--light" href={waLink('a mentoria Mercado Livre')} target="_blank" rel="noopener">
              Quero a mentoria
            </a>
          </Magnet>
        </div>
        <div className="mentoria__lists">
          <ul className="mentoria__benefits">
            {beneficios.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 18 }}
              >
                {b}
              </motion.li>
            ))}
          </ul>
          <ul className="mentoria__diff">
            {diferenciais.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contato ---------------- */
const ASSUNTOS = [
  ['Identidade visual', 'identidade visual'],
  ['Social media', 'social media'],
  ['Site', 'um site'],
  ['Mentoria', 'a mentoria Mercado Livre']
];

export function Contact() {
  const [assunto, setAssunto] = useState(null);
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* ignora */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const label = ASSUNTOS.find(([, v]) => v === assunto)?.[0];
  return (
    <section className="contact" id="contato">
      <div className="wrap contact__grid">
        <div className="contact__main">
        <SplitText
          tag="h2"
          className="contact__title"
          text="Vamos construir algo que represente a essência da sua marca."
          splitType="words"
          delay={45}
          effect="rise"
          mask
          textAlign="left"
        />
        <p className="contact__lead">
          Cada projeto começa com uma boa conversa. Me conte sobre sua marca e vamos entender juntos o melhor caminho
          para ela crescer.
        </p>

        <div className="contact__pick">
          <p id="assunto-label">Sobre o que você quer conversar?</p>
          <div className="chips" role="radiogroup" aria-labelledby="assunto-label">
            {ASSUNTOS.map(([label, val]) => (
              <button
                key={val}
                type="button"
                role="radio"
                aria-checked={assunto === val}
                className="pick"
                onClick={() => setAssunto(a => (a === val ? null : val))}
              >
                {assunto === val && (
                  <motion.span layoutId="pick-bg" className="pick__bg" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
                )}
                <span className="pick__label">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="contact__actions">
          <Magnet padding={80} magnetStrength={2.5}>
            <a className="btn btn--big" href={waLink(assunto)} target="_blank" rel="noopener">
              Chamar no WhatsApp
            </a>
          </Magnet>
          <div className="contact__links">
            <button type="button" onClick={copyEmail} className="contact__mail">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'c' : 'e'}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {copied ? 'E-mail copiado' : EMAIL}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={INSTAGRAM} target="_blank" rel="noopener">
              Instagram @gabbedesigner_
            </a>
            <a href={waLink(assunto)} target="_blank" rel="noopener">
              (11) 94393-4176
            </a>
          </div>
        </div>
        </div>

        <motion.figure
          className="qr"
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
        >
          <div className="qr__card">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={assunto || 'geral'}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
              >
                <QRCodeSVG
                  value={waLink(assunto)}
                  size={220}
                  level="H"
                  bgColor="#E9DDD1"
                  fgColor="#052B2A"
                  marginSize={0}
                  imageSettings={{ src: `${import.meta.env.BASE_URL}img/icone.png`, height: 46, width: 46, excavate: true }}
                  title="QR code para abrir o WhatsApp da Gabriela"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <figcaption>
            Aponte a câmera do celular para abrir o WhatsApp
            {label ? ` já com o assunto ${label.toLowerCase()}.` : '.'}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

/* ---------------- Rodapé ---------------- */
export function Footer() {
  const [year] = useState(() => new Date().getFullYear());
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <img src={`${import.meta.env.BASE_URL}img/logo-horizontal.png`} alt="Gabbe Designer de Marcas" width="180" height="52" loading="lazy" />
        <p>
          © {year} Gabbe, Gabriela Sette. Desenvolvido por{' '}
          <a href="https://edsette.github.io/edusettedev/" target="_blank" rel="noopener">
            Eduardo Sette
          </a>
          .
        </p>
        <a href="#topo">Voltar ao topo</a>
      </div>
    </footer>
  );
}

export function useRefreshOnLoad() {
  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    window.addEventListener('load', r);
    document.fonts?.ready.then(r);
    return () => window.removeEventListener('load', r);
  }, []);
}
