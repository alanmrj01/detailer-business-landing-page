import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import coverImage from './assets/capa-dark.webp';
import decisionImage from './assets/decisao.webp';
import resultImage from './assets/resultado.webp';
import settingsImage from './assets/configuracoes.webp';
import mobileImage from './assets/celular-decisao.webp';
import duolingoImage from './assets/reference-duolingo.svg';
import codecademyImage from './assets/reference-codecademy.svg';
import kahootImage from './assets/reference-kahoot.svg';

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
  | 'target';

const navigation = [
  ['Demonstração', 'experiencia'],
  ['Benefícios', 'beneficios'],
  ['Exemplos', 'referencias'],
  ['Investimento', 'investimento'],
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
    title: 'Feito para você',
    text: 'Marca, linguagem, cenários e critérios conectados ao seu método.',
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
    name: 'Duolingo',
    label: 'Missões e progressão',
    text: 'Transforma prática recorrente em uma jornada clara, curta e participativa.',
    href: 'https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/',
    image: duolingoImage,
  },
  {
    name: 'Codecademy',
    label: 'Aprender fazendo',
    text: 'O aluno executa tarefas, testa soluções e recebe retorno durante a prática.',
    href: 'https://www.codecademy.com/',
    image: codecademyImage,
  },
  {
    name: 'Kahoot!',
    label: 'Participação e feedback',
    text: 'Perguntas, escolhas e resposta imediata tornam o aprendizado mais ativo.',
    href: 'https://kahoot.com/what-is-kahoot/',
    image: kahootImage,
  },
];

const implementationSteps = [
  ['01', 'Entendemos seu método', 'Mapeamos sua oferta, sua audiência e o que o aluno precisa aprender.'],
  ['02', 'Desenhamos as decisões', 'Transformamos conteúdo em situações, escolhas, impactos e diagnóstico.'],
  ['03', 'Personalizamos o app', 'Aplicamos sua marca, linguagem, preços, critérios e identidade visual.'],
  ['04', 'Entregamos pronto para usar', 'Você valida a experiência e recebe o app para curso, mentoria ou comunidade.'],
] as const;

const faqs = [
  {
    question: 'É apenas um jogo com a minha logo?',
    answer:
      'Não. A identidade visual é apenas uma parte. O trabalho principal é transformar seu método em situações, decisões, consequências e diagnóstico para que o aluno pratique o que você ensina.',
  },
  {
    question: 'Quanto custa?',
    answer:
      'O investimento é definido depois de entendermos o tamanho do projeto. Você recebe o escopo, as entregas e o valor antes de qualquer desenvolvimento. Também é possível começar por uma versão essencial e evoluir depois.',
  },
  {
    question: 'Preciso mudar meu curso?',
    answer:
      'Não. O simulador pode entrar como atividade prática, bônus, fechamento de módulo, dinâmica de mentoria, ferramenta de captação ou conteúdo para a comunidade.',
  },
  {
    question: 'Preciso saber programar?',
    answer:
      'Não. A implantação é feita com você. O painel permite editar os conteúdos previstos no projeto sem precisar alterar código.',
  },
  {
    question: 'Onde o aluno acessa?',
    answer:
      'Diretamente pelo navegador, no computador ou celular. A forma de disponibilização é definida junto com você durante a implantação.',
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

export function App() {
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

    if (!('IntersectionObserver' in window)) {
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
      { threshold: 0.1 },
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
    const syncCta = () => setShowMobileCta(window.scrollY > Math.min(window.innerHeight * 0.9, 760));
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
              Falar com especialista
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
              <h1>Transforme seu método em uma experiência que ensina o aluno a <em>decidir no mundo real.</em></h1>
              <p>
                Criamos um app personalizado que coloca seus alunos diante de situações reais, mostra as consequências de cada escolha e entrega um diagnóstico baseado no que você ensina.
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
                  Quero conversar
                </button>
              </div>
              <p className="hero-reassurance"><Icon name="shield" size={15} /> Conversa inicial sem compromisso. Escopo e investimento definidos antes de começar.</p>
            </div>

            <div className="hero-product" data-reveal>
              <div className="hero-device">
                <img src={mobileImage} alt="Simulador Detailer Business em um celular" />
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
                eyebrow="Veja antes de conversar"
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
                  {gameDirectUrl ? <a href={gameDirectUrl} target="_blank" rel="noreferrer">Abrir em nova guia</a> : null}
                  <button type="button" onClick={enterFullscreen} disabled={!gameEmbedUrl}>
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
                Quero aplicar isso ao meu método <Icon name="arrow" size={17} />
              </button>
            </div>

            <div className="learning-preview" data-reveal>
              <img src={decisionImage} alt="Tela de decisão do Detailer Business" />
              <div className="learning-preview__result">
                <img src={resultImage} alt="Tela de diagnóstico final do Detailer Business" />
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
            <div className="reference-grid">
              {marketReferences.map((reference) => (
                <article className="reference-card" key={reference.name} data-reveal>
                  <img src={reference.image} alt={`Ilustração inspirada no mecanismo de aprendizagem do ${reference.name}`} />
                  <div className="reference-card__body">
                    <small>{reference.label}</small>
                    <h3>{reference.name}</h3>
                    <p>{reference.text}</p>
                    <a href={reference.href} target="_blank" rel="noreferrer">
                      Ver referência oficial <Icon name="arrow" size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="reference-disclaimer">Essas marcas são referências públicas de aprendizagem interativa. Não são clientes, parceiros ou cases do Detailer Business.</p>
          </div>
        </section>

        <section className="section implementation" id="metodo">
          <div className="container implementation-grid">
            <div className="implementation-copy" data-reveal>
              <SectionHeading
                eyebrow="Do seu conteúdo ao simulador"
                title="Um processo simples, com você no controle."
                text="Nós transformamos sua metodologia em produto sem exigir que você saiba programar ou reconstrua seu curso."
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
              <div className="settings-frame"><img src={settingsImage} alt="Painel de personalização do Detailer Business" /></div>
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
              <span className="eyebrow">Investimento claro desde o início</span>
              <h2>O valor é combinado com você antes de qualquer desenvolvimento.</h2>
              <p>
                Primeiro entendemos o seu objetivo. Depois apresentamos uma proposta com escopo, entregas, prazo e investimento. Você decide sabendo exatamente o que será criado.
              </p>
              <div className="investment-points">
                <div><span><Icon name="check" size={16} /></span><p><strong>Conversa inicial sem compromisso</strong> para avaliar se o projeto faz sentido.</p></div>
                <div><span><Icon name="check" size={16} /></span><p><strong>Proposta antes de começar</strong> com tudo o que está incluído.</p></div>
                <div><span><Icon name="check" size={16} /></span><p><strong>Possibilidade de começar menor</strong> e evoluir depois da validação.</p></div>
              </div>
              <div className="investment-note">
                <Icon name="money" size={21} />
                <p><strong>Não existe preço escondido nem obrigação de contratar.</strong> O investimento acompanha o tamanho real do projeto.</p>
              </div>
            </div>

            <form className="lead-form" name="detailer-leads" method="POST" data-netlify="true" onSubmit={submitLead} data-reveal id="contato">
              <input type="hidden" name="form-name" value="detailer-leads" />
              <p className="hidden-field"><label>Não preencha: <input name="bot-field" /></label></p>
              <div className="form-heading">
                <span className="eyebrow">Vamos conversar?</span>
                <h3>Conte sobre o seu projeto.</h3>
                <p>Receba uma avaliação inicial e entenda qual formato pode fazer sentido para você.</p>
              </div>
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
              <label>
                O que você ensina? <span className="optional-label">Opcional</span>
                <textarea name="method" rows={3} placeholder="Conte em uma frase qual é o seu método ou principal produto." />
              </label>
              <button className="button button--form" type="submit" disabled={formState === 'sending'}>
                {formState === 'sending' ? 'Enviando...' : 'Quero entender meu projeto'}
                {formState !== 'sending' ? <Icon name="arrow" size={18} /> : null}
              </button>
              {formState === 'success' ? <p className="form-message form-message--success">Recebemos seus dados. Vamos avaliar seu caso e entrar em contato.</p> : null}
              {formState === 'error' ? <p className="form-message form-message--error">Não foi possível enviar agora. Tente novamente em instantes.</p> : null}
              <small>Sem compromisso. Seus dados serão usados apenas para responder a esta solicitação.</small>
            </form>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container faq-grid">
            <div data-reveal>
              <SectionHeading
                eyebrow="Perguntas frequentes"
                title="O essencial antes de conversar."
                text="Respostas diretas para você avaliar se a solução combina com a sua oferta."
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
      </main>

      {mobileDemoOpen && gameEmbedUrl ? (
        <div className="mobile-demo-overlay" role="dialog" aria-modal="true" aria-label="Demonstração do Detailer Business">
          <button className="mobile-demo-overlay__close" type="button" onClick={() => setMobileDemoOpen(false)} aria-label="Fechar demonstração">
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

      <footer className="footer">
        <div className="container footer-grid">
          <Brand />
          <p>Seu conhecimento transformado em uma experiência que ensina, envolve e gera valor.</p>
          <button type="button" onClick={() => scrollTo('inicio')}>Voltar ao topo <Icon name="chevron" size={15} /></button>
        </div>
      </footer>

      <button
        className={showMobileCta && !mobileDemoOpen ? 'mobile-contact-cta mobile-contact-cta--visible' : 'mobile-contact-cta'}
        type="button"
        onClick={() => scrollTo('contato')}
      >
        Falar sobre meu projeto <Icon name="arrow" size={17} />
      </button>
    </div>
  );
}

export default App;
