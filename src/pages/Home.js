import React, { useState, useEffect, useRef, useMemo } from 'react';
import { mountOrb } from './orb';
import './Home.css';

const DATA = {
  email: 'zgbrenner@gmail.com',
  positioning: "I'm an AI-native JD/MBA student, LegalQuant, and founder of Sonomos. My work sits where law meets emerging technology — examining how agentic AI, crypto, and privacy infrastructure challenge the regulatory frameworks they increasingly inhabit.",
  positioningBody: [
    "At Sonomos, we're building local-first privacy infrastructure that sits between users and AI systems — detecting and protecting sensitive information before it's exposed to external models. The aim is real-time detection, regulatory compliance, and visibility for professionals adopting AI.",
    "Alongside that, I'm a member of LegalQuants, an international community of legal professionals focused on the quantitative and technological transformation of modern legal practice. Before graduate school I worked in government and policy, including roles with U.S. Senator Alex Padilla and Congressman Scott Peters."
  ],
  focus: [
    { n: '01', label: 'Agentic AI & market behavior', tag: 'Research' },
    { n: '02', label: 'Crypto regulation & interoperability', tag: 'Practice' },
    { n: '03', label: 'AI compliance systems', tag: 'Building' },
    { n: '04', label: 'Privacy infrastructure', tag: 'Sonomos' },
    { n: '05', label: 'Emerging-tech legal frameworks', tag: 'Writing' }
  ],
  writing: [
    { year: '2024', pub: 'UC Davis Business Law Journal', title: 'The Market Dreams of Machines: Anti-Manipulation Regulation, Autonomous Tactics and the Age of AI', url: 'https://blj.ucdavis.edu/archives/26/1/market-dreams-machines-anti-manipulation-regulation-autonomous-tactics-and-age-ai' },
    { year: '2024', pub: 'Law360', title: "Why It's Time to Retire the Efficient Market Hypothesis", url: 'https://www.law360.com/articles/2340297/why-it-s-time-to-retire-the-efficient-market-hypothesis' },
    { year: '2024', pub: 'JD Supra', title: 'AI Interaction Metadata and the Coming Age of AI', url: 'https://www.jdsupra.com/legalnews/ai-interaction-metadata-and-the-coming-7632321/' },
    { year: '2024', pub: 'Journal of Regulatory Compliance', title: 'On Regulatory Compliance in a Machine-Mediated Market', url: 'https://www.compliancelawjournal.com/compliancelawjournal/issue_xiv/MobilePagedArticle.action?articleId=2083060' },
    { year: '2024', pub: 'Westlaw Today', title: "Bybit's Billion-Dollar Breach", url: 'https://today.westlaw.com/Document/Ic5ffd91b13e611f09f8daaabbaf86ccc/View/FullText.html' },
    { year: 'ongoing', pub: 'JD Supra — Author Page', title: 'Collected essays on artificial intelligence law and regulation', url: 'https://www.jdsupra.com/authors/zachary-brenner/artificial-intelligence/' }
  ],
  experience: [
    { date: '2026 — Present', role: 'Co-Founder & CEO', co: 'Sonomos', loc: 'San Diego, CA', detail: 'Building a privacy and AI-compliance layer that detects and protects sensitive information before exposure to external AI systems. Local-first infrastructure for professionals and organizations adopting AI.', now: true },
    { date: '2025 — Present', role: 'Legal Intern (Law Clerk)', co: 'Vistage Worldwide', loc: 'San Diego, CA', detail: 'Supporting legal and business operations with research, drafting, and analysis in a global executive coaching and advisory organization.' },
    { date: '2025 — 2026', role: 'Regulatory / BD Consultant', co: 'CoinStructive', loc: 'San Diego, CA', detail: 'Regulatory strategy and business-development initiatives within the cryptocurrency and compliance space.' },
    { date: '2025', role: 'Judicial Extern', co: 'San Diego Superior Court', loc: 'San Diego, CA', detail: 'Civil division — supporting judicial chambers with legal research and analysis.' },
    { date: '2024 — 2025', role: 'Honors Instructor (TA)', co: 'Legal Skills/Writing I & II', loc: 'San Diego, CA', detail: 'Assisted in teaching legal writing, research, and analytical skills to first-year law students.' },
    { date: '2024', role: 'Law Clerk', co: "Bremer Whyte Brown & O'Meara LLP", loc: 'San Diego, CA', detail: 'Legal research and support on litigation and transactional matters in a full-service firm environment.' },
    { date: '2022 — 2023', role: 'Legislative Aide', co: 'U.S. Senator Alex Padilla', loc: 'Washington, DC', detail: 'Economic-policy matters and legislative analysis within a U.S. Senate office.' },
    { date: '2022', role: 'Legal Volunteer Intern', co: "Los Angeles District Attorney's Office", loc: 'Los Angeles, CA', detail: 'Legal research and case-related support.' },
    { date: '2020 — 2021', role: 'Congressional Intern', co: 'Congressman Scott Peters', loc: 'San Diego, CA', detail: 'Legislative and constituent-facing work in a congressional office.' }
  ]
};

const ACCENT = '#C8502E';
const HERO_MODE = 'orb';
const PORTRAIT_SRC = (process.env.PUBLIC_URL || '') + '/TR.jpg';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
function DecryptText({ text, trigger, delay = 0, className, style }) {
  const [display, setDisplay] = useState(text);
  const started = useRef(false);
  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const total = 22;
    let frame = 0;
    let interval = null;
    const id = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        const out = text.split('').map((ch, i) => {
          if (ch === ' ' || ch === '\n') return ch;
          const unlock = (i / text.length) * total;
          if (frame > unlock + 4) return ch;
          if (frame > unlock) return Math.random() > 0.5 ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        setDisplay(out);
        if (frame >= total + 6) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 42);
    }, delay);
    return () => {
      clearTimeout(id);
      if (interval) clearInterval(interval);
    };
  }, [trigger, text, delay]);
  return <span className={className} style={style}>{display}</span>;
}

function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ children, delay = 0, as: As = 'div', className = '', style, ...rest }) {
  const [ref, seen] = useReveal();
  const cls = `reveal ${seen ? 'in' : ''} ${className}`.trim();
  const mergedStyle = delay ? { transitionDelay: `${delay}ms`, ...style } : style;
  return (
    <As ref={ref} className={cls} style={mergedStyle} {...rest}>
      {children}
    </As>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="mark">
        <div className="dot" />
        <span>Zachary Brenner</span>
      </div>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#writing">Writing</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

function Hero() {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    const orb = mountOrb(canvasRef.current, { accent: ACCENT, mode: HERO_MODE });
    setMounted(true);
    return () => orb.destroy();
  }, []);

  const today = useMemo(
    () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase(),
    []
  );

  return (
    <header className="hero">
      <div className="orb-wrap"><canvas ref={canvasRef} /></div>
      <div className="hero-inner">
        <div className="hero-top">
          <div>
            <div className="eyebrow reveal in">
              <span className="tick" />
              <span>Index · {today} · San Diego</span>
            </div>
            <h1 className="hero-name">
              <DecryptText text="Zachary" trigger={mounted} delay={0} /><br />
              <span className="italic"><DecryptText text="Brenner" trigger={mounted} delay={260} /></span>
            </h1>
          </div>
          <div className="hero-meta reveal in" style={{ transitionDelay: '400ms' }}>
            <div><span className="k">ROLE</span>&nbsp;&nbsp;Founder, Technologist, Human</div>
            <div><span className="k">EDU</span>&nbsp;&nbsp;JD/MBA (In-Process), BA</div>
          </div>
        </div>

        <div className="hero-bottom">
          <Reveal delay={500} as="p" className="hero-lede">
            At the intersection of <em>law, AI, and emerging markets</em> — building privacy
            infrastructure, writing on regulatory design, and studying how autonomous systems
            reshape the frameworks they inhabit.
          </Reveal>
          <Reveal delay={650} className="hero-stats">
            <div className="stat"><div className="n">04+</div><div className="l">Years at the<br />edge of tech &amp; law</div></div>
            <div className="stat"><div className="n">6</div><div className="l">Essays published<br />on AI regulation</div></div>
            <div className="stat"><div className="n">∞</div><div className="l">Passion for<br />emerging tech</div></div>
          </Reveal>
        </div>
      </div>

      <div className="scroll-hint"><span>Scroll</span><span className="line" /></div>
    </header>
  );
}

function About() {
  return (
    <section id="about" className="block">
      <div className="block-inner">
        <div className="sec-head">
          <Reveal className="sec-num">§ 01 · Positioning</Reveal>
          <Reveal as="h2" className="sec-title" delay={80}>
            Building the legal &amp; technical scaffolding{' '}
            <span className="italic">for the age of machine-mediated systems.</span>
          </Reveal>
        </div>
        <div className="about-layout">
          <Reveal className="about-left">
            <figure className="portrait">
              <img src={PORTRAIT_SRC} alt="Zachary Brenner" />
              <figcaption><span className="pk">Portrait</span> Zachary Brenner · San Diego</figcaption>
            </figure>
            <dl className="about-facts">
              <div><dt>Based</dt><dd>San Diego, CA</dd></div>
              <div><dt>Education</dt><dd>JD/MBA (In-Process), BA</dd></div>
              <div><dt>Building</dt><dd>Sonomos</dd></div>
              <div><dt>Group</dt><dd>LegalQuants</dd></div>
            </dl>
          </Reveal>

          <Reveal className="about-main" delay={100}>
            <p className="about-lede-big">{DATA.positioning}</p>
            <div className="about-body">
              {DATA.positioningBody.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>
        </div>

        <Reveal className="focus-wrap" delay={160}>
          <div className="focus-head">
            <span className="focus-num">§ 01.1</span>
            <span className="focus-title">Areas of focus</span>
          </div>
          <div className="focus-list">
            {DATA.focus.map((f) => (
              <div className="focus-row" key={f.n}>
                <span className="n">{f.n}</span>
                <span className="label">{f.label}</span>
                <span className="tag">{f.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="block">
      <div className="block-inner">
        <div className="sec-head">
          <Reveal className="sec-num">§ 02 · Writing &amp; Publications</Reveal>
          <Reveal as="h2" className="sec-title" delay={80}>
            Selected <span className="italic">essays</span> &amp; analysis.
          </Reveal>
        </div>
        <div className="writing-list">
          {DATA.writing.map((w, i) => (
            <Reveal key={w.url} delay={i * 40}>
              <a className="writing-row" href={w.url} target="_blank" rel="noopener noreferrer">
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="pub">{w.pub} <span style={{ opacity: 0.5 }}>· {w.year}</span></span>
                <span className="title">{w.title}</span>
                <span className="arrow">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="block">
      <div className="block-inner">
        <div className="sec-head">
          <Reveal className="sec-num">§ 03 · Blog</Reveal>
          <Reveal as="h2" className="sec-title" delay={80}>
            Field <span className="italic">notes</span> &amp; thinking in progress.
          </Reveal>
        </div>

        <Reveal className="blog-soon">
          <div className="blog-soon-inner">
            <div className="blog-soon-mark">
              <span className="dot" />
              <span className="k">Status</span>
              <span className="v">Coming soon</span>
            </div>
            <p className="blog-soon-lede">
              A place for <em>shorter</em>, less formal writing &mdash; quick reactions to regulatory
              moves, half-formed ideas, working notes from Sonomos, and experiments at the edge of
              AI, privacy, and law.
            </p>
            <div className="blog-soon-meta">
              <div><span className="k">First post</span><span className="v">TBD 2026</span></div>
              <div><span className="k">Cadence</span><span className="v">When I have something to say</span></div>
              <div>
                <span className="k">Subscribe</span>
                <a className="v link" href={`mailto:${DATA.email}?subject=Blog%20%E2%80%94%20let%20me%20know%20when%20it%20launches`}>Email me</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExpRow({ item, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <Reveal delay={idx * 30} className={`tl-row ${open ? 'open' : ''}`}>
      <div className="date">
        {item.now ? <><span className="now">● </span>{item.date}</> : item.date}
      </div>
      <div>
        <div className="role">{item.role}</div>
        <div className="co">{item.co}</div>
        <div className="detail">{item.detail}</div>
      </div>
      <div className="loc">{item.loc}</div>
      <div className="toggle" onClick={() => setOpen((o) => !o)}>+</div>
    </Reveal>
  );
}

function Experience() {
  return (
    <section id="experience" className="block">
      <div className="block-inner">
        <div className="sec-head">
          <Reveal className="sec-num">§ 04 · Experience</Reveal>
          <Reveal as="h2" className="sec-title" delay={80}>
            A record of <span className="italic">work &amp; service.</span>
          </Reveal>
        </div>
        <div className="timeline">
          {DATA.experience.map((e, i) => <ExpRow key={`${e.date}-${e.role}`} item={e} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <Reveal as="h2">
          Let&rsquo;s talk <span className="italic">about</span><br />
          <span className="accent">what&rsquo;s next.</span>
        </Reveal>
        <div className="contact-grid">
          <div className="contact-col">
            <div className="k">Email</div>
            <a className="v" href={`mailto:${DATA.email}`}>{DATA.email}</a>
          </div>
          <div className="contact-col">
            <div className="k">LinkedIn</div>
            <a className="v" href="https://www.linkedin.com/in/zachary-g-brenner/" target="_blank" rel="noopener noreferrer">zachary-g-brenner</a>
          </div>
          <div className="contact-col">
            <div className="k">GitHub</div>
            <a className="v" href="https://github.com/foolish-bandit" target="_blank" rel="noopener noreferrer">foolish-bandit</a>
          </div>
          <div className="contact-col">
            <div className="k">Writing</div>
            <a className="v" href="https://www.jdsupra.com/authors/zachary-brenner/artificial-intelligence/" target="_blank" rel="noopener noreferrer">JD Supra</a>
          </div>
        </div>

        <div className="colophon">
          <div className="live"><span className="d" /> Currently building Sonomos — San Diego</div>
          <div>© 2026</div>
        </div>
      </div>
    </section>
  );
}

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('progress');
    if (!bar) return undefined;
    function onScroll() {
      const h = document.documentElement;
      const pct = h.scrollHeight === h.clientHeight ? 0 : h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.transform = `scaleX(${pct})`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export const Home = () => {
  useScrollProgress();
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Writing />
      <Blog />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;
