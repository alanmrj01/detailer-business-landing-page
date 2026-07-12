import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import coverImage from './assets/capa-dark.webp';
import decisionImage from './assets/decisao.webp';
import resultImage from './assets/resultado.webp';
import settingsImage from './assets/configuracoes.webp';
import mobileImage from './assets/celular-decisao.webp';
import growthImage from './assets/growth.webp';

type IconName =
  | 'arrow'
  | 'brain'
  | 'brand'
  | 'chart'
  | 'check'
  | 'chevron'
  | 'community'
  | 'decisions'
  | 'diagnosis'
  | 'fullscreen'
  | 'method'
  | 'play'
  | 'shield'
  | 'sparkles'
  | 'target';

const navigation = [
  ['Por que funciona', 'metodo'],
  ['Para o criador', 'criador'],
  ['Experiência ao vivo', 'experiencia'],
  ['Perguntas', 'faq'],
] as const;

const benefits = [
  {
    icon: 'target' as IconName,
    title: 'O aluno precisa decidir',
    text: 'Em vez de apenas consumir conteúdo, ele enfrenta cenários, escolhe caminhos e sustenta as próprias decisões.',
  },
  {
    icon: 'chart' as IconName,
    title: 'A consequência fica visível',
    text: 'Caixa, reputação, qualidade, capacidade, risco e carga de trabalho transformam conceitos em relações concretas.',
  },
  {
    icon: 'diagnosis' as IconName,
    title: 'O resultado ensina',
    text: 'A experiência termina com classificação, fortalezas, atenções e leitura do método — não apenas com uma pontuação.',
  },
];

const creatorControls = [
  'Marca, logo, cor e linguagem da experiência',
  'Cenários, escolhas e consequências apresentadas ao aluno',
  'Preços, equipamentos, veículos e referências de mercado',
  'Pesos, indicadores, faixas e critérios do diagnóstico final',
  'Mensagens pedagógicas que traduzem o seu próprio método',
];

const creatorOutcomes = [
  {
    icon: 'brand' as IconName,
    title: 'Mais valor percebido',
    text: 'Seu conteúdo deixa de parecer apenas mais uma sequência de aulas e ganha uma aplicação própria, memorável e assinada por você.',
  },
  {
    icon: 'brain' as IconName,
    title: 'Aprendizado mais concreto',
    text: 'O aluno entende por que uma decisão funciona ao observar o impacto dela sobre a operação inteira.',
  },
  {
    icon: 'community' as IconName,
    title: 'Mais conversa e comunidade',
    text: 'Resultados diferentes geram comparação, debate, análise de caminhos e novos conteúdos dentro da sua audiência.',
  },
  {
    icon: 'sparkles' as IconName,
    title: 'Diferenciação real',
    text: 'Você passa a oferecer uma experiência que não depende apenas de vídeo, apostila ou promessa de transformação.',
  },
];

const faqs = [
  {
    question: 'É apenas um jogo com a minha logo?',
    answer:
      'Não. A identidade visual é somente uma camada. O valor está em transformar seu método em cenários, critérios, consequências e diagnóstico. O aluno aprende usando a lógica que você ensina.',
  },
  {
    question: 'Onde essa experiência pode ser usada?',
    answer:
      'Ela pode complementar cursos, mentorias, comunidades, lançamentos, aulas ao vivo, workshops ou conteúdos de captação. O acesso acontece pelo navegador, sem instalação para o aluno.',
  },
  {
    question: 'Preciso saber programar para personalizar?',
    answer:
      'Não para a operação cotidiana. O painel permite editar conteúdo, identidade, preços, impactos e critérios. A implantação inicial organiza sua metodologia dentro da estrutura da experiência.',
  },
  {
    question: 'O resultado é genérico para todos os alunos?',
    answer:
      'Não. As decisões alteram os indicadores ao longo da jornada. O diagnóstico final considera o caminho percorrido, destaca fortalezas e identifica os pontos que ainda exigem maturidade.',
  },
  {
    question: 'A experiência funciona no celular?',
    answer:
      'Sim. A interface é responsiva e foi construída para desktop e dispositivos móveis, mantendo decisões, feedbacks e resultado acessíveis em ambos.',
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
    community: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87m-2-11.26a4 4 0 0 1 0 7.75" /></>,
    decisions: <><path d="M6 3v12" /><circle cx="6" cy="18" r="3" /><path d="M18 21V9" /><circle cx="18" cy="6" r="3" /><path d="M9 6h6M9 18h6" /></>,
    diagnosis: <><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
    fullscreen: <><path d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5" /></>,
    method: <><path d="M4 5h16M4 12h10M4 19h16" /><circle cx="17" cy="12" r="3" /></>,
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
        <small>Experiência didática para criadores</small>
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
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const enterFullscreen = async () => {
    if (demoRef.current?.requestFullscreen) {
      await demoRef.current.requestFullscreen();
    } else {
      window.open('/game/index.html', '_blank', 'noopener,noreferrer');
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
              Ver experiência
            </button>
            <button className="button button--small" type="button" onClick={() => scrollTo('contato')}>
              Solicitar proposta
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
              <span className="hero-kicker"><Icon name="sparkles" size={17} /> Seu conhecimento pode ser vivido</span>
              <h1>Seu método deixa de ser só conteúdo. <em>Vira decisão, consequência e aprendizado.</em></h1>
              <p>
                Detailer Business transforma a experiência de criadores da estética automotiva em uma ferramenta didática
                interativa para cursos, mentorias e comunidades.
              </p>
              <div className="hero-actions">
                <button className="button button--hero" type="button" onClick={() => scrollTo('experiencia')}>
                  <Icon name="play" size={18} /> Experimentar agora
                </button>
                <button className="text-link" type="button" onClick={() => scrollTo('metodo')}>
                  Entender a proposta <Icon name="arrow" size={18} />
                </button>
              </div>
              <div className="hero-trust" aria-label="Características principais">
                <span><Icon name="check" size={15} /> Método personalizável</span>
                <span><Icon name="check" size={15} /> Acesso pelo navegador</span>
                <span><Icon name="check" size={15} /> Desktop e celular</span>
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
            <Metric value="8" label="decisões conectadas" />
            <Metric value="90 dias" label="de operação simulada" />
            <Metric value="6" label="indicadores acompanhados" />
            <Metric value="1" label="diagnóstico personalizado" />
          </div>
        </section>

        <section className="positioning section">
          <div className="container positioning-grid">
            <div data-reveal>
              <SectionHeading
                eyebrow="Mais que gamificação"
                title="Não é um joguinho sobre oficina. É uma forma profissional de ensinar a pensar como dono."
                text="A estética automotiva é o contexto. O verdadeiro conteúdo está na leitura de cenário, priorização, posicionamento, qualidade, risco e crescimento sustentável."
              />
            </div>
            <div className="positioning-card" data-reveal>
              <span className="positioning-badge"><Icon name="shield" size={18} /> Ferramenta didática</span>
              <blockquote>
                “O aluno não recebe a resposta certa. Ele toma uma decisão, observa o efeito e entende a lógica por trás do método.”
              </blockquote>
              <div className="positioning-tags">
                <span>Tomada de decisão</span>
                <span>Gestão aplicada</span>
                <span>Leitura de consequência</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section method" id="metodo">
          <div className="container">
            <SectionHeading
              eyebrow="Por que funciona"
              title="O conteúdo deixa de ser abstrato quando cada escolha produz uma consequência."
              text="A experiência organiza o aprendizado em uma sequência simples: contexto, decisão, feedback e diagnóstico."
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
                <h3>Da primeira decisão ao diagnóstico da operação</h3>
                <p>
                  O aluno começa com capital, prazo e capacidade limitados. Ao longo da simulação, precisa definir estrutura,
                  equipamento, posicionamento, atendimento, reação a problemas e direção de crescimento.
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
                <span className="visual-caption"><Icon name="decisions" size={17} /> Decisões conectadas ao contexto anterior</span>
              </div>
            </div>
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
                eyebrow="Seu método, sua marca"
                title="A experiência fala com a sua voz e avalia com a sua régua."
                text="O produto não tenta substituir a autoridade do criador. Ele transforma essa autoridade em uma estrutura que o aluno consegue aplicar."
              />
              <ul className="control-list">
                {creatorControls.map((item) => (
                  <li key={item}><span><Icon name="check" size={16} /></span>{item}</li>
                ))}
              </ul>
              <div className="creator-callout">
                <Icon name="brand" size={21} />
                <div>
                  <strong>Não é um template solto.</strong>
                  <p>A configuração conecta conteúdo, impacto e resultado para manter uma narrativa pedagógica coerente.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section experience" id="experiencia">
          <div className="container">
            <div className="experience-heading">
              <SectionHeading
                eyebrow="Experiência ao vivo"
                title="Não imagine como funciona. Tome as decisões você mesmo."
                text="A demonstração abaixo é totalmente interativa. Comece a jornada, faça escolhas e observe como o resultado se constrói."
              />
              <div className="experience-instructions">
                <span><i /> Demonstração incorporada</span>
                <p>Use o botão de tela cheia para explorar com mais espaço.</p>
              </div>
            </div>

            <div className="demo-shell" ref={demoRef} data-reveal>
              <div className="demo-toolbar">
                <div>
                  <span className="live-dot" />
                  <strong>Detailer Business</strong>
                  <small>Experiência do aluno</small>
                </div>
                <div className="demo-actions">
                  <a href="/game/index.html" target="_blank" rel="noreferrer">Abrir em nova guia</a>
                  <button type="button" onClick={enterFullscreen} aria-label="Abrir demonstração em tela cheia">
                    <Icon name="fullscreen" size={18} /> Tela cheia
                  </button>
                </div>
              </div>
              <iframe
                src="/game/index.html"
                title="Demonstração interativa do Detailer Business"
                loading="lazy"
                allow="fullscreen; clipboard-write"
              />
            </div>
            <p className="demo-note"><Icon name="shield" size={15} /> A demonstração roda isolada dentro da página e não envia os dados da partida.</p>
          </div>
        </section>

        <section className="section result-section">
          <div className="container result-grid">
            <div className="result-copy" data-reveal>
              <SectionHeading
                eyebrow="Fechamento pedagógico"
                title="Uma nota sozinha não ensina. O diagnóstico mostra por que o aluno chegou até ela."
                text="O resultado conecta os indicadores da operação com as decisões tomadas durante a jornada, sem transformar escolhas recomendadas em mensagens contraditórias."
              />
              <div className="diagnosis-points">
                <div><span><Icon name="check" size={17} /></span><p><strong>Visão geral</strong> traduz o estágio atual da operação.</p></div>
                <div><span><Icon name="check" size={17} /></span><p><strong>Fortalezas</strong> destacam o que sustentou o resultado.</p></div>
                <div><span><Icon name="check" size={17} /></span><p><strong>Atenções</strong> indicam o próximo foco de evolução.</p></div>
              </div>
            </div>
            <div className="result-visual" data-reveal>
              <img src={resultImage} alt="Tela de diagnóstico final do Detailer Business" />
              <div className="result-chip"><span>4,5</span><strong>Leitura completa,<br />não só pontuação</strong></div>
            </div>
          </div>
        </section>

        <section className="section outcomes">
          <div className="container">
            <SectionHeading
              eyebrow="Valor para o criador"
              title="Uma nova camada de produto para quem já tem conhecimento e audiência."
              text="O Detailer Business não concorre com suas aulas. Ele faz o aluno aplicar, comparar e lembrar do que você ensina."
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
                <span>Gamificação superficial</span>
                <h3>O aluno apenas tenta acertar.</h3>
                <ul>
                  <li>Respostas isoladas</li>
                  <li>Pontuação sem contexto</li>
                  <li>Visual genérico</li>
                  <li>Pouca relação com o método</li>
                </ul>
              </div>
              <div className="comparison-divider"><Icon name="arrow" size={22} /></div>
              <div className="comparison-side comparison-side--primary">
                <span>Detailer Business</span>
                <h3>O aluno aprende a decidir.</h3>
                <ul>
                  <li>Jornada conectada</li>
                  <li>Consequências mensuráveis</li>
                  <li>Identidade do criador</li>
                  <li>Diagnóstico baseado no método</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section use-cases">
          <div className="container use-case-grid">
            <div className="use-case-copy" data-reveal>
              <SectionHeading
                eyebrow="Onde usar"
                title="Uma experiência que pode entrar antes, durante ou depois do seu conteúdo."
                text="A mesma jornada pode cumprir papéis diferentes dentro da sua oferta, sem obrigar você a reconstruir seu curso."
              />
              <div className="use-case-list">
                {[
                  ['Captação', 'Uma demonstração que materializa o valor da sua metodologia.'],
                  ['Curso ou mentoria', 'Uma atividade prática entre módulos ou no encerramento da turma.'],
                  ['Comunidade', 'Um ponto de partida para análise coletiva e comparação de estratégias.'],
                  ['Conteúdo', 'Novos vídeos e aulas a partir das decisões e erros mais frequentes.'],
                ].map(([title, text]) => (
                  <div key={title}><strong>{title}</strong><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="use-case-image" data-reveal>
              <img src={growthImage} alt="Representação de crescimento profissional na estética automotiva" />
              <div className="image-quote">
                <Icon name="sparkles" size={20} />
                <p>Uma ferramenta própria aumenta a percepção de método, estrutura e profissionalismo.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container faq-grid">
            <div data-reveal>
              <SectionHeading
                eyebrow="Perguntas frequentes"
                title="O que um criador precisa saber antes de levar a experiência para sua audiência."
                text="A proposta é começar com uma ferramenta objetiva, personalizada e fácil de inserir no produto que você já possui."
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
              <span className="eyebrow">Próximo passo</span>
              <h2>Seu método já existe. Agora ele pode se tornar uma experiência.</h2>
              <p>
                Conte brevemente sobre sua audiência e sua oferta. A partir disso, avaliamos como o Detailer Business pode
                complementar seu curso, mentoria ou comunidade.
              </p>
              <div className="contact-proof">
                <span><Icon name="check" size={16} /> Conversa sem compromisso</span>
                <span><Icon name="check" size={16} /> Proposta alinhada ao seu método</span>
                <span><Icon name="check" size={16} /> Demonstração prática da experiência</span>
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
                  Seu melhor e-mail
                  <input name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Perfil ou canal
                  <input name="profile" type="text" placeholder="@seuperfil ou link" required />
                </label>
                <label>
                  Tamanho da audiência
                  <select name="audience" required defaultValue="">
                    <option value="" disabled>Selecione uma faixa</option>
                    <option value="Até 5 mil">Até 5 mil</option>
                    <option value="5 a 15 mil">5 a 15 mil</option>
                    <option value="15 a 30 mil">15 a 30 mil</option>
                    <option value="30 a 100 mil">30 a 100 mil</option>
                    <option value="Mais de 100 mil">Mais de 100 mil</option>
                  </select>
                </label>
              </div>
              <label>
                Como você imagina usar a experiência?
                <textarea name="goal" rows={4} placeholder="Curso, mentoria, comunidade, lançamento..." required />
              </label>
              <button className="button button--form" type="submit" disabled={formState === 'sending'}>
                {formState === 'sending' ? 'Enviando...' : 'Quero conhecer a proposta'}
                {formState !== 'sending' ? <Icon name="arrow" size={18} /> : null}
              </button>
              {formState === 'success' ? <p className="form-message form-message--success">Recebemos seus dados. O próximo passo é conversar sobre o seu método.</p> : null}
              {formState === 'error' ? <p className="form-message form-message--error">Não foi possível enviar agora. Tente novamente em instantes.</p> : null}
              <small>Seus dados serão usados somente para responder a esta solicitação.</small>
            </form>
          </div>
        </section>
      </main>

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
