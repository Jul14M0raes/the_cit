import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

type RouteKey = 'home' | 'galeria' | 'artigos' | 'vagas' | 'pesquisa' | 'eventos' | 'equipe'

const routes: Record<string, RouteKey> = {
  '/': 'home',
  '/galeria': 'galeria',
  '/artigos': 'artigos',
  '/vagas': 'vagas',
  '/pesquisa': 'pesquisa',
  '/eventos': 'eventos',
  '/equipe': 'equipe',
}

const navItems = [
  { href: '/galeria', label: 'Galeria' },
  { href: '/artigos', label: 'Artigos' },
  { href: '/vagas', label: 'Vagas' },
  { href: '/pesquisa', label: 'Pesquisa' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/equipe', label: 'Equipe' },
]

const homeCards = [
  {
    href: '/galeria',
    kicker: 'Memorial',
    title: 'Galeria e história do CIT',
    text: 'Fotos de eventos antigos, membros que fizeram parte da equipe e marcos importantes.',
  },
  {
    href: '/artigos',
    kicker: 'Conhecimento',
    title: 'Artigos com leitura controlada',
    text: 'Prévia editorial curta para divulgar produção sem expor o conteúdo integral.',
  },
  {
    href: '/vagas',
    kicker: 'Participação',
    title: 'Entrada de novos alunos',
    text: 'Área pensada para estudantes do IFRO conhecerem as frentes e manifestarem interesse.',
  },
]

const galleryItems = [
  {
    title: 'Eventos antigos',
    meta: 'Mostras, visitas e oficinas',
    description:
      'Registro visual das atividades que ajudaram a consolidar a presença do CIT dentro do IFRO.',
  },
  {
    title: 'Membros antigos',
    meta: 'Histórico da equipe',
    description:
      'Espaço para reconhecer estudantes, servidores e colaboradores que passaram pelo núcleo.',
  },
  {
    title: 'Memorial',
    meta: 'Linha do tempo',
    description:
      'Marcos, conquistas e projetos que merecem permanecer acessíveis para novas gerações.',
  },
]

const articles = [
  {
    title: 'Como prototipar uma solução antes de programar',
    tag: 'Metodologia',
    excerpt:
      'Resumo sobre validação, recorte de problema e documentação inicial para projetos estudantis.',
  },
  {
    title: 'Boas práticas para equipes de pesquisa aplicada',
    tag: 'Pesquisa',
    excerpt:
      'Visão breve sobre organização de dados, papéis da equipe e registro de decisões técnicas.',
  },
  {
    title: 'Tecnologia no IFRO: ideias que saem do laboratório',
    tag: 'Inovação',
    excerpt:
      'Panorama curto de iniciativas que conectam ensino, extensão e desenvolvimento de produtos.',
  },
]

const openings = [
  {
    title: 'Desenvolvimento web e mobile',
    text: 'Para alunos que querem criar interfaces, sistemas e protótipos funcionais.',
  },
  {
    title: 'Design, UI e comunicação visual',
    text: 'Para quem gosta de identidade, experiência do usuário e peças institucionais.',
  },
  {
    title: 'Pesquisa, escrita e documentação',
    text: 'Para apoiar artigos, relatórios, editais, coleta de dados e memória técnica.',
  },
  {
    title: 'Organização de eventos e oficinas',
    text: 'Para estudantes que querem conduzir ações, workshops e apresentações.',
  },
]

const researchSteps = [
  'Planejamento de questionários',
  'Coleta de respostas com alunos e comunidade',
  'Organização de resultados para relatórios',
]

const events = [
  {
    name: 'Workshop de introdução ao CIT',
    date: 'Próxima edição',
    detail: 'Encontro para apresentar projetos, trilhas de participação e rotina da equipe.',
  },
  {
    name: 'Oficina de prototipagem',
    date: 'Em planejamento',
    detail: 'Atividade prática para transformar ideias em fluxos, telas e primeiras provas de conceito.',
  },
  {
    name: 'Mostra de projetos',
    date: 'Calendário interno',
    detail: 'Apresentação dos resultados desenvolvidos por membros do CIT e parceiros do IFRO.',
  },
]

const team = [
  { name: 'Coordenação', role: 'Direção técnica e articulação institucional' },
  { name: 'Desenvolvimento', role: 'Sites, sistemas, automações e protótipos' },
  { name: 'Design e mídia', role: 'Identidade visual, peças digitais e experiência do usuário' },
  { name: 'Pesquisa', role: 'Levantamento de dados, escrita e análise de resultados' },
]

function getRoute(): RouteKey {
  return routes[window.location.pathname] ?? 'home'
}

function App() {
  const [route, setRoute] = useState<RouteKey>(getRoute)

  useEffect(() => {
    const onPopState = () => setRoute(getRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  const page = useMemo(() => {
    const pages: Record<RouteKey, ReactNode> = {
      home: <HomePage />,
      galeria: <GalleryPage />,
      artigos: <ArticlesPage />,
      vagas: <OpeningsPage />,
      pesquisa: <ResearchPage />,
      eventos: <EventsPage />,
      equipe: <TeamPage />,
    }

    return pages[route]
  }, [route])

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    window.history.pushState({}, '', href)
    setRoute(getRoute())
  }

  return (
    <div className="site-shell">
      <header className="topbar" aria-label="Navegação principal">
        <a className="brand" href="/" onClick={(event) => navigate(event, '/')}>
          <span className="brand-mark">CIT</span>
          <span>
            <strong>CIT IFRO</strong>
            <small>Centro de Inovação e Tecnologia</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Páginas do site">
          {navItems.map((item) => (
            <a
              className={route === routes[item.href] ? 'active' : undefined}
              key={item.href}
              href={item.href}
              onClick={(event) => navigate(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>{page}</main>

      <footer className="footer">
        <div>
          <strong>CIT IFRO</strong>
          <span>Portal institucional para memória, projetos, pesquisa e participação estudantil.</span>
        </div>
        <a href="/vagas" onClick={(event) => navigate(event, '/vagas')}>
          Fazer parte
        </a>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Tecnologia, pesquisa e extensão no IFRO</p>
          <h1>CIT IFRO</h1>
          <p className="hero-copy">
            Uma presença digital institucional para organizar a memória, comunicar projetos e
            conectar alunos às frentes de inovação do Centro de Inovação e Tecnologia.
          </p>
          <div className="hero-actions" aria-label="Ações principais">
            <PageLink className="primary-action" href="/vagas">
              Entrar para a equipe
            </PageLink>
            <PageLink className="secondary-action" href="/eventos">
              Ver agenda
            </PageLink>
          </div>
        </div>

        <div className="hero-panel" aria-hidden="true">
          <img src={heroImg} alt="" />
          <div className="signal-card">
            <span>Portal CIT</span>
            <strong>Memória, produção e oportunidades em um só lugar</strong>
          </div>
        </div>
      </section>

      <section className="home-overview" aria-label="Áreas principais">
        <div className="section-heading">
          <p className="eyebrow">Estrutura do portal</p>
          <h2>Acesse cada área em uma página própria</h2>
          <p>
            A página inicial fica objetiva. Cada botão leva para uma área dedicada, com conteúdo
            mais organizado e pronto para crescer.
          </p>
        </div>

        <div className="home-card-grid">
          {homeCards.map((card) => (
            <PageLink className="home-card" href={card.href} key={card.title}>
              <span>{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <strong>Acessar página</strong>
            </PageLink>
          ))}
        </div>
      </section>
    </>
  )
}

function GalleryPage() {
  return (
    <ContentPage
      eyebrow="Galeria"
      title="Memória visual do CIT"
      text="Fotos de eventos antigos, membros que já passaram pela equipe e registros importantes do memorial."
    >
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <article className="gallery-card" key={item.title}>
            <div className={`photo-frame frame-${index + 1}`}>
              <span>{item.meta}</span>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button">Organizar acervo</button>
            </div>
          </article>
        ))}
      </div>
    </ContentPage>
  )
}

function ArticlesPage() {
  return (
    <ContentPage
      eyebrow="Artigos do CIT"
      title="Prévia editorial sem entregar o conteúdo completo"
      text="A área de artigos mostra título, categoria e resumo curto. Assim o CIT divulga produção intelectual sem facilitar cópia integral."
    >
      <div className="article-list">
        {articles.map((article) => (
          <article className="article-card" key={article.title}>
            <span>{article.tag}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <button type="button">Ler prévia</button>
          </article>
        ))}
      </div>
    </ContentPage>
  )
}

function OpeningsPage() {
  return (
    <ContentPage
      eyebrow="Vagas"
      title="Entrada organizada para alunos do IFRO"
      text="Um espaço direto para estudantes entenderem onde podem contribuir, quais perfis combinam com o CIT e como demonstrar interesse."
    >
      <div className="opening-grid">
        {openings.map((opening) => (
          <article className="opening-item" key={opening.title}>
            <span aria-hidden="true"></span>
            <div>
              <h3>{opening.title}</h3>
              <p>{opening.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="callout">
        <div>
          <strong>Formulário de interesse</strong>
          <p>Quando o formulário estiver pronto, este botão pode levar para inscrição ou seleção.</p>
        </div>
        <button type="button">Solicitar participação</button>
      </div>
    </ContentPage>
  )
}

function ResearchPage() {
  return (
    <ContentPage
      eyebrow="Pesquisa"
      title="Base para questionários e levantamentos"
      text="A seção de pesquisa facilita campanhas futuras: objetivo, público, período de coleta, resultados resumidos e relatórios."
    >
      <div className="research-flow">
        {researchSteps.map((step, index) => (
          <div className="research-step" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </ContentPage>
  )
}

function EventsPage() {
  return (
    <ContentPage
      eyebrow="Eventos"
      title="Agenda de workshops, encontros e mostras"
      text="Área pensada para divulgar atividades do CIT, incluindo workshops, eventos internos e apresentações de projetos."
    >
      <div className="event-list">
        {events.map((event) => (
          <article className="event-card" key={event.name}>
            <time>{event.date}</time>
            <h3>{event.name}</h3>
            <p>{event.detail}</p>
            <button type="button">Detalhes do evento</button>
          </article>
        ))}
      </div>
    </ContentPage>
  )
}

function TeamPage() {
  return (
    <ContentPage
      eyebrow="Equipe"
      title="Quem mantém o CIT em movimento"
      text="Apresentação profissional da equipe atual, com espaço para atualizar nomes, fotos, funções e contatos oficiais."
    >
      <div className="team-grid">
        {team.map((member) => (
          <article className="team-card" key={member.name}>
            <div className="avatar" aria-hidden="true">
              {member.name.slice(0, 2)}
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </article>
        ))}
      </div>
    </ContentPage>
  )
}

function ContentPage({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string
  title: string
  text: string
  children: ReactNode
}) {
  return (
    <section className="content-page">
      <div className="page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children}
    </section>
  )
}

function PageLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  )
}

export default App
