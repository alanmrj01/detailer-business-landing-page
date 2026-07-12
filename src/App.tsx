import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import coverImage from './assets/capa-dark.webp';
import decisionImage from './assets/decisao.webp';
import resultImage from './assets/resultado.webp';
import settingsImage from './assets/configuracoes.webp';
import mobileImage from './assets/celular-decisao.webp';
import growthImage from './assets/growth.webp';

const normalizeExternalUrl = (value?: string) => value?.trim().replace(/\/+$/, '') ?? '';

const configuredGameBaseUrl = normalizeExternalUrl(
  import.meta.env.VITE_GAME_URL || window.DETAILER_CONFIG?.gameUrl,
);

const gameDirectUrl = configuredGameBaseUrl ? `${configuredGameBaseUrl}/` : '';
const gameEmbedUrl = configuredGameBaseUrl
  ? `${configuredGameBaseUrl}/?embed=1&source=landing`
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
  | 'target'
  | 'video';

const navigation = [
  ['Como funciona', 'metodo'],
  ['Referências', 'referencias'],
  ['Testar o app', 'experiencia'],
  ['Investimento', 'investimento'],
  ['Perguntas', 'faq'],
] as const;

const painPoints = [
  {
    icon: 'video' as IconName,
    title: 'O aluno assiste, concorda e esquece',
    text: 'Vídeos e PDFs explicam. A experiência mostra se o aluno sabe decidir quando o cenário muda.',
  },
  {
    icon: 'layers' as IconName,
    title: 'Seu método parece “mais um curso”',
    text: 'Mesmo com conteúdo excelente, o formato pode parecer igual ao de outras ofertas do nicho.',
  },
  {
    icon: 'target' as IconName,
    title: 'O valor fica difícil de enxergar',
    text: 'Sem prática, o aluno demora para perceber a lógica e o valor do seu método.',
  },
];

const benefits = [
  {
    icon: 'decisions' as IconName,
    title: 'O aluno precisa decidir',
    text: 'Ele enfrenta cenários reais e escolhe como conduzir a operação.',
  },
  {
    icon: 'chart' as IconName,
    title: 'Cada escolha produz efeito',
    text: 'Os indicadores mudam conforme cada decisão tomada.',
  },
  {
    icon: 'diagnosis' as IconName,
    title: 'O resultado ensina o porquê',
    text: 'O resultado explica acertos, riscos e próximos passos com a sua régua.',
  },
];

const marketReferences = [
  {
    name: 'Duolingo',
    label: 'Prática que parece missão',
    text: 'Usa gamificação e situações simuladas para transformar estudo recorrente em uma experiência ativa.',
    href: 'https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/',
  },
  {
    name: 'Codecademy',
    label: 'Aprender fazendo',
    text: 'Coloca o aluno em desafios e ambientes interativos, em vez de depender apenas de explicação teórica.',
    href: 'https://www.codecademy.com/',
  },
  {
    name: 'Kahoot!',
    label: 'Participação e feedback',
    text: 'Consolidou o aprendizado baseado em jogo com participação, resposta imediata e comparação de resultados.',
    href: 'https://kahoot.com/what-is-kahoot/',
  },
];

const creatorControls = [
  'Sua marca, logo, cores e linguagem',
  'Seus cenários, escolhas e consequências',
  'Seus preços, equipamentos e referências',
  'Seus critérios de avaliação, diagnóstico e orientações',
];

const creatorOutcomes = [
  {
    icon: 'brand' as IconName,
    title: 'Mais valor percebido',
    text: 'Sua oferta ganha uma ferramenta própria e conectada à sua autoridade.',
  },
  {
    icon: 'brain' as IconName,
    title: 'Método mais fácil de entender',
    text: 'O aluno entende sua lógica ao aplicar e lidar com a consequência.',
  },
  {
    icon: 'community' as IconName,
    title: 'Mais assunto para a comunidade',
    text: 'Resultados diferentes geram análise, debate e novos conteúdos.',
  },
  {
    icon: 'sparkles' as IconName,
    title: 'Diferenciação concreta',
    text: 'Você deixa de competir apenas por quantidade de aulas e bônus.',
  },
];

const processSteps = [
  ['01', 'Conversa inicial', 'Entendemos sua oferta, audiência e método.'],
  ['02', 'Mapeamento do método', 'Organizamos decisões, consequências e diagnóstico.'],
  ['03', 'Personalização', 'Adaptamos identidade e experiência ao seu posicionamento.'],
  ['04', 'Entrega e validação', 'Você recebe o app pronto para validar e usar.'],
] as const;

const faqs = [
  {
    question: 'É apenas um jogo com a minha logo?',
    answer:
      'Não. A identidade visual é apenas uma camada. O principal trabalho é transformar seu método em cenários, decisões, consequências e diagnóstico. O aluno pratica a lógica que você ensina.',
  },
  {
    question: 'Quanto custa?',
    answer:
      'Não existe um preço único porque o projeto é personalizado. O valor é combinado entre o criador e os desenvolvedores depois de entendermos o escopo. Você recebe uma proposta clara antes de qualquer desenvolvimento e pode começar por uma versão mais enxuta.',
  },
  {
    question: 'Preciso mudar meu curso inteiro?',
    answer:
      'Não. A experiência pode entrar como atividade prática, bônus, fechamento de módulo, ferramenta de captação, dinâmica de mentoria ou conteúdo para a comunidade. Ela complementa o produto que você já possui.',
  },
  {
    question: 'Preciso saber programar para usar?',
    answer:
      'Não. A implantação inicial é feita com você. Depois, o painel permite editar textos, preços, impactos, critérios e identidade sem alterar código para as mudanças cotidianas previstas.',
  },
  {
    question: 'Onde o aluno acessa?',
    answer:
      'Pelo navegador, no computador ou celular. Não é necessário instalar aplicativo. A forma de disponibilização é definida junto com o criador durante a implantação.',
  },
  {
    question: 'Serve para quem ainda não vende curso?',
    answer:
      'Pode servir, desde que você já tenha um método ou uma forma própria de ensinar. Para quem ainda está validando a oferta, é possível começar com um escopo essencial e evoluir depois.',
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
    video: <><rect x="3" y="5" width="14" height="14" rx="2" /><path d="m17 10 4-2v8l-4-2v-4Z" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Detailer Business — início">
      <span className="brand-mark">DB</span>
      <span className="brand-copy">
        <strong>Detailer Business</strong>
        <small>Seu método em uma experiência interativa</small>
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

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="proof-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(1);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mobileDemoOpen, setMobileDemoOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    window.matchMedia('(max-width: 760px)').matches,
  );
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const syncViewport = () => setIsMobileViewport(media.matches);

    syncViewport();
    media.addEventListener('change', syncViewport);
    return () => media.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    const syncCta = () => {
      const threshold = Math.min(window.innerHeight * 0.85, 720);
      setShowMobileCta(window.scrollY > threshold);
    };

    syncCta();
    window.addEventListener('scroll', syncCta, { passive: true });
    window.addEventListener('resize', syncCta);
    return () => {
      window.removeEventListener('scroll', syncCta);
      window.removeEventListener('resize', syncCta);
    };
  }, []);

  useEffect(() => {
    if (!mobileDemoOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileDemoOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileDemoOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const enterFullscreen = async () => {
    if (!gameEmbedUrl) return;

    if (isMobileViewport) {
      setMobileDemoOpen(true);
      return;
    }

    if (demoRef.current?.requestFullscreen) {
      await demoRef.current.requestFullscreen();
    } else {
      window.open(gameDirectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormState('sending');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Array.from(data.entries()) as [string, string][]).toString(),
      });
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
            <button className="button button--small button--outline" type="button" onClick={() => scrollTo('experiencia')}>
              Testar agora
            </button>
            <button className="button button--small" type="button" onClick={() => scrollTo('contato')}>
              Quero meu app
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
          <div className="hero-grid container">
            <div className="hero-copy" data-reveal>
              <span className="hero-kicker"><Icon name="sparkles" size={17} /> Para criadores de estética automotiva</span>
              <h1>Transforme seu método em um simulador que faz o aluno <em>pensar como profissional.</em></h1>
              <p>
                Transformamos seu método em cenários, decisões e diagnóstico — com sua marca, pronto para curso, mentoria ou comunidade.
              </p>
              <div className="hero-actions">
                <button className="button button--hero" type="button" onClick={() => scrollTo('contato')}>
                  Quero um app com meu método <Icon name="arrow" size={18} />
                </button>
                <button className="text-link" type="button" onClick={() => scrollTo('experiencia')}>
                  <Icon name="play" size={18} /> Testar a demonstração
                </button>
              </div>
              <div className="hero-price-note">
                <Icon name="money" size={18} />
                <div>
                  <strong>Comece pelo escopo certo para a sua oferta.</strong>
                  <span>Entregas e investimento são definidos antes do desenvolvimento.</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" data-reveal>
              <div className="hero-browser">
                <div className="browser-top">
                  <div className="browser-dots"><i /><i /><i /></div>
                  <span>Experiência do aluno</span>
                  <i className="browser-status" />
                </div>
                <img src={coverImage} alt="Tela de abertura do Detailer Business" />
              </div>
              <div className="hero-note hero-note--top">
                <span className="note-icon"><Icon name="method" size={18} /></span>
                <div><strong>Seu método</strong><small>Traduzido em decisões reais</small></div>
              </div>
              <div className="hero-note hero-note--bottom">
                <span className="note-score">4,5</span>
                <div><strong>Diagnóstico individual</strong><small>Fortalezas e próximos passos</small></div>
              </div>
            </div>
          </div>

          <div className="container proof-bar" data-reveal>
            <Metric value="Sua marca" label="identidade e linguagem próprias" />
            <Metric value="Seu método" label="critérios e decisões reais" />
            <Metric value="No navegador" label="sem instalação para o aluno" />
            <Metric value="Sob medida" label="comece no escopo ideal" />
          </div>
        </section>

        <section className="section problem-section">
          <div className="container">
            <SectionHeading
              eyebrow="O problema não é o seu conteúdo"
              title="Conteúdo bom ainda pode parecer igual a todos os outros."
              text="Vídeo e PDF explicam. A aplicação prática mostra se o aluno sabe decidir."
              align="center"
            />
            <div className="problem-grid">
              {painPoints.map((point) => (
                <article className="problem-card" key={point.title} data-reveal>
                  <span><Icon name={point.icon} size={23} /></span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
            <div className="problem-transition" data-reveal>
              <span>O Detailer Business muda a pergunta de</span>
              <strong>“Você entendeu a aula?”</strong>
              <Icon name="arrow" size={22} />
              <strong>“O que você faria agora?”</strong>
            </div>
          </div>
        </section>

        <section className="section method" id="metodo">
          <div className="container">
            <SectionHeading
              eyebrow="O mecanismo"
              title="Seu método vira uma experiência prática."
              text="Contexto, decisão, consequência e diagnóstico em uma jornada fácil de entender."
              align="center"
            />
            <div className="benefit-grid">
              {benefits.map((benefit, index) => (
                <article className="benefit-card" key={benefit.title} data-reveal>
                  <span className="card-number">0{index + 1}</span>
                  <span className="benefit-icon"><Icon name={benefit.icon} size={24} /></span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>

            <div className="journey" data-reveal>
              <div className="journey-copy">
                <span className="eyebrow">Uma jornada completa</span>
                <h3>Não é quiz. As decisões se conectam e constroem uma operação.</h3>
                <p>
                  O aluno começa com capital, prazo e capacidade limitados. Depois precisa escolher estrutura, equipamentos,
                  posicionamento, atendimento, reação a problemas e direção de crescimento.
                </p>
                <div className="journey-flow">
                  {['Estratégia', 'Situações reais', 'Consequências', 'Diagnóstico'].map((item, index) => (
                    <div key={item}>
                      <span>{index + 1}</span>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="journey-visual">
                <img src={decisionImage} alt="Decisão dentro da jornada do Detailer Business" />
                <span className="visual-caption"><Icon name="decisions" size={17} /> Cada escolha altera o restante da jornada</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section references" id="referencias">
          <div className="container">
            <SectionHeading
              eyebrow="Referências de mercado"
              title="Os produtos educacionais mais lembrados não deixam o aluno apenas assistindo."
              text="O princípio por trás do Detailer Business já aparece em grandes experiências de aprendizagem: participação, prática, feedback e progressão."
              align="center"
            />
            <div className="reference-grid">
              {marketReferences.map((reference, index) => (
                <article className="reference-card" key={reference.name} data-reveal>
                  <span className="reference-index">0{index + 1}</span>
                  <small>{reference.label}</small>
                  <h3>{reference.name}</h3>
                  <p>{reference.text}</p>
                  <a href={reference.href} target="_blank" rel="noreferrer">
                    Ver referência oficial <Icon name="arrow" size={16} />
                  </a>
                </article>
              ))}
            </div>
            <div className="reference-bridge" data-reveal>
              <Icon name="sparkles" size={22} />
              <p><strong>O Detailer Business aplica esse mesmo princípio ao seu conhecimento:</strong> o aluno participa, decide e recebe uma leitura baseada na metodologia que você ensina.</p>
            </div>
            <p className="reference-disclaimer">As marcas acima são referências públicas de aprendizagem interativa. Não são clientes, parceiros ou cases do Detailer Business.</p>
          </div>
        </section>

        <section className="section experience" id="experiencia">
          <div className="container">
            <div className="experience-heading">
              <SectionHeading
                eyebrow="Experimente antes de conversar"
                title="Veja o método funcionando na prática."
                text="Abra o MVP, tome algumas decisões e veja o diagnóstico sendo construído."
              />
              <div className="experience-instructions">
                <span><i /> Demonstração incorporada</span>
                <p>Use tela cheia para explorar com mais espaço.</p>
              </div>
            </div>

            <div className="demo-shell" ref={demoRef} data-reveal>
              <div className="demo-toolbar">
                <div>
                  <span className="live-dot" />
                  <strong>Detailer Business</strong>
                  <small>App publicado e atualizado de forma independente</small>
                </div>
                <div className="demo-actions">
                  {gameDirectUrl ? (
                    <a href={gameDirectUrl} target="_blank" rel="noreferrer">Abrir em nova guia</a>
                  ) : (
                    <span className="demo-action-disabled">App não conectado</span>
                  )}
                  <button
                    type="button"
                    onClick={enterFullscreen}
                    aria-label="Abrir demonstração em tela cheia"
                    disabled={!gameEmbedUrl}
                  >
                    <Icon name="fullscreen" size={18} /> Tela cheia
                  </button>
                </div>
              </div>

              {gameEmbedUrl ? (
                isMobileViewport ? (
                  <div className="demo-mobile-preview">
                    <img src={coverImage} alt="Prévia da demonstração do Detailer Business" />
                    <div className="demo-mobile-preview__content">
                      <span><Icon name="play" size={18} /> Demonstração interativa</span>
                      <h3>Teste o simulador em tela cheia.</h3>
                      <p>Jogue alguns minutos e volte para a página ao fechar.</p>
                      <button className="button" type="button" onClick={() => setMobileDemoOpen(true)}>
                        Experimentar em tela cheia <Icon name="fullscreen" size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="demo-desktop-frame">
                    <iframe
                      src={gameEmbedUrl}
                      title="Demonstração interativa do Detailer Business"
                      loading="lazy"
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
                  <p>Defina <code>VITE_GAME_URL</code> no Netlify com a URL do projeto do jogo. Depois disso, esta área passa a carregar a versão online automaticamente.</p>
                </div>
              )}
            </div>
            <p className="demo-note"><Icon name="shield" size={15} /> O jogo roda em um projeto separado. Novos deploys do app aparecem aqui sem republicar a landing.</p>
          </div>
        </section>

        <section className="section creator" id="criador">
          <div className="container creator-grid">
            <div className="creator-visual" data-reveal>
              <div className="settings-frame">
                <img src={settingsImage} alt="Painel de personalização do Detailer Business" />
              </div>
              <div className="mobile-frame">
                <img src={mobileImage} alt="Detailer Business em um celular" />
              </div>
            </div>
            <div className="creator-copy" data-reveal>
              <SectionHeading
                eyebrow="Não é um app genérico"
                title="Sua voz, sua marca e sua régua de avaliação."
                text="A experiência é adaptada para representar o que você realmente ensina."
              />
              <ul className="control-list">
                {creatorControls.map((item) => (
                  <li key={item}><span><Icon name="check" size={16} /></span>{item}</li>
                ))}
              </ul>
              <div className="creator-callout">
                <Icon name="brand" size={21} />
                <div>
                  <strong>Seu aluno reconhece sua metodologia dentro da experiência.</strong>
                  <p>Conteúdo, impacto e diagnóstico são conectados para manter uma narrativa pedagógica coerente.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section result-section">
          <div className="container result-grid">
            <div className="result-copy" data-reveal>
              <SectionHeading
                eyebrow="O aluno não recebe só uma nota"
                title="O aluno entende o que acertou e o que precisa melhorar."
                text="O resultado vira aula, discussão e direcionamento dentro da sua oferta."
              />
              <div className="diagnosis-points">
                <div><span><Icon name="check" size={17} /></span><p><strong>Visão geral</strong> traduz o estágio atual da operação.</p></div>
                <div><span><Icon name="check" size={17} /></span><p><strong>Fortalezas</strong> mostram o que sustentou o resultado.</p></div>
                <div><span><Icon name="check" size={17} /></span><p><strong>Atenções</strong> apontam o próximo foco de evolução.</p></div>
              </div>
            </div>
            <div className="result-visual" data-reveal>
              <img src={resultImage} alt="Tela de diagnóstico final do Detailer Business" />
              <div className="result-chip"><span>4,5</span><strong>Leitura completa,<br />não só pontuação</strong></div>
            </div>
          </div>
        </section>

        <section className="section investment" id="investimento">
          <div className="container investment-grid">
            <div className="investment-copy" data-reveal>
              <SectionHeading
                eyebrow="Investimento sem surpresa"
                title="Comece pelo escopo que faz sentido."
                text="Entendemos seu método e apresentamos escopo, entregas e valor antes de começar."
              />
              <div className="investment-points">
                <div><span><Icon name="check" size={16} /></span><p><strong>Conversa inicial sem compromisso</strong> para entender se o projeto faz sentido.</p></div>
                <div><span><Icon name="check" size={16} /></span><p><strong>Escopo e valor definidos antes</strong> de qualquer desenvolvimento.</p></div>
                <div><span><Icon name="check" size={16} /></span><p><strong>Possibilidade de começar enxuto</strong> e evoluir após validar com a audiência.</p></div>
              </div>
              <button className="button button--hero" type="button" onClick={() => scrollTo('contato')}>
                Quero saber quanto ficaria no meu caso <Icon name="arrow" size={18} />
              </button>
            </div>

            <aside className="price-card" data-reveal>
              <span className="price-card-icon"><Icon name="money" size={25} /></span>
              <small>Como o valor é definido?</small>
              <h3>Pelo que o seu projeto realmente precisa.</h3>
              <p>
                Quantidade de cenários, profundidade do diagnóstico, nível de personalização e forma de disponibilização entram no escopo.
              </p>
              <div className="price-highlight">
                <strong>Você só decide depois de entender exatamente o que será entregue.</strong>
                <span>Sem obrigação de contratar depois da conversa inicial.</span>
              </div>
            </aside>
          </div>

          <div className="container process-block" data-reveal>
            <div className="process-heading">
              <span className="eyebrow">Da ideia ao app</span>
              <h3>Um processo claro para transformar conhecimento em produto.</h3>
            </div>
            <div className="process-grid">
              {processSteps.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section outcomes">
          <div className="container">
            <SectionHeading
              eyebrow="O que muda na sua oferta"
              title="Sua oferta deixa de entregar só conteúdo."
              text="O app complementa suas aulas e torna a lógica do seu método visível."
              align="center"
            />
            <div className="outcomes-grid">
              {creatorOutcomes.map((outcome) => (
                <article key={outcome.title} data-reveal>
                  <span><Icon name={outcome.icon} size={23} /></span>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.text}</p>
                </article>
              ))}
            </div>

            <div className="comparison" data-reveal>
              <div className="comparison-side comparison-side--muted">
                <span>Curso comum</span>
                <h3>O aluno apenas consome.</h3>
                <ul>
                  <li>Assiste às aulas</li>
                  <li>Responde perguntas isoladas</li>
                  <li>Recebe uma nota genérica</li>
                  <li>Esquece parte do raciocínio</li>
                </ul>
              </div>
              <div className="comparison-divider"><Icon name="arrow" size={22} /></div>
              <div className="comparison-side comparison-side--primary">
                <span>Com Detailer Business</span>
                <h3>O aluno aplica e entende.</h3>
                <ul>
                  <li>Enfrenta uma jornada</li>
                  <li>Toma decisões conectadas</li>
                  <li>Vê as consequências</li>
                  <li>Recebe diagnóstico do método</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section use-cases">
          <div className="container use-case-grid">
            <div className="use-case-copy" data-reveal>
              <SectionHeading
                eyebrow="Onde encaixar"
                title="Use sem reconstruir o seu curso."
                text="A experiência pode entrar antes, durante ou depois do conteúdo."
              />
              <div className="use-case-list">
                {[
                  ['Captação', 'Demonstre seu método antes da compra e torne sua proposta mais concreta.'],
                  ['Curso ou mentoria', 'Use como atividade prática entre módulos ou no encerramento da turma.'],
                  ['Comunidade', 'Crie discussões a partir dos caminhos e resultados de cada participante.'],
                  ['Conteúdo', 'Transforme erros frequentes em novas aulas, vídeos e análises.'],
                ].map(([title, text]) => (
                  <div key={title}><strong>{title}</strong><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="use-case-image" data-reveal>
              <img src={growthImage} alt="Representação de crescimento profissional na estética automotiva" />
              <div className="image-quote">
                <Icon name="sparkles" size={20} />
                <p>Uma ferramenta própria torna o seu método mais visível, aplicável e memorável.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container faq-grid">
            <div data-reveal>
              <SectionHeading
                eyebrow="Perguntas frequentes"
                title="O que você precisa saber antes de conversar."
                text="Entendemos seu método, definimos um escopo possível e mostramos o que será entregue."
              />
            </div>
            <div className="faq-list" data-reveal>
              {faqs.map((faq, index) => {
                const open = activeFaq === index;
                return (
                  <article className={open ? 'faq-item faq-item--open' : 'faq-item'} key={faq.question}>
                    <button type="button" onClick={() => setActiveFaq(open ? null : index)} aria-expanded={open}>
                      <span>{faq.question}</span>
                      <Icon name="chevron" size={19} />
                    </button>
                    <div className="faq-answer"><p>{faq.answer}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="container contact-card">
            <div className="contact-copy" data-reveal>
              <span className="eyebrow">Vamos avaliar o seu caso</span>
              <h2>Seu método pode virar uma experiência que o aluno lembra.</h2>
              <p>
                Envie seus dados. A primeira conversa serve para avaliar se o projeto faz sentido e qual escopo é ideal para começar.
              </p>
              <div className="contact-proof">
                <span><Icon name="check" size={16} /> Conversa sem compromisso</span>
                <span><Icon name="check" size={16} /> Escopo e valor antes de começar</span>
                <span><Icon name="check" size={16} /> Possibilidade de versão essencial</span>
              </div>
            </div>

            <form className="lead-form" name="detailer-leads" method="POST" data-netlify="true" onSubmit={submitLead} data-reveal>
              <input type="hidden" name="form-name" value="detailer-leads" />
              <p className="hidden-field"><label>Não preencha: <input name="bot-field" /></label></p>
              <div className="form-row">
                <label>
                  Seu nome
                  <input name="name" type="text" autoComplete="name" placeholder="Como podemos te chamar?" required />
                </label>
                <label>
                  WhatsApp
                  <input name="whatsapp" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Perfil ou canal
                  <input name="profile" type="text" placeholder="@seuperfil ou link" required />
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
              </div>
              <label>
                O que você ensina? <span className="optional-label">Opcional</span>
                <textarea name="method" rows={3} placeholder="Conte em uma frase qual é o seu método ou principal produto." />
              </label>
              <button className="button button--form" type="submit" disabled={formState === 'sending'}>
                {formState === 'sending' ? 'Enviando...' : 'Quero uma proposta para o meu método'}
                {formState !== 'sending' ? <Icon name="arrow" size={18} /> : null}
              </button>
              {formState === 'success' ? <p className="form-message form-message--success">Recebemos seus dados. O próximo passo é entender o seu método e avaliar o melhor formato.</p> : null}
              {formState === 'error' ? <p className="form-message form-message--error">Não foi possível enviar agora. Tente novamente em instantes.</p> : null}
              <small>Sem compromisso. Seus dados serão usados somente para responder a esta solicitação.</small>
            </form>
          </div>
        </section>
      </main>

      {mobileDemoOpen && gameEmbedUrl ? (
        <div className="mobile-demo-overlay" role="dialog" aria-modal="true" aria-label="Demonstração do Detailer Business">
          <button
            className="mobile-demo-overlay__close"
            type="button"
            onClick={() => setMobileDemoOpen(false)}
            aria-label="Fechar demonstração"
          >
            <span aria-hidden="true">×</span> Fechar
          </button>
          <iframe
            src={gameEmbedUrl}
            title="Demonstração interativa do Detailer Business em tela cheia"
            allow="fullscreen; clipboard-write"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : null}

      <div className={showMobileCta ? 'mobile-conversion-bar mobile-conversion-bar--visible' : 'mobile-conversion-bar'}>
        <button type="button" onClick={() => scrollTo('contato')}>Quero um app com meu método <Icon name="arrow" size={17} /></button>
      </div>

      <footer className="footer">
        <div className="container footer-grid">
          <Brand />
          <p>Transformando conhecimento em decisão, consequência e aprendizado.</p>
          <button type="button" onClick={() => scrollTo('inicio')}>Voltar ao topo <Icon name="arrow" size={16} /></button>
        </div>
      </footer>
    </div>
  );
}

export { App };
