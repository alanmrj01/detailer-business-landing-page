import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import coverImage from './assets/capa-dark.webp';
import decisionImage from './assets/decisao.webp';
import resultImage from './assets/resultado.webp';
import settingsImage from './assets/configuracoes.webp';
import mobileImage from './assets/celular-decisao.webp';
import duolingoImage from './assets/reference-duolingo.svg';
import electudeImage from './assets/reference-electude.svg';
import kahootImage from './assets/reference-kahoot.svg';

const normalizeExternalUrl = (value?: string) => {
  const candidate = value?.trim().replace(/\/+$/, '') ?? '';
  if (!candidate) return '';

  try {
    const parsed = new URL(candidate);
    const localDevelopment = parsed.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsed.hostname);
    return parsed.protocol === 'https:' || localDevelopment ? parsed.toString().replace(/\/+$/, '') : '';
  } catch {
    return '';
  }
};

const configuredGameBaseUrl = normalizeExternalUrl(
  import.meta.env.VITE_GAME_URL || window.DETAILER_CONFIG?.gameUrl,
);

const gameDirectUrl = configuredGameBaseUrl ? `${configuredGameBaseUrl}/` : '';
const gameEmbedUrl = configuredGameBaseUrl
  ? `${configuredGameBaseUrl}/?embed=1&source=landing`
  : '';
const configuredGameOrigin = configuredGameBaseUrl
  ? new URL(configuredGameBaseUrl).origin
  : '';

type IconName =
  | 'arrow'
  | 'brain'
  | 'brand'
  | 'chart'
  | 'check'
  | 'chevron'
  | 'clock'
  | 'community'
  | 'decisions'
  | 'diagnosis'
  | 'fullscreen'
  | 'layers'
  | 'method'
  | 'money'
  | 'play'
  | 'shield'
  | 'sparkles'
  | 'target';

const navigation = [
  ['Demonstração', 'experiencia'],
  ['Benefícios', 'beneficios'],
  ['Exemplos', 'referencias'],
  ['Teste de 14 dias', 'investimento'],
  ['FAQ', 'faq'],
] as const;

const learningBenefits = [
  {
    icon: 'decisions' as IconName,
    title: 'Decida',
    text: 'O aluno enfrenta situações próximas da realidade do mercado.',
  },
  {
    icon: 'chart' as IconName,
    title: 'Veja as consequências',
    text: 'Cada decisão altera os indicadores e muda a jornada.',
  },
  {
    icon: 'diagnosis' as IconName,
    title: 'Receba diagnóstico',
    text: 'O resultado explica o raciocínio por trás dos acertos e riscos.',
  },
];

const valuePillars = [
  {
    icon: 'target' as IconName,
    title: 'Implantação leve',
    text: 'Você envia o conteúdo-base e nós organizamos a experiência para testar.',
  },
  {
    icon: 'brain' as IconName,
    title: 'Aprendizado que fica',
    text: 'O aluno pratica o raciocínio em vez de apenas assistir.',
  },
  {
    icon: 'chart' as IconName,
    title: 'Mais valor percebido',
    text: 'Sua oferta ganha uma ferramenta própria, concreta e demonstrável.',
  },
];

const marketReferences = [
  {
    name: 'Electude',
    label: 'Simulação automotiva',
    text: 'O aluno pratica diagnóstico e tomada de decisão em situações técnicas antes da oficina real.',
    href: 'https://www.electude.com/learning-solutions/light-vehicles/',
    image: electudeImage,
    featured: true,
  },
  {
    name: 'Duolingo',
    label: 'Missões e progressão',
    text: 'Transforma prática recorrente em uma jornada clara, curta e participativa.',
    href: 'https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/',
    image: duolingoImage,
    featured: false,
  },
  {
    name: 'Kahoot!',
    label: 'Participação e feedback',
    text: 'Perguntas, escolhas e resposta imediata tornam o aprendizado mais ativo.',
    href: 'https://kahoot.com/what-is-kahoot/',
    image: kahootImage,
    featured: false,
  },
];

const implementationSteps = [
  ['01', 'Envie o essencial', 'Um formulário curto e o material principal do seu método já são suficientes para começar.'],
  ['02', 'Receba a primeira versão', 'Organizamos as situações, decisões, consequências e a identidade da experiência.'],
  ['03', 'Teste por 14 dias', 'Use com alunos ou seguidores e veja como o público reage na prática.'],
  ['04', 'Escolha se quer continuar', 'Se fizer sentido, você recebe opções prontas de continuidade, com entregas e valor definidos.'],
] as const;

const faqs = [
  {
    question: 'O que recebo para testar por 14 dias?',
    answer:
      'Você recebe uma versão piloto com sua identidade e um recorte do seu método transformado em decisões, consequências e diagnóstico. Ela já fica pronta para usar com alunos ou seguidores durante o teste.',
  },
  {
    question: 'O que preciso enviar para começar?',
    answer:
      'Somente um formulário curto e o material principal que você já utiliza: aulas, apostilas, roteiro, planilha ou explicação do método. A equipe organiza esse conteúdo no formato do simulador.',
  },
  {
    question: 'Preciso participar de reuniões ou cuidar da parte técnica?',
    answer:
      'Não. O processo foi pensado para ser leve. As confirmações podem ser feitas pelo WhatsApp, e toda a parte de estrutura, desenvolvimento, publicação e funcionamento fica com a nossa equipe.',
  },
  {
    question: 'Como funciona se eu quiser continuar depois do teste?',
    answer:
      'Você recebe opções objetivas para manter ou ampliar o simulador, cada uma com entregas e valor definidos. Você escolhe a que combina com a sua oferta, sem renovação automática e sem etapas escondidas.',
  },
  {
    question: 'Existe cobrança por aluno ou participação nas vendas?',
    answer:
      'Não. O modelo é baseado na criação e manutenção da ferramenta. O número de alunos e as vendas do seu curso continuam sendo inteiramente seus.',
  },
  {
    question: 'Como o simulador entra no meu curso?',
    answer:
      'Ele pode ser usado por link, incorporado à área de membros ou apresentado em aulas, mentorias e comunidades. O aluno acessa pelo navegador no computador ou celular, sem instalar nada.',
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    brain: <><path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0 .4 5.8A3.2 3.2 0 0 0 9 18v-4" /><path d="M14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1-.4 5.8A3.2 3.2 0 0 1 15 18v-4" /><path d="M9 8h2m4 0h-2m-4 4h6" /><path d="M12 4v16" /></>,
    brand: <><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" /><path d="m4 7 8 4 8-4M12 11v10" /></>,
    chart: <><path d="M4 19V9m6 10V5m6 14v-7m4 7H2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    community: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87m-2-11.26a4 4 0 0 1 0 7.75" /></>,
    decisions: <><path d="M6 3v12" /><circle cx="6" cy="18" r="3" /><path d="M18 21V9" /><circle cx="18" cy="6" r="3" /><path d="M9 6h6M9 18h6" /></>,
    diagnosis: <><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
    fullscreen: <><path d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    method: <><path d="M4 5h16M4 12h10M4 19h16" /><circle cx="17" cy="12" r="3" /></>,
    money: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M7 9H5v2m12 4h2v-2" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    sparkles: <><path d="m12 3-1.2 3.3L7.5 7.5l3.3 1.2L12 12l1.2-3.3 3.3-1.2-3.3-1.2L12 3Z" /><path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14Zm13 0-.8 2.2L15 17l2.2.8L18 20l.8-2.2L21 17l-2.2-.8L18 14Z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Detailer Business — início">
      <span className="brand-mark">DB</span>
      <span className="brand-copy">
        <strong>Detailer Business</strong>
        <small>Método de especialista</small>
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}


function FaqList() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="faq-list" data-reveal>
      {faqs.map((faq, index) => {
        const open = activeFaq === index;
        return (
          <article className={open ? 'faq-item faq-item--open' : 'faq-item'} key={faq.question}>
            <button type="button" onClick={() => setActiveFaq(open ? null : index)} aria-expanded={open}>
              <span>{faq.question}</span>
              <Icon name="chevron" size={19} />
            </button>
            {open ? <div className="faq-answer"><p>{faq.answer}</p></div> : null}
          </article>
        );
      })}
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mobileDemoOpen, setMobileDemoOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    window.matchMedia('(max-width: 760px)').matches,
  );
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px 80px 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', syncViewport);
      return () => media.removeEventListener('change', syncViewport);
    }

    media.addListener(syncViewport);
    return () => media.removeListener(syncViewport);
  }, []);

  useEffect(() => {
    let frame = 0;

    const syncCta = () => {
      frame = 0;
      const nextValue = window.scrollY > Math.min(window.innerHeight * 0.9, 760);
      setShowMobileCta((current) => (current === nextValue ? current : nextValue));
    };

    const scheduleSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncCta);
    };

    syncCta();
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
    };
  }, []);

  useEffect(() => {
    if (!mobileDemoOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileDemoOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileDemoOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleGameMessage = async (event: MessageEvent<unknown>) => {
      if (!configuredGameOrigin || event.origin !== configuredGameOrigin) return;
      if (!event.data || typeof event.data !== 'object') return;

      const message = event.data as { type?: string; source?: string };
      if (message.type !== 'detailer-business:trial-request' || message.source !== 'demo-limit') return;

      if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
        try {
          await document.exitFullscreen();
        } catch {
          // O redirecionamento ao formulário continua mesmo se o navegador negar a saída.
        }
      }

      setMobileDemoOpen(false);
      setMenuOpen(false);

      window.setTimeout(() => {
        const form = document.getElementById('contato');
        form?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      }, 180);
    };

    window.addEventListener('message', handleGameMessage);
    return () => window.removeEventListener('message', handleGameMessage);
  }, []);

  const enterFullscreen = async () => {
    if (!gameEmbedUrl) return;

    if (isMobileViewport) {
      setMobileDemoOpen(true);
      return;
    }

    if (demoRef.current?.requestFullscreen) {
      await demoRef.current.requestFullscreen();
      return;
    }

    window.open(gameDirectUrl, '_blank', 'noopener,noreferrer');
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormState('sending');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Array.from(data.entries()) as [string, string][]).toString(),
      });

      if (!response.ok) throw new Error('Falha no envio');
      form.reset();
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Navegação principal">
            {navigation.map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>
          <div className="header-actions">
            <button className="button button--small" type="button" onClick={() => scrollTo('contato')}>
              Testar por 14 dias
            </button>
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <span className="hero-kicker">Simulador didático para criadores</span>
              <h1>Transforme seu método em uma experiência que prepara o aluno para <em>decidir no mundo real.</em></h1>
              <p>
                Você envia o conteúdo-base. Nós transformamos em decisões, consequências e diagnóstico — pronto para testar com seu público em poucos passos.
              </p>

              <div className="hero-mechanism" aria-label="Como funciona">
                {learningBenefits.map((benefit) => (
                  <div key={benefit.title}>
                    <span><Icon name={benefit.icon} size={18} /></span>
                    <p><strong>{benefit.title}</strong>{benefit.text}</p>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <button className="button button--hero" type="button" onClick={() => scrollTo('experiencia')}>
                  Ver o simulador na prática <Icon name="play" size={18} />
                </button>
                <button className="button button--outline" type="button" onClick={() => scrollTo('contato')}>
                  Testar por 14 dias
                </button>
              </div>
              <p className="hero-reassurance"><Icon name="shield" size={15} /> Teste com seu público antes de investir. Sem cobrança por aluno e sem participação nas vendas.</p>
            </div>

            <div className="hero-product" data-reveal>
              <div className="hero-device">
                <div className="hero-device__speaker" aria-hidden="true" />
                <div className="hero-device__screen">
                  <img src={mobileImage} alt="Simulador Detailer Business em um celular" width="390" height="2540" fetchPriority="high" decoding="async" />
                </div>
              </div>
              <div className="hero-product-card hero-product-card--top">
                <span><Icon name="method" size={19} /></span>
                <div><strong>Seu método</strong><small>em decisões reais</small></div>
              </div>
              <div className="hero-product-card hero-product-card--bottom">
                <span><Icon name="diagnosis" size={19} /></span>
                <div><strong>Diagnóstico</strong><small>com sua régua</small></div>
              </div>
            </div>
          </div>

          <div className="container value-strip" data-reveal>
            {valuePillars.map((pillar) => (
              <div key={pillar.title}>
                <span><Icon name={pillar.icon} size={24} /></span>
                <p><strong>{pillar.title}</strong>{pillar.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section experience" id="experiencia">
          <div className="container">
            <div className="experience-heading">
              <SectionHeading
                eyebrow="Veja como funciona"
                title="Experimente o simulador."
                text="Uma amostra real da experiência que seus alunos podem ter."
              />
              <div className="experience-points">
                <span><Icon name="decisions" size={17} /> 8 decisões conectadas</span>
                <span><Icon name="chart" size={17} /> Consequências visíveis</span>
                <span><Icon name="diagnosis" size={17} /> Diagnóstico final</span>
              </div>
            </div>

            <div className="demo-shell" ref={demoRef} data-reveal>
              <div className="demo-toolbar">
                <div>
                  <span className="live-dot" />
                  <strong>Detailer Business</strong>
                  <small>Demonstração atualizada pelo app independente</small>
                </div>
                <div className="demo-actions">
                  {gameDirectUrl ? <a href={gameDirectUrl} target="_blank" rel="noopener noreferrer">Abrir em nova guia</a> : null}
                  <button type="button" onClick={enterFullscreen} disabled={!gameEmbedUrl}>
                    <Icon name="fullscreen" size={18} /> Tela cheia
                  </button>
                </div>
              </div>

              {gameEmbedUrl ? (
                isMobileViewport ? (
                  <div className="demo-mobile-preview">
                    <img src={coverImage} alt="Prévia da demonstração do Detailer Business" width="1365" height="1070" loading="lazy" decoding="async" />
                    <div className="demo-mobile-preview__content">
                      <span><Icon name="play" size={18} /> Demonstração interativa</span>
                      <h3>Jogue em tela cheia.</h3>
                      <p>Faça algumas escolhas e veja como o diagnóstico é construído.</p>
                      <button className="button" type="button" onClick={() => setMobileDemoOpen(true)}>
                        Abrir demonstração <Icon name="fullscreen" size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="demo-desktop-frame">
                    <iframe
                      src={gameEmbedUrl}
                      title="Demonstração interativa do Detailer Business"
                      loading="lazy"
                      scrolling="no"
                      allow="fullscreen; clipboard-write"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                )
              ) : (
                <div className="demo-setup-state">
                  <span><Icon name="layers" size={25} /></span>
                  <h3>Conecte o endereço público do app.</h3>
                  <p>Defina <code>VITE_GAME_URL</code> no Netlify com a URL do jogo para carregar a demonstração automaticamente.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section benefit-section" id="beneficios">
          <div className="container benefit-layout">
            <div className="benefit-copy" data-reveal>
              <SectionHeading
                eyebrow="Seu conteúdo já tem valor"
                title="A prática ajuda o aluno a transformar conhecimento em decisão."
                text="O simulador não substitui suas aulas. Ele cria o momento em que o aluno precisa aplicar o que aprendeu."
              />
              <div className="benefit-list">
                <div><span><Icon name="check" size={17} /></span><p><strong>Mais clareza sobre o seu método</strong>O aluno entende por que cada escolha funciona.</p></div>
                <div><span><Icon name="check" size={17} /></span><p><strong>Mais participação</strong>As decisões geram envolvimento, comparação e discussão.</p></div>
                <div><span><Icon name="check" size={17} /></span><p><strong>Mais valor percebido</strong>Sua oferta passa a ter uma ferramenta própria e demonstrável.</p></div>
              </div>
              <button className="text-link" type="button" onClick={() => scrollTo('contato')}>
                Quero testar com o meu método <Icon name="arrow" size={17} />
              </button>
            </div>

            <div className="learning-preview" data-reveal>
              <div className="learning-preview__main">
                <span className="visual-label"><Icon name="decisions" size={15} /> Decisão contextual</span>
                <img src={decisionImage} alt="Tela de decisão do Detailer Business" width="1365" height="1141" loading="lazy" decoding="async" />
              </div>
              <div className="learning-preview__result">
                <span className="visual-label"><Icon name="diagnosis" size={15} /> Diagnóstico final</span>
                <img src={resultImage} alt="Tela de diagnóstico final do Detailer Business" width="1365" height="1390" loading="lazy" decoding="async" />
              </div>
              <div className="learning-preview__caption"><Icon name="sparkles" size={18} /> Decisão, consequência e diagnóstico na mesma jornada.</div>
            </div>
          </div>
        </section>

        <section className="section references" id="referencias">
          <div className="container">
            <SectionHeading
              eyebrow="Referências de aprendizagem interativa"
              title="Grandes plataformas já mostram o poder de aprender fazendo."
              text="O Detailer Business aplica esse princípio ao conhecimento do criador: participação, decisão, feedback e progressão."
              align="center"
            />
            <div className="reference-showcase">
              {marketReferences.filter((reference) => reference.featured).map((reference) => (
                <article className="reference-card reference-card--featured" key={reference.name} data-reveal>
                  <div className="reference-card__media">
                    <img src={reference.image} alt={`Ilustração inspirada no mecanismo de aprendizagem do ${reference.name}`} width="640" height="420" loading="lazy" decoding="async" />
                  </div>
                  <div className="reference-card__body">
                    <span className="reference-badge"><Icon name="target" size={14} /> Referência mais próxima do setor</span>
                    <small>{reference.label}</small>
                    <h3>{reference.name}</h3>
                    <p>{reference.text}</p>
                    <a href={reference.href} target="_blank" rel="noopener noreferrer">
                      Conhecer a referência automotiva <Icon name="arrow" size={16} />
                    </a>
                  </div>
                </article>
              ))}
              <div className="reference-stack">
                {marketReferences.filter((reference) => !reference.featured).map((reference) => (
                  <article className="reference-card reference-card--compact" key={reference.name} data-reveal>
                    <div className="reference-card__media">
                      <img src={reference.image} alt={`Ilustração inspirada no mecanismo de aprendizagem do ${reference.name}`} width="640" height="420" loading="lazy" decoding="async" />
                    </div>
                    <div className="reference-card__body">
                      <small>{reference.label}</small>
                      <h3>{reference.name}</h3>
                      <p>{reference.text}</p>
                      <a href={reference.href} target="_blank" rel="noopener noreferrer">
                        Ver referência oficial <Icon name="arrow" size={15} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className="reference-disclaimer">Essas marcas são referências públicas de aprendizagem interativa. Não são clientes, parceiros ou cases do Detailer Business.</p>
          </div>
        </section>

        <section className="section implementation" id="metodo">
          <div className="container implementation-grid">
            <div className="implementation-copy" data-reveal>
              <SectionHeading
                eyebrow="Do seu conteúdo ao simulador"
                title="Do conteúdo ao teste, sem complicação."
                text="Você envia o essencial, acompanha a primeira versão e testa com seu público antes de decidir pela continuidade."
              />
              <div className="step-list">
                {implementationSteps.map(([number, title, text]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>

            <div className="customization-visual" data-reveal>
              <div className="settings-frame">
                <span className="visual-label"><Icon name="method" size={15} /> Personalização do método</span>
                <img src={settingsImage} alt="Painel de personalização do Detailer Business" width="1365" height="994" loading="lazy" decoding="async" />
              </div>
              <div className="customization-card">
                <span><Icon name="brand" size={22} /></span>
                <div><strong>Sua marca, linguagem e critérios</strong><p>O aluno reconhece sua metodologia dentro da experiência.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section investment" id="investimento">
          <div className="container investment-contact-grid">
            <div className="investment-copy" data-reveal>
              <span className="eyebrow">Teste antes de investir</span>
              <h2>Use por 14 dias com seu público. Só depois decida se quer continuar.</h2>
              <p>
                Começamos com uma versão piloto do seu simulador. Você apresenta aos alunos ou seguidores, observa a resposta e decide com base no uso real — sem entrar em um projeto longo antes de validar.
              </p>
              <div className="investment-points">
                <div><span><Icon name="check" size={16} /></span><p><strong>Entrada simples</strong> com um formulário curto e o conteúdo principal do seu método.</p></div>
                <div><span><Icon name="check" size={16} /></span><p><strong>Piloto de 14 dias</strong> para experimentar com seu público antes de investir.</p></div>
                <div><span><Icon name="check" size={16} /></span><p><strong>Continuidade simples</strong> com opções prontas, entregas claras e valor definido depois do teste.</p></div>
              </div>
              <div className="investment-note">
                <Icon name="money" size={21} />
                <p><strong>Sem cobrança por aluno e sem participação nas suas vendas.</strong> Você continua somente se o simulador fizer sentido para a sua oferta.</p>
              </div>
            </div>

            <form className="lead-form" name="detailer-leads" method="POST" data-netlify="true" onSubmit={submitLead} data-reveal id="contato">
              <input type="hidden" name="form-name" value="detailer-leads" />
              <p className="hidden-field"><label>Não preencha: <input name="bot-field" /></label></p>
              <div className="form-heading">
                <span className="eyebrow">Comece pelo piloto</span>
                <h3>Teste por 14 dias com seu público.</h3>
                <p>Leva menos de um minuto. Envie os dados básicos e receba o próximo passo pelo WhatsApp.</p>
              </div>
              <div className="form-row">
                <label>
                  Seu nome
                  <input name="name" type="text" autoComplete="name" placeholder="Como podemos te chamar?" maxLength={80} required />
                </label>
                <label>
                  WhatsApp
                  <input name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" placeholder="(00) 00000-0000" maxLength={24} required />
                </label>
              </div>
              <label>
                Perfil ou canal
                <input name="profile" type="text" autoComplete="url" placeholder="@seuperfil ou link" maxLength={160} required />
              </label>
              <label>
                Em que fase você está?
                <select name="stage" required defaultValue="">
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="Já vendo curso ou mentoria">Já vendo curso ou mentoria</option>
                  <option value="Estou preparando minha oferta">Estou preparando minha oferta</option>
                  <option value="Tenho comunidade ou audiência">Tenho comunidade ou audiência</option>
                  <option value="Estou apenas conhecendo">Estou apenas conhecendo</option>
                </select>
              </label>
              <label>
                O que você ensina? <span className="optional-label">Opcional</span>
                <textarea name="method" rows={3} maxLength={500} placeholder="Ex.: ensino precificação e gestão para detailers." />
              </label>
              <button className="button button--form" type="submit" disabled={formState === 'sending'}>
                {formState === 'sending' ? 'Enviando...' : 'Quero testar por 14 dias'}
                {formState !== 'sending' ? <Icon name="arrow" size={18} /> : null}
              </button>
              {formState === 'success' ? <p className="form-message form-message--success" role="status" aria-live="polite">Recebemos seus dados. Vamos confirmar o próximo passo pelo WhatsApp.</p> : null}
              {formState === 'error' ? <p className="form-message form-message--error" role="alert">Não foi possível enviar agora. Tente novamente em instantes.</p> : null}
              <small>Sem renovação automática. Seus dados serão usados apenas para organizar o piloto.</small>
            </form>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container faq-grid">
            <div data-reveal>
              <SectionHeading
                eyebrow="Perguntas frequentes"
                title="Dúvidas rápidas antes de testar."
                text="Tudo o que você precisa saber para começar sem complicação."
              />
            </div>
            <FaqList />
          </div>
        </section>
      </main>

      {mobileDemoOpen && gameEmbedUrl ? (
        <div className="mobile-demo-overlay" role="dialog" aria-modal="true" aria-label="Demonstração do Detailer Business">
          <button className="mobile-demo-overlay__close" type="button" onClick={() => setMobileDemoOpen(false)} aria-label="Fechar demonstração">
            <span aria-hidden="true">×</span><span className="mobile-demo-overlay__close-label">Fechar</span>
          </button>
          <iframe
            src={gameEmbedUrl}
            title="Demonstração interativa do Detailer Business em tela cheia"
            scrolling="no"
            allow="fullscreen; clipboard-write"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : null}

      <footer className="footer">
        <div className="container footer-grid">
          <Brand />
          <div className="footer-copy"><p>Seu conhecimento transformado em uma experiência que ensina, envolve e gera valor.</p><small>© 2026 Detailer Business. Todos os direitos reservados.</small></div>
          <button type="button" onClick={() => scrollTo('inicio')}>Voltar ao topo <Icon name="chevron" size={15} /></button>
        </div>
      </footer>

      <button
        className={showMobileCta && !mobileDemoOpen ? 'mobile-contact-cta mobile-contact-cta--visible' : 'mobile-contact-cta'}
        type="button"
        onClick={() => scrollTo('contato')}
      >
        Testar por 14 dias <Icon name="arrow" size={17} />
      </button>
    </div>
  );
}

export default App;
