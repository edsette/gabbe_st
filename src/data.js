// Textos de gabbe-kit/02-conteudo/TEXTOS.md e cores de gabbe-kit/03-projetos/paletas.json

export const WHATSAPP = '5511943934176';
export const EMAIL = 'gsette@outlook.com';
export const INSTAGRAM = 'https://www.instagram.com/gabbedesigner_/';

export const waLink = assunto =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Olá, Gabriela! Vi seu site e quero conversar sobre ${assunto || 'um projeto'}.`
  )}`;

export const BRAND = [
  { nome: 'Petróleo', hex: '#004143' },
  { nome: 'Terracota', hex: '#AD6D4A' },
  { nome: 'Bege', hex: '#E9DDD1' }
];

export const PROJETOS = [
  {
    slug: 'casa-bianca',
    cliente: 'Casa Bianca 26 anos',
    setor: 'Materiais para construção',
    img: '/img/projetos/casa-bianca.jpg',
    cores: [
      { nome: 'Marinho', hex: '#0F1B33' },
      { nome: 'Amarelo obra', hex: '#F2C94C' },
      { nome: 'Branco', hex: '#FFFFFF' },
      { nome: 'Cinza concreto', hex: '#6B7280' }
    ]
  },
  {
    slug: 'afiacorte',
    cliente: 'Afiacorte',
    setor: 'Indústria de corte e afiação',
    img: '/img/projetos/afiacorte.jpg',
    cores: [
      { nome: 'Carvão', hex: '#21201E' },
      { nome: 'Verde corte', hex: '#93B715' },
      { nome: 'Cinza lâmina', hex: '#DBDCDE' }
    ]
  },
  {
    slug: 'settatelie',
    cliente: 'Settateliê',
    setor: 'Crochê e produtos artesanais',
    img: '/img/projetos/settatelie.jpg',
    cores: [
      { nome: 'Sálvia', hex: '#8A9A96' },
      { nome: 'Linho', hex: '#E2DAD2' },
      { nome: 'Algodão', hex: '#FFFFFF' }
    ]
  },
  {
    slug: 'original-aco',
    cliente: 'Original Aço',
    setor: 'Telhas metálicas e isotérmicas',
    img: '/img/projetos/original-aco.jpg',
    cores: [
      { nome: 'Preto aço', hex: '#000000' },
      { nome: 'Amarelo sinal', hex: '#FCD717' },
      { nome: 'Grafite', hex: '#494949' }
    ]
  },
  {
    slug: 'lc-modas',
    cliente: 'LC Modas',
    setor: 'Loja de moda feminina',
    img: '/img/projetos/lc-modas.jpg',
    cores: [
      { nome: 'Cacau', hex: '#733F2A' },
      { nome: 'Rosé argila', hex: '#C58272' },
      { nome: 'Pêssego', hex: '#FFDAD1' }
    ]
  }
];

export const SERVICOS = [
  {
    titulo: 'Identidade Visual & Branding',
    texto:
      'Sua marca precisa ser reconhecida, lembrada e transmitir confiança. Desenvolvo identidades visuais pensadas para refletir quem você é e gerar conexão real com seu público.',
    assunto: 'identidade visual',
    cor: '#004143'
  },
  {
    titulo: 'Social Media',
    texto:
      'Sua marca precisa estar presente de forma consistente e autêntica. Desenvolvo estratégias e conteúdos que aproximam seu negócio do público certo.',
    assunto: 'social media',
    cor: '#985A39'
  },
  {
    titulo: 'Sites',
    texto:
      'Seu site é muitas vezes o primeiro contato com o cliente. Crio páginas estratégicas que transmitem confiança, destacam seu valor e fortalecem sua presença digital.',
    assunto: 'um site',
    cor: '#052B2A'
  },
  {
    titulo: 'Mentoria Mercado Livre',
    texto:
      'Mentoria personalizada para quem quer vender no Mercado Livre de forma estratégica, otimizar processos e crescer com consistência.',
    assunto: 'a mentoria Mercado Livre',
    cor: '#AD6D4A'
  }
];

export const PROCESSO = [
  {
    titulo: 'Descoberta',
    texto: 'Tudo começa com uma conversa. Quero entender sua marca, seu momento atual e onde você deseja chegar.'
  },
  {
    titulo: 'Estratégia & Direção',
    texto:
      'A partir disso, construo uma direção criativa alinhada à essência do seu negócio, definindo referências e conceito.'
  },
  {
    titulo: 'Construção em conjunto',
    texto:
      'Transformo estratégia em criação, desenvolvendo cada detalhe com espaço para trocas e ajustes durante o processo.'
  },
  {
    titulo: 'Entrega & Continuidade',
    texto:
      'Você recebe tudo organizado, com orientações claras para aplicar sua nova marca com segurança e consistência.'
  }
];

export const TAGS = [
  'Publicidade & Propaganda',
  'Escrita Criativa & Copywriting',
  'Design Gráfico',
  'Social Media',
  'Mercado Livre & Shopee'
];

// --- utilidades de cor ---
export const hexToRgb = hex => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const rgbToCmyk = ([r, g, b]) => {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  if (k >= 1) return [0, 0, 0, 100];
  const f = v => Math.round(((1 - v - k) / (1 - k)) * 100);
  return [f(rr), f(gg), f(bb), Math.round(k * 100)];
};

const lum = hex =>
  hexToRgb(hex)
    .map(v => v / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);

export const inkFor = hex => (lum(hex) > 0.36 ? '#0E1715' : '#F7F2EC');
