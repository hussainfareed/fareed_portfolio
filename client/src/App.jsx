import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './styles/global.css';

const API = 'http://localhost:5000/api';

// ─── SEED DATA ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  { _id:'p1', title:'Airbnb Clone', description:'Full-stack Airbnb clone with booking system, interactive Mapbox maps, Stripe payments, JWT auth, and real-time property availability tracking.', tags:['React','Node.js','MongoDB','Stripe','Mapbox','JWT','Socket.io'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:true, category:'fullstack', stats:{stars:124,forks:38,views:2400} },
  { _id:'p2', title:'Real-Time Chat App', description:'WebSocket-powered chat application with rooms, typing indicators, file sharing, and end-to-end encryption for maximum security.', tags:['React','Socket.io','Node.js','MongoDB','JWT'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:true, category:'fullstack', stats:{stars:89,forks:21,views:1800} },
  { _id:'p3', title:'E-Commerce Platform', description:'Full MERN e-commerce with admin dashboard, shopping cart, order management, and Stripe payment gateway integration.', tags:['React','Redux','Node.js','MongoDB','Stripe'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:true, category:'fullstack', stats:{stars:156,forks:44,views:3100} },
  { _id:'p4', title:'SaaS Analytics Dashboard', description:'Real-time analytics dashboard with role-based access control, live D3.js charts, data export and subscription management.', tags:['React','D3.js','Node.js','MongoDB'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:false, category:'fullstack', stats:{stars:67,forks:18,views:1200} },
];
const BLOGS = [
  { _id:'b1', title:'How I Built a Full-Stack Airbnb Clone with MERN', excerpt:'Deep dive into building a production-ready Airbnb clone using MongoDB, Express, React, and Node.js with Stripe payments and Mapbox.', tags:['MERN','React','Node.js'], readTime:8, views:1420, likes:89 },
  { _id:'b2', title:'JWT Authentication in Node.js: The Complete Guide', excerpt:'Implement secure JWT authentication in Express.js with refresh tokens, middleware, and production best practices for secure APIs.', tags:['Node.js','JWT','Security'], readTime:6, views:2100, likes:134 },
  { _id:'b3', title:'React Performance: 10 Optimization Techniques', excerpt:'Make your React apps blazing fast with useMemo, useCallback, lazy loading, code splitting, and advanced bundle optimization tricks.', tags:['React','Performance','JS'], readTime:5, views:980, likes:67 },
];
const TESTIMONIALS = [
  { _id:'t1', name:'Ahmed Raza', role:'CTO', company:'TechCorp Pakistan', content:'Fareed delivered an exceptional e-commerce platform. His MERN stack expertise is top-notch. Clean code, great communication, delivered on time!', rating:5 },
  { _id:'t2', name:'Sarah Johnson', role:'Product Manager', company:'StartupXYZ', content:'Working with Fareed was a pleasure. He built our entire SaaS dashboard from scratch. The animations and performance are incredible. Highly recommended!', rating:5 },
  { _id:'t3', name:'Hassan Ali', role:'Founder', company:'DigitalEdge', content:'Fareed transformed our idea into a fully functional real-time chat application. Professional, skilled, and very responsive. Will hire again!', rating:5 },
  { _id:'t4', name:'Emily Chen', role:'Lead Developer', company:'WebAgency', content:'The Airbnb clone Fareed built exceeded all our expectations. Full-stack expertise with beautiful UI and solid backend architecture. 10/10!', rating:5 },
];
const SKILLS = [
  {_id:'s1',name:'React.js',category:'frontend',level:92},{_id:'s2',name:'TypeScript',category:'frontend',level:80},
  {_id:'s3',name:'Redux',category:'frontend',level:82},{_id:'s4',name:'Tailwind CSS',category:'frontend',level:88},
  {_id:'s5',name:'Node.js',category:'backend',level:90},{_id:'s6',name:'Express.js',category:'backend',level:88},
  {_id:'s7',name:'Socket.io',category:'backend',level:78},{_id:'s8',name:'REST APIs',category:'backend',level:93},
  {_id:'s9',name:'MongoDB',category:'database',level:85},{_id:'s10',name:'Mongoose',category:'database',level:87},
  {_id:'s11',name:'Git/GitHub',category:'tools',level:90},{_id:'s12',name:'Docker',category:'tools',level:70},
];

// ─── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const m = useRef({ x: 0, y: 0 });
  const r = useRef({ x: 0, y: 0 });
  const [big, setBig] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const onMove = e => {
      m.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px';
        dot.current.style.top = e.clientY + 'px';
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    let raf;
    const follow = () => {
      r.current.x += (m.current.x - r.current.x) * 0.08;
      r.current.y += (m.current.y - r.current.y) * 0.08;
      if (ring.current) {
        ring.current.style.left = r.current.x + 'px';
        ring.current.style.top = r.current.y + 'px';
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const on = () => setBig(true);
    const off = () => setBig(false);
    const els = document.querySelectorAll('a, button, .hoverable');
    els.forEach(el => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off); });
    return () => els.forEach(el => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off); });
  });

  return (
    <>
      <div ref={dot} className={`cursor-dot ${clicking ? 'clicking' : ''}`} />
      <div ref={ring} className={`cursor-ring ${big ? 'big' : ''} ${clicking ? 'clicking' : ''}`} />
    </>
  );
}

// ─── LOADER ────────────────────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | reveal

  useEffect(() => {
    const t = setInterval(() => {
      setPct(p => {
        if (p >= 100) {
          clearInterval(t);
          setPhase('reveal');
          setTimeout(onDone, 800);
          return 100;
        }
        return p + Math.random() * 3 + 0.5;
      });
    }, 20);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className={`loader-wrap ${phase === 'reveal' ? 'reveal' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <FLogo size={80} animated />
        </div>
        <div className="loader-name">Fareed</div>
        <div className="loader-sub">MERN Stack Developer</div>
        <div className="loader-track">
          <div className="loader-bar" style={{ width: Math.min(pct, 100) + '%' }} />
        </div>
        <div className="loader-pct">{Math.round(Math.min(pct, 100))}%</div>
      </div>
      <div className="loader-grid" />
    </div>
  );
}

// ─── F LOGO ────────────────────────────────────────────────────────────────────
function FLogo({ size = 44, animated = false }) {
  return (
    <div className={`f-logo ${animated ? 'f-logo-animated' : ''}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <defs>
          <linearGradient id="fgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4DFFB4" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="60" height="60" rx="14" fill="url(#fgrad)" opacity="0.15" />
        <rect width="60" height="60" rx="14" fill="none" stroke="url(#fgrad)" strokeWidth="1.5" />
        {/* F letter */}
        <path d="M17 14h26M17 14v32M17 31h18" stroke="url(#fgrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
      </svg>
    </div>
  );
}

// ─── 3D PARTICLE CANVAS ────────────────────────────────────────────────────────
function Canvas3D({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, raf;
    let angle = 0, angleY = 0;
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      W = c.offsetWidth; H = c.offsetHeight;
      c.width = W; c.height = H;
    };
    resize();

    // Floating particles
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.8 + .3,
      col: Math.random() > .6 ? '#4DFFB4' : Math.random() > .5 ? '#6366f1' : '#f59e0b',
      alpha: Math.random() * .5 + .3,
    }));

    // 3D cube vertices
    const cubeVerts = [
      [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
      [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]
    ];
    const cubeEdges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

    // 3D sphere points
    const spherePts = [];
    for (let i = 0; i < 180; i++) {
      const phi = Math.acos(1 - 2 * i / 180);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      spherePts.push([Math.sin(phi)*Math.cos(theta), Math.cos(phi), Math.sin(phi)*Math.sin(theta)]);
    }

    const onMouseMove = e => {
      const rect = c.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left - W/2) / W;
      mouse.y = (e.clientY - rect.top - H/2) / H;
    };
    c.addEventListener('mousemove', onMouseMove);

    const project3D = (x, y, z, cx, cy, sz) => {
      const cosA = Math.cos(angle + mouse.x * .5);
      const sinA = Math.sin(angle + mouse.x * .5);
      const cosB = Math.cos(angleY + mouse.y * .3);
      const sinB = Math.sin(angleY + mouse.y * .3);

      const rx = x * cosA - z * sinA;
      const rz = x * sinA + z * cosA;
      const ry = y * cosB - rz * sinB;
      const rz2 = y * sinB + rz * cosB;

      const sc = 380 / (380 + rz2 + 250);
      return { x: cx + rx * sc * sz, y: cy + ry * sc * sz, z: rz2, sc };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      // Draw particles + connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - d/100) * .1;
            ctx.strokeStyle = '#4DFFB4'; ctx.lineWidth = .5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            ctx.restore();
          }
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.col;
        ctx.shadowBlur = 6; ctx.shadowColor = p.col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      }

      // Draw rotating cube
      const cubeSize = Math.min(W, H) * .18;
      const projected = cubeVerts.map(([x,y,z]) => project3D(x, y, z, cx, cy, cubeSize));

      cubeEdges.forEach(([a, b]) => {
        const pa = projected[a], pb = projected[b];
        const alpha = Math.min(1, (pa.sc + pb.sc) * .4);
        ctx.save();
        ctx.globalAlpha = alpha * .7;
        ctx.strokeStyle = '#4DFFB4';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8; ctx.shadowColor = '#4DFFB4';
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
        ctx.restore();
      });

      projected.forEach(p => {
        ctx.save();
        ctx.fillStyle = '#4DFFB4';
        ctx.shadowBlur = 12; ctx.shadowColor = '#4DFFB4';
        ctx.globalAlpha = .9;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      });

      // Draw rotating wireframe sphere (offset)
      const sphSize = Math.min(W, H) * .14;
      const sphCx = cx + W * .28, sphCy = cy - H * .15;
      const sphPts = spherePts.map(([x,y,z]) => project3D(x, y, z, sphCx, sphCy, sphSize));

      sphPts.forEach((p, i) => {
        if (i % 3 !== 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.sc) * .35;
        ctx.fillStyle = '#6366f1';
        ctx.shadowBlur = 4; ctx.shadowColor = '#6366f1';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      });

      angle += .005;
      angleY += .003;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      c.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={ref} className={`canvas3d ${className}`} />;
}

// ─── TYPING EFFECT ─────────────────────────────────────────────────────────────
function Typing({ texts }) {
  const [cur, setCur] = useState('');
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const text = texts[idx];
    const delay = del ? 35 : cur.length === text.length ? 2500 : 75;
    const t = setTimeout(() => {
      if (!del) {
        if (cur.length < text.length) setCur(text.slice(0, cur.length + 1));
        else { setPaused(true); setTimeout(() => { setPaused(false); setDel(true); }, 2000); }
      } else {
        if (cur.length > 0) setCur(text.slice(0, cur.length - 1));
        else { setDel(false); setIdx((idx + 1) % texts.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cur, del, idx, texts, paused]);

  return (
    <span className="typing-text">
      <span className="typing-accent">{cur}</span>
      <span className="cursor-blink">|</span>
    </span>
  );
}

// ─── REVEAL WRAPPER ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up' }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const transforms = {
    up: 'translateY(50px)',
    left: 'translateX(-50px)',
    right: 'translateX(50px)',
    scale: 'scale(0.9)',
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[direction],
        transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}s, transform .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── FLOATING BADGE ────────────────────────────────────────────────────────────
function FloatBadge({ children, style, color, delay = 0 }) {
  return (
    <div
      className="float-badge hoverable"
      style={{
        ...style,
        color,
        borderColor: color + '44',
        background: color + '11',
        animationDelay: delay + 's',
      }}
    >
      {children}
    </div>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['contact','testimonials','blog','projects','skills','about','home'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [['home','Home'],['about','About'],['skills','Skills'],['projects','Projects'],['blog','Blog'],['contact','Contact']];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#home" className="nav-logo hoverable">
            <FLogo size={32} />
            <span className="logo-text"><span className="logo-bracket">&lt;</span>Fareed<span className="logo-bracket">/&gt;</span></span>
          </a>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link hoverable ${active === id ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                  {active === id && <span className="nav-dot" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <button className="theme-btn hoverable" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <a href="#contact" className="hire-btn hoverable">Hire Me →</a>
            <button className="menu-btn hoverable" onClick={() => setMenuOpen(m => !m)}>
              <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                <span/><span/><span/>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="hero-section" id="home" ref={ref}>
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow g1" />
        <div className="hero-glow g2" />
        <div className="hero-glow g3" />
        <Canvas3D className="hero-canvas" />
      </div>

      <div className="container hero-container">
        <div className={`hero-content ${inView ? 'in' : ''}`}>
          <div className="hero-badge hoverable">
            <span className="pulse-ring" />
            <span className="pulse-dot" />
            Available for Hire &nbsp;🇵🇰 Pakistan
          </div>

          <h1 className="hero-name">
            <span className="hero-name-line">Hi, I'm</span>
            <span className="hero-name-main">Fareed</span>
          </h1>

          <div className="hero-role">
            <Typing texts={['MERN Stack Developer','Full Stack Engineer','React.js Expert','Node.js Architect','API Developer']} />
          </div>

          <p className="hero-desc">
            I craft <strong>high-performance full-stack apps</strong> using MongoDB, Express, React & Node.js —
            turning complex ideas into elegant, scalable digital products that ship fast and scale faster.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary hoverable">
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
            <a href="#contact" className="btn btn-outline hoverable">Hire Me</a>
            <a href="#" className="btn btn-ghost hoverable">↓ Resume</a>
          </div>

          {inView && (
            <div className="hero-stats">
              {[[2,'Years Exp.'],[20,'Projects'],[15,'Happy Clients'],[5,'Countries']].map(([n, l], i) => (
                <React.Fragment key={l}>
                  {i > 0 && <div className="stat-sep" />}
                  <div className="stat-item hoverable">
                    <div className="stat-val"><CountUp end={n} duration={2.5} delay={0.3} />+</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <div className={`hero-visual ${inView ? 'in' : ''}`}>
          <div className="hero-card-3d hoverable">
            <div className="hero-card-inner">
              <div className="hero-avatar">
                <FLogo size={64} />
              </div>
              <div className="hero-card-name">Fareed</div>
              <div className="hero-card-title">MERN Stack Developer</div>
              <div className="hero-card-badges">
                {['React','Node.js','MongoDB','Express'].map(t => (
                  <span key={t} className="hero-card-badge">{t}</span>
                ))}
              </div>
              <div className="hero-card-status">
                <span className="status-dot" />Open to Work
              </div>
            </div>
            <div className="card-shine" />
          </div>

          <FloatBadge style={{ top: '-1rem', left: '-2rem' }} color="#4ade80" delay={0}>🍃 MongoDB</FloatBadge>
          <FloatBadge style={{ top: '30%', right: '-2.5rem' }} color="#60a5fa" delay={0.4}>⚛️ React 18</FloatBadge>
          <FloatBadge style={{ bottom: '25%', left: '-2.5rem' }} color="#818cf8" delay={0.8}>🟢 Node.js</FloatBadge>
          <FloatBadge style={{ bottom: '-1rem', right: '1rem' }} color="#fbbf24" delay={1.2}>⚡ Express</FloatBadge>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section" id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">Passionate Developer<br />Building <em>Digital Future</em></h2>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal direction="left">
            <div className="about-visual">
              <div className="about-avatar hoverable">
                <div className="avatar-glow" />
                <FLogo size={96} animated />
                <div className="avatar-ring r1" />
                <div className="avatar-ring r2" />
                <div className="avatar-ring r3" />
              </div>
              <FloatBadge style={{ top: '0', right: '-1rem' }} color="#4ade80" delay={0}>⚡ React 18 Ready</FloatBadge>
              <FloatBadge style={{ bottom: '3rem', left: '-1rem' }} color="#818cf8" delay={0.6}>🚀 Node.js v20</FloatBadge>
              <FloatBadge style={{ bottom: '-1rem', right: '2rem' }} color="#fbbf24" delay={1.2}>🍃 MongoDB Atlas</FloatBadge>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div className="about-content">
              <h3 className="about-heading">
                MERN Stack <span className="accent">Full Stack Developer</span>
              </h3>
              <p className="about-text">
                I'm a <strong>Full Stack MERN Developer</strong> from Pakistan 🇵🇰 who transforms ideas into powerful,
                scalable web applications. I have deep expertise in React, Node.js, Express, and MongoDB — the full stack.
              </p>
              <p className="about-text">
                Every project I ship is crafted for <strong>performance, scalability, and exceptional UX</strong> —
                the kind that impresses recruiters and delights users alike.
              </p>

              <div className="trait-grid">
                {[['⚡','Fast Learner'],['🎯','Detail Oriented'],['🚀','Performance First'],['💡','Problem Solver'],['🔒','Security Minded'],['📱','Mobile First']].map(([icon, label]) => (
                  <div key={label} className="trait hoverable">
                    <span className="trait-icon">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="about-cta">
                <a href="https://drive.google.com/file/d/1lfZfLKO3xocYc4z8s8sibSAyxhAqrnN5/view?usp=drive_link" className="btn btn-primary hoverable">⬇ Download CV</a>
                <a href="#contact" className="btn btn-outline hoverable">Let's Talk</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const [skills, setSkills] = useState(SKILLS);
  const [activeTab, setActiveTab] = useState('frontend');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    axios.get(`${API}/skills`).then(r => {
      if (r.data?.success && r.data.data?.length) setSkills(r.data.data);
    }).catch(() => {});
  }, []);

  const cats = [
    { k:'frontend', l:'Frontend', i:'⚛️' },
    { k:'backend',  l:'Backend',  i:'⚡' },
    { k:'database', l:'Database', i:'🍃' },
    { k:'tools',    l:'DevOps',   i:'🛠️' },
  ];

  const techCloud = ['GraphQL','Socket.io','Redis','AWS S3','Vercel','Netlify','Postman','Figma','Stripe API','OAuth 2.0','Webpack','Jest','Cypress','PM2'];

  return (
    <section className="section" id="skills" ref={ref} style={{ background: 'var(--bg)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Tech Stack</span>
            <h2 className="section-title">Skills &amp; <em>Technologies</em></h2>
            <p>The full MERN toolkit I use to build world-class applications</p>
          </div>
        </Reveal>

        <div className="skills-tabs">
          {cats.map(cat => (
            <button
              key={cat.k}
              className={`skill-tab hoverable ${activeTab === cat.k ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.k)}
            >
              <span>{cat.i}</span> {cat.l}
            </button>
          ))}
        </div>

        <div className="skills-panel">
          {skills.filter(s => s.category === activeTab).map((sk, i) => (
            <div
              key={sk._id}
              className="skill-row"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateX(-30px)',
                transition: `all .6s ease ${i * .08}s`,
              }}
            >
              <div className="skill-info">
                <span className="skill-name">{sk.name}</span>
                <span className="skill-pct">{sk.level}%</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{ width: inView ? `${sk.level}%` : '0%' }}
                />
                <div className="skill-glow" style={{ width: inView ? `${sk.level}%` : '0%' }} />
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="tech-cloud">
            {techCloud.map(t => (
              <span key={t} className="tech-tag hoverable">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PROJECT MOCKUPS ──────────────────────────────────────────────────────────
function AirbnbMock() {
  return (
    <div className="mockup-wrap">
      <div className="mockup-bar">
        <span style={{ color:'#ff5a5f', fontWeight:800, fontFamily:'var(--font-display)' }}>airbnb</span>
        <div className="mock-search" />
        <span style={{ fontSize:'.85rem' }}>🗺️</span>
      </div>
      <div className="mock-grid-3">
        {[['linear-gradient(135deg,#ff9a9e,#fad0c4)','Bali Villa','$120'],
          ['linear-gradient(135deg,#a18cd1,#fbc2eb)','Paris Loft','$89'],
          ['linear-gradient(135deg,#ffecd2,#fcb69f)','NYC Suite','$210']].map(([bg,name,price]) => (
          <div key={name} className="mock-prop">
            <div className="mock-img" style={{ background: bg }} />
            <div className="mock-prop-name">{name}</div>
            <div className="mock-prop-price" style={{ color:'#ff5a5f' }}>{price}/night</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="mockup-chat">
      <div className="chat-header">
        <div className="chat-avatar" /><span>Dev Chat Room</span>
        <span className="chat-online">● Online</span>
      </div>
      {[['left','Hey! Need a dev? 👋','rgba(255,255,255,.06)','var(--text2)'],
        ['right','MERN Stack here! 🚀','rgba(77,255,180,.12)','var(--accent)'],
        ['left','Real-time features?','rgba(255,255,255,.06)','var(--text2)'],
        ['right','Socket.io is my jam ⚡','rgba(77,255,180,.12)','var(--accent)']].map(([side,msg,bg,col],i) => (
        <div key={i} className={`chat-bubble-row ${side}`}>
          <div className="chat-bubble" style={{ background:bg, color:col }}>{msg}</div>
        </div>
      ))}
    </div>
  );
}

function DashMock() {
  return (
    <div className="mockup-dash">
      <div className="dash-cards">
        {[['📈','+24%','Revenue'],['👥','1.2k','Users'],['💰','$48k','MRR']].map(([icon,val,label]) => (
          <div key={label} className="dash-card">
            <span>{icon}</span>
            <div className="dash-val">{val}</div>
            <div className="dash-lbl">{label}</div>
          </div>
        ))}
      </div>
      <div className="dash-chart">
        {[35,55,45,70,60,85,75,90,65,80,72,95].map((h,i) => (
          <div key={i} className="dash-bar" style={{ height:`${h}%` }} />
        ))}
      </div>
    </div>
  );
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
function Projects() {
  const [projects, setProjects] = useState(PROJECTS);
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  useEffect(() => {
    axios.get(`${API}/projects`).then(r => {
      if (r.data?.success && r.data.data?.length) setProjects(r.data.data);
    }).catch(() => {});
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  const mockups = { p1:<AirbnbMock/>, p2:<ChatMock/>, p3:<DashMock/>, p4:<DashMock/> };
  const bgs = {
    p1:'linear-gradient(135deg,rgba(255,90,95,.12),rgba(255,90,95,.04))',
    p2:'linear-gradient(135deg,rgba(77,255,180,.08),rgba(99,102,241,.08))',
    p3:'linear-gradient(135deg,rgba(245,158,11,.1),rgba(244,63,94,.1))',
    p4:'linear-gradient(135deg,rgba(99,102,241,.1),rgba(77,255,180,.08))',
  };

  return (
    <section className="section" id="projects" ref={ref} style={{ background:'var(--bg2)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Featured <em>Projects</em></h2>
            <p>Real-world full-stack apps built with the MERN stack</p>
          </div>
        </Reveal>

        <div className="filter-row">
          {[['all','All'],['fullstack','Full Stack'],['frontend','Frontend'],['backend','Backend']].map(([k,l]) => (
            <button
              key={k}
              className={`filter-btn hoverable ${filter===k?'on':''}`}
              onClick={() => setFilter(k)}
            >{l}</button>
          ))}
        </div>

        <div className="proj-grid">
          {filtered.map((p, i) => (
            <div
              key={p._id}
              className={`proj-card hoverable ${p.featured && i===0 ? 'featured' : ''}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px) scale(.97)',
                transition: `all .75s cubic-bezier(.16,1,.3,1) ${i*.12}s`,
              }}
            >
              <div className="proj-visual" style={{ background: bgs[p._id]||bgs.p4 }}>
                {mockups[p._id] || <DashMock />}
                {p.featured && i===0 && (
                  <span className="feat-badge">⭐ Featured</span>
                )}
                <div className="proj-overlay">
                  <a href={p.githubUrl||'#'} className="overlay-btn hoverable" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                    GitHub
                  </a>
                  <a href={p.liveUrl||'#'} className="overlay-btn hoverable" target="_blank" rel="noreferrer">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Live Demo
                  </a>
                </div>
              </div>
              <div className="proj-info">
                <div className="proj-top">
                  <span className="proj-num">0{i+1}</span>
                  {p.stats && (
                    <div className="proj-stats">
                      <span>⭐ {p.stats.stars}</span>
                      <span>⑂ {p.stats.forks}</span>
                    </div>
                  )}
                </div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.description}</p>
                <div className="stack-tags">
                  {(p.tags||[]).map(t => <span key={t} className="stack-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BLOG ──────────────────────────────────────────────────────────────────────
function Blog() {
  const [posts, setPosts] = useState(BLOGS);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  useEffect(() => {
    axios.get(`${API}/blog`).then(r => {
      if (r.data?.success && r.data.data?.length) setPosts(r.data.data);
    }).catch(() => {});
  }, []);
  const covers = [
    'linear-gradient(135deg,rgba(77,255,180,.25),rgba(99,102,241,.15))',
    'linear-gradient(135deg,rgba(99,102,241,.25),rgba(244,63,94,.15))',
    'linear-gradient(135deg,rgba(245,158,11,.25),rgba(77,255,180,.15))',
  ];
  const icons = ['⚡','🔒','🚀'];

  return (
    <section className="section" id="blog" ref={ref} style={{ background:'var(--bg)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Blog</span>
            <h2 className="section-title">Dev <em>Articles</em></h2>
            <p>Sharing knowledge about MERN stack, best practices & web dev</p>
          </div>
        </Reveal>
        <div className="blog-grid">
          {posts.map((post, i) => (
            <article
              key={post._id}
              className="blog-card hoverable"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(35px)',
                transition: `all .7s ease ${i*.12}s`,
              }}
            >
              <div className="blog-cover" style={{ background: covers[i%3] }}>
                <div className="blog-icon">{icons[i%3]}</div>
                <div className="blog-cover-shine" />
              </div>
              <div className="blog-body">
                <div className="blog-tags">
                  {(post.tags||[]).slice(0,3).map(t => <span key={t} className="blog-tag">{t}</span>)}
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-foot">
                  <div className="blog-meta">
                    <span>📖 {post.readTime}min</span>
                    <span>👁 {post.views?.toLocaleString()}</span>
                    <span>❤️ {post.likes}</span>
                  </div>
                  <span className="blog-read hoverable">Read →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const [items, setItems] = useState(TESTIMONIALS);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  useEffect(() => {
    axios.get(`${API}/testimonials`).then(r => {
      if (r.data?.success && r.data.data?.length) setItems(r.data.data);
    }).catch(() => {});
  }, []);

  return (
    <section className="section" id="testimonials" ref={ref} style={{ background:'var(--bg2)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Reviews</span>
            <h2 className="section-title">Client <em>Testimonials</em></h2>
            <p>What people say about working with me</p>
          </div>
        </Reveal>
        <div className="testi-grid">
          {items.map((t, i) => (
            <div
              key={t._id}
              className="testi-card hoverable"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(30px)',
                transition: `all .7s ease ${i*.1}s`,
              }}
            >
              <div className="testi-quote">"</div>
              <div className="testi-stars">{'★'.repeat(t.rating||5)}</div>
              <p className="testi-text">"{t.content}"</p>
              <div className="author-row">
                <div className="author-av">{t.name[0]}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role} @ {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      setForm({ name:'', email:'', subject:'', message:'' });
      toast.success('Message sent! I\'ll reply within 24hrs. 🚀');
      setTimeout(() => setSent(false), 5000);
    } catch {
      // Demo mode: simulate success
      setTimeout(() => {
        setSent(true);
        setForm({ name:'', email:'', subject:'', message:'' });
        toast.success('Message sent! (Demo mode) 🚀');
        setTimeout(() => setSent(false), 5000);
        setSending(false);
      }, 1000);
      return;
    }
    setSending(false);
  };

  return (
    <section className="section" id="contact" style={{ background:'var(--bg)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Contact</span>
            <h2 className="section-title">Let's Build<br /><em>Something Great</em></h2>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal direction="left">
            <div className="contact-info">
              <p className="contact-intro">
                Available for freelance, full-time, and collaborations.
                Let's build something amazing together!
              </p>
              {[['📧','Email','fareed@example.com'],
                ['📱','Phone','+92 300 000 0000'],
                ['📍','Location','Pakistan 🇵🇰'],
                ['⏰','Availability','Mon–Sat, 9am–9pm PKT']].map(([icon,label,val]) => (
                <div key={label} className="contact-method hoverable">
                  <div className="c-icon">{icon}</div>
                  <div>
                    <div className="c-label">{label}</div>
                    <div className="c-val">{val}</div>
                  </div>
                </div>
              ))}
              <div className="social-row">
                {[['⑂','GitHub','#'],['in','LinkedIn','#'],['𝕏','Twitter','#']].map(([i,l,u]) => (
                  <a key={l} href={u} className="social-btn hoverable">{i} {l}</a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <div className="f-group">
                  <label className="f-label">Your Name *</label>
                  <input className="f-input" placeholder="John Doe" value={form.name} onChange={update('name')} required />
                </div>
                <div className="f-group">
                  <label className="f-label">Email Address *</label>
                  <input className="f-input" type="email" placeholder="john@co.com" value={form.email} onChange={update('email')} required />
                </div>
              </div>
              <div className="f-group">
                <label className="f-label">Subject</label>
                <input className="f-input" placeholder="Project Collaboration" value={form.subject} onChange={update('subject')} />
              </div>
              <div className="f-group">
                <label className="f-label">Message *</label>
                <textarea className="f-input f-textarea" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={update('message')} required />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary hoverable" disabled={sending}>
                  {sending ? '⏳ Sending...' : '🚀 Send Message'}
                </button>
                {sent && <span className="f-success">✅ Sent! I'll reply soon.</span>}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── BACK TO TOP ───────────────────────────────────────────────────────────────
function BackTop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const s = () => setV(window.scrollY > 500);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);
  if (!v) return null;
  return (
    <button
      className="back-top hoverable"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >↑</button>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const n = t === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', n);
      return n;
    });
  }, []);

  if (!loaded) return <Loader onDone={() => setLoaded(true)} />;

  return (
    <div data-theme={theme}>
      <Cursor />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '.8rem',
          },
        }}
      />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <FLogo size={28} />
              <span><span className="accent">&lt;</span>Fareed<span className="accent">/&gt;</span></span>
            </div>
            <span className="footer-copy">© 2024 Fareed. All rights reserved.</span>
            <span className="footer-copy">Built with ❤️ using MERN Stack 🚀</span>
          </div>
        </div>
      </footer>
      <BackTop />
    </div>
  );
}
