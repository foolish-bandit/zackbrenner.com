import React from 'react';
import './Home.css';

const DATA = {
  email: 'zgbrenner@gmail.com',
  intro: [
    "Sonomos, the company I co-founded, makes software that catches sensitive information before it reaches outside AI tools. It runs on your own machine, not in someone else's cloud. I'm finishing a joint JD/MBA while we build it.",
    "My writing covers the places where new technology outruns old rules: trading algorithms that learn to manipulate markets, blockchains regulators can't quite pin down, AI chat logs turning up in discovery. I'm also a member of LegalQuants, a group of lawyers focused on the technical side of the profession.",
    "Before all this I worked in politics, first for Congressman Scott Peters and later for Senator Alex Padilla in Washington. Home is San Diego."
  ],
  writing: [
    { pub: 'JD Supra', year: '2026', title: 'AI Interaction Metadata and the Coming Era of Behavioral Discovery', url: 'https://www.jdsupra.com/legalnews/ai-interaction-metadata-and-the-coming-7632321/' },
    { pub: 'UC Davis Business Law Journal', year: '2026', title: 'The Market Dreams of Machines: Anti-Manipulation Regulation, Autonomous Tactics, and the Age of AI Agentics', url: 'https://blj.ucdavis.edu/archives/26/1/market-dreams-machines-anti-manipulation-regulation-autonomous-tactics-and-age-ai' },
    { pub: 'Law360', year: '2025', title: "Why It's Time to Retire the Efficient Market Hypothesis", url: 'https://www.law360.com/articles/2340297/why-it-s-time-to-retire-the-efficient-market-hypothesis' },
    { pub: 'Journal of Regulatory Compliance', year: '2025', title: "Blockchain's Achilles' Heel: How Interoperability Gaps Threaten Decentralization and Invite Regulatory Scrutiny", url: 'https://www.compliancelawjournal.com/compliancelawjournal/issue_xiv/MobilePagedArticle.action?articleId=2083060' },
    { pub: 'Westlaw Today', year: '2025', title: "Bybit's Billion-Dollar Blunder", url: 'https://today.westlaw.com/Document/Ic5ffd91b13e611f09f8daaabbaf86ccc/View/FullText.html' }
  ],
  experience: [
    { date: '2026 –', role: 'Co-Founder & CEO', co: 'Sonomos', detail: 'Privacy software that catches sensitive information before it reaches outside AI tools.' },
    { date: '2025 –', role: 'Law Clerk', co: 'Vistage Worldwide', detail: 'Legal research, drafting, and analysis for a global executive coaching company.' },
    { date: '2025 – 26', role: 'Regulatory & Business Development Consultant', co: 'CoinStructive', detail: 'Regulatory strategy and business development for a crypto compliance firm.' },
    { date: '2025', role: 'Judicial Extern', co: 'San Diego Superior Court', detail: 'Legal research and analysis for judicial chambers in the civil division.' },
    { date: '2024 – 25', role: 'Honors Instructor', co: 'Legal Skills & Writing I–II', detail: 'Helped teach legal writing, research, and analysis to first-year law students.' },
    { date: '2024', role: 'Law Clerk', co: "Bremer Whyte Brown & O'Meara", detail: 'Legal research and support on litigation and transactional matters.' },
    { date: '2022 – 23', role: 'Legislative Aide', co: 'U.S. Senator Alex Padilla', detail: 'Economic policy and legislative analysis in a U.S. Senate office.' },
    { date: '2022', role: 'Legal Intern', co: "Los Angeles District Attorney's Office", detail: 'Legal research and case-related support.' },
    { date: '2020 – 21', role: 'Congressional Intern', co: 'Congressman Scott Peters', detail: 'Legislative and constituent work in a congressional office.' }
  ],
  contacts: [
    { label: 'Email', value: 'zgbrenner@gmail.com', url: 'mailto:zgbrenner@gmail.com' },
    { label: 'LinkedIn', value: 'zachary-g-brenner', url: 'https://www.linkedin.com/in/zachary-g-brenner/' },
    { label: 'GitHub', value: 'foolish-bandit', url: 'https://github.com/foolish-bandit' },
    { label: 'JD Supra', value: 'zachary-brenner', url: 'https://www.jdsupra.com/authors/zachary-brenner/artificial-intelligence/' }
  ]
};

const PORTRAIT_SRC = (process.env.PUBLIC_URL || '') + '/headshot.jpg';

export const Home = () => (
  <div className="page">
    <header className="top">
      <span className="top-name">Zachary Brenner</span>
      <nav className="top-nav">
        <a href="#writing">Writing</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main>
      <section className="intro">
        <h1>
          I'm Zack. I study law, write about technology,
          and build software that <em>keeps private things private.</em>
        </h1>
        <div className="intro-row">
          <div className="intro-text">
            {DATA.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <img className="portrait" src={PORTRAIT_SRC} alt="Zachary Brenner" />
        </div>
      </section>

      <section id="writing" className="section">
        <h2>Writing</h2>
        <ul className="writing">
          {DATA.writing.map((w) => (
            <li key={w.url}>
              <a href={w.url} target="_blank" rel="noopener noreferrer">
                <span className="w-title">{w.title}</span>
                <span className="w-meta">{w.pub} · {w.year}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="experience" className="section">
        <h2>Experience</h2>
        <ul className="exp">
          {DATA.experience.map((e) => (
            <li key={`${e.date}-${e.co}`}>
              <div className="e-head">
                <span className="e-role">{e.role}, <span className="e-co">{e.co}</span></span>
                <span className="e-date">{e.date}</span>
              </div>
              <p className="e-detail">{e.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="section">
        <h2>Contact</h2>
        <p className="contact-lede">
          <a href={`mailto:${DATA.email}`}>Email</a> is the best way to reach me.
          I'm happy to talk about privacy, AI and the law, or whatever you're working on.
        </p>
        <ul className="contacts">
          {DATA.contacts.map((c) => (
            <li key={c.label}>
              <span className="c-label">{c.label}</span>
              <a href={c.url} target={c.url.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{c.value}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>

    <footer className="foot">
      <span>© {new Date().getFullYear()} Zachary Brenner</span>
      <span>San Diego, California</span>
    </footer>
  </div>
);

export default Home;
