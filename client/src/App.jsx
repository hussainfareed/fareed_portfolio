import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import profileImg from './profile.jpg';
import './styles/global.css';

const GITHUB_USERNAME = 'hussainfareed';

const TECH_MARQUEE = [
  'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript',
  'JWT', 'REST API', 'Generative AI', 'Tailwind CSS', 'Git', 'Vercel',
  'Render', 'Socket.io', 'Mongoose', 'Redux', 'Postman', 'Figma',
];

const PROJECTS = [
  {
    _id: 'p1',
    title: 'StayHub – Airbnb Clone',
    description: 'A full-stack property rental platform inspired by Airbnb. Features include user authentication with JWT, property listings with search & filters, booking management, and a responsive UI built with React. The backend is powered by Node.js and Express with MongoDB as the database.',
    shortDesc: 'Full-stack Airbnb-inspired rental platform with JWT auth, booking system & MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'REST API'],
    githubUrl: 'https://github.com/hussainfareed/stayhub-airbnb',
    liveUrl: 'https://stayhub-ikcr.onrender.com',
    featured: true,
    category: 'fullstack',
    color: 'linear-gradient(135deg,rgba(255,90,95,.15),rgba(255,90,95,.04))',
    icon: '🏠',
    highlights: ['JWT-based authentication with protected routes', 'Property listing with search, filters & pagination', 'Booking system with availability tracking', 'Fully responsive React frontend', 'RESTful API with Express & MongoDB'],
  },
  {
    _id: 'p2',
    title: 'Gen AI – Interview & Resume Report Generator',
    description: 'An AI-powered tool that analyzes resumes and generates detailed interview preparation reports.',
    shortDesc: 'AI-powered resume analyzer that generates personalized interview prep reports.',
    tags: ['React', 'Node.js', 'Generative AI', 'MongoDB', 'Express', 'Vercel'],
    githubUrl: 'https://github.com/hussainfareed/gen-ai-interview',
    liveUrl: 'https://gen-ai-interview-liard.vercel.app/',
    featured: true,
    category: 'fullstack',
    color: 'linear-gradient(135deg,rgba(77,255,180,.1),rgba(99,102,241,.1))',
    icon: '🤖',
    highlights: ['Resume parsing and AI-based analysis', 'Personalized interview question generation', 'Skill gap identification and recommendations', 'Generative AI integration (LLM-powered)', 'Deployed on Vercel with CI/CD'],
  },
  {
    _id: 'p3',
    title: 'AI Code Review Tool',
    description: 'An intelligent code review assistant that analyzes code snippets and provides detailed feedback.',
    shortDesc: 'AI-powered code reviewer that gives smart feedback on quality, bugs & best practices.',
    tags: ['React', 'Node.js', 'AI API', 'MongoDB', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hussainfareed',
    liveUrl: '#',
    featured: true,
    category: 'fullstack',
    color: 'linear-gradient(135deg,rgba(245,158,11,.12),rgba(244,63,94,.08))',
    icon: '🧠',
    highlights: ['AI-powered code analysis and smart suggestions', 'Supports multiple programming languages', 'Bug detection and security vulnerability scanning', 'Performance optimization recommendations', 'Clean and intuitive React UI'],
  },
  {
    _id: 'p4',
    title: 'PhysioElite – Clinic Management Website',
    description: 'A professional full-stack website for a physiotherapy clinic with appointment booking and admin dashboard.',
    shortDesc: 'Full-stack physiotherapy clinic website with appointments, doctor profiles & admin panel.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Netlify'],
    githubUrl: 'https://github.com/hussainfareed/physio-london',
    liveUrl: 'https://papaya-dusk-d96a94.netlify.app',
    featured: false,
    category: 'fullstack',
    color: 'linear-gradient(135deg,rgba(99,102,241,.12),rgba(77,255,180,.08))',
    icon: '🏥',
    highlights: ['Online appointment booking system', 'Doctor and physiotherapist profiles', 'Admin dashboard for clinic management', 'JWT-secured patient login', 'Fully responsive, modern UI'],
  },
];

const BLOGS = [
  { _id: 'b1', title: 'How I Built a Full-Stack Airbnb Clone with MERN', excerpt: 'Deep dive into building a production-ready Airbnb clone using MongoDB, Express, React, and Node.js.', content: `I'm a Computer Engineer and Full Stack MERN Developer from Pakistan who built StayHub.\n\n**The Stack**\nReact for the frontend, Node.js + Express for the backend API, and MongoDB with Mongoose.\n\n**Key Challenges**\nThe trickiest part was handling real-time property availability using atomic MongoDB operations.\n\n**Lessons Learned**\nAlways design your MongoDB schema carefully before writing a single API route.`, tags: ['MERN', 'React', 'Node.js'], readTime: 8, views: 1420, likes: 89, cover: 'linear-gradient(135deg,rgba(77,255,180,.25),rgba(99,102,241,.15))', icon: '⚡' },
  { _id: 'b2', title: 'JWT Authentication in Node.js: The Complete Guide', excerpt: 'Implement secure JWT authentication in Express.js with refresh tokens and production best practices.', content: `JWT are the industry standard for securing REST APIs.\n\n**What is JWT?**\nJWT is a compact token encoding user information in three parts: Header, Payload, and Signature.\n\n**Production Tips**\nUse helmet.js for security headers and express-rate-limit for login routes.`, tags: ['Node.js', 'JWT', 'Security'], readTime: 6, views: 2100, likes: 134, cover: 'linear-gradient(135deg,rgba(99,102,241,.25),rgba(244,63,94,.15))', icon: '🔒' },
  { _id: 'b3', title: 'React Performance: 10 Optimization Techniques', excerpt: 'Make your React apps blazing fast with useMemo, useCallback, lazy loading, and code splitting.', content: `Performance matters. Here are 10 battle-tested techniques.\n\n**1. useMemo for Expensive Calculations**\nWrap heavy operations in useMemo.\n\n**10. Profile Before Optimizing**\nUse React DevTools Profiler to identify real bottlenecks.`, tags: ['React', 'Performance', 'JS'], readTime: 5, views: 980, likes: 67, cover: 'linear-gradient(135deg,rgba(245,158,11,.25),rgba(77,255,180,.15))', icon: '🚀' },
];

const SKILLS = [
  { _id: 's1', name: 'React.js', category: 'frontend', level: 92 },
  { _id: 's2', name: 'JavaScript (ES6+)', category: 'frontend', level: 88 },
  { _id: 's3', name: 'Tailwind CSS', category: 'frontend', level: 85 },
  { _id: 's4', name: 'Redux', category: 'frontend', level: 80 },
  { _id: 's5', name: 'Node.js', category: 'backend', level: 90 },
  { _id: 's6', name: 'Express.js', category: 'backend', level: 88 },
  { _id: 's7', name: 'REST APIs', category: 'backend', level: 93 },
  { _id: 's8', name: 'JWT Auth', category: 'backend', level: 85 },
  { _id: 's9', name: 'MongoDB', category: 'database', level: 87 },
  { _id: 's10', name: 'Mongoose', category: 'database', level: 85 },
  { _id: 's11', name: 'Git/GitHub', category: 'tools', level: 90 },
  { _id: 's12', name: 'Vercel / Render', category: 'tools', level: 82 },
];

// ─── 3D TILT HOOK ──────────────────────────────────────────────────────────────
function useTilt3D(maxTilt = 20) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * maxTilt, ry: (px - 0.5) * maxTilt });
    setGlare({ x: px * 100, y: py * 100, o: 0.28 });
  }, [maxTilt]);
  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
  }, []);
  return { ref, tilt, glare, onMove, onLeave };
}

// ─── SCROLL PROGRESS ───────────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}

// ─── MAGNETIC WRAPPER ──────────────────────────────────────────────────────────
function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div ref={ref} className={`magnetic-wrap ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

// ─── TILT CARD ─────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '', maxTilt = 18, style = {} }) {
  const { ref, tilt, glare, onMove, onLeave } = useTilt3D(maxTilt);
  return (
    <div className="tilt-scene" style={style}>
      <div
        ref={ref}
        className={`tilt-card ${className}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div
          className="tilt-glare"
          style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 55%)`, opacity: glare.o > 0 ? 1 : 0 }}
        />
        {children}
      </div>
    </div>
  );
}

// ─── CURSOR ────────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null), ring = useRef(null), m = useRef({ x: 0, y: 0 }), r = useRef({ x: 0, y: 0 });
  const [big, setBig] = useState(false), [clicking, setClicking] = useState(false);
  useEffect(() => {
    const onMove = (e) => { m.current = { x: e.clientX, y: e.clientY }; if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; } };
    const onDown = () => setClicking(true), onUp = () => setClicking(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    let raf;
    const follow = () => {
      r.current.x += (m.current.x - r.current.x) * 0.1;
      r.current.y += (m.current.y - r.current.y) * 0.1;
      if (ring.current) { ring.current.style.left = r.current.x + 'px'; ring.current.style.top = r.current.y + 'px'; }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mousedown', onDown); document.removeEventListener('mouseup', onUp); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    const on = () => setBig(true), off = () => setBig(false);
    const els = document.querySelectorAll('a, button, .hoverable, .tilt-card, .flip-card');
    els.forEach((el) => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off); });
    return () => els.forEach((el) => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off); });
  });
  return (<><div ref={dot} className={`cursor-dot ${clicking ? 'clicking' : ''}`} /><div ref={ring} className={`cursor-ring ${big ? 'big' : ''} ${clicking ? 'clicking' : ''}`} /></>);
}

// ─── LOADER ────────────────────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [pct, setPct] = useState(0), [phase, setPhase] = useState('loading');
  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(t); setPhase('reveal'); setTimeout(onDone, 800); return 100; }
        return p + Math.random() * 3 + 0.5;
      });
    }, 20);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <div className={`loader-wrap ${phase === 'reveal' ? 'reveal' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo"><FLogo size={80} animated /></div>
        <div className="loader-name">Fareed</div>
        <div className="loader-sub">Computer Engineer & MERN Stack Developer</div>
        <div className="loader-track"><div className="loader-bar" style={{ width: Math.min(pct, 100) + '%' }} /></div>
        <div className="loader-pct">{Math.round(Math.min(pct, 100))}%</div>
      </div>
      <div className="loader-grid" />
    </div>
  );
}

// ─── PROFILE AVATAR ──────────────────────────────────────────────────────────────
function FLogo({ size = 44, animated = false }) {
  return (
    <div className={`f-logo ${animated ? 'f-logo-animated' : ''}`} style={{ width: size, height: size, borderRadius: '50%', padding: 2, background: 'linear-gradient(135deg,#4DFFB4,#6366f1)', boxShadow: '0 0 20px rgba(77,255,180,.4)' }}>
      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg)' }}>
        <img src={profileImg} alt="Fareed Hussain" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
      </div>
    </div>
  );
}

// ─── 3D PROFILE PHOTO (About) ──────────────────────────────────────────────────
function ProfilePhoto3D() {
  const { ref, tilt, glare, onMove, onLeave } = useTilt3D(22);
  const orbitBadges = [
    { label: '⚡ React 18', color: '#4ade80', delay: '0s' },
    { label: '🚀 Node.js v20', color: '#818cf8', delay: '-6.67s' },
    { label: '🍃 MongoDB', color: '#fbbf24', delay: '-13.33s' },
  ];

  return (
    <div className="about-visual">
      <div className="profile-3d-scene tilt-scene">
        <div
          ref={ref}
          className="profile-3d-wrap"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        >
          <div className="profile-depth-layer l3" />
          <div className="profile-depth-layer l2" />
          <div className="profile-depth-layer l1" />
          <div className="profile-holo-ring" />
          <div className="profile-3d-frame">
            <img src={profileImg} alt="Fareed Hussain" />
            <div className="tilt-glare" style={{ borderRadius: 24, background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 50%)`, opacity: glare.o > 0 ? 1 : 0 }} />
          </div>
          <div className="orbit-scene">
            {orbitBadges.map((b) => (
              <div key={b.label} className="orbit-item" style={{ animationDelay: b.delay }}>
                <div className="orbit-item-inner" style={{ color: b.color, borderColor: b.color + '55', background: b.color + '15' }}>
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ENHANCED CANVAS 3D ────────────────────────────────────────────────────────
function Canvas3D({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, raf, angle = 0, mouse = { x: 0, y: 0 };
    const resize = () => { W = c.offsetWidth; H = c.offsetHeight; c.width = W; c.height = H; };
    resize();
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.4,
      col: Math.random() > 0.6 ? '#4DFFB4' : Math.random() > 0.5 ? '#6366f1' : '#f59e0b',
      alpha: Math.random() * 0.5 + 0.2,
      depth: Math.random(),
    }));
    const cubeVerts = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const cubeEdges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const onMouseMove = (e) => {
      const rect = c.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left - W / 2) / W;
      mouse.y = (e.clientY - rect.top - H / 2) / H;
    };
    c.addEventListener('mousemove', onMouseMove);
    const project3D = (x, y, z, cx, cy, sz) => {
      const cosA = Math.cos(angle + mouse.x * 0.6), sinA = Math.sin(angle + mouse.x * 0.6);
      const cosB = Math.cos(mouse.y * 0.4), sinB = Math.sin(mouse.y * 0.4);
      const rx = x * cosA - z * sinA, rz = x * sinA + z * cosA;
      const ry = y * cosB - rz * sinB, rz2 = y * sinB + rz * cosB;
      const sc = 400 / (400 + rz2 + 280);
      return { x: cx + rx * sc * sz, y: cy + ry * sc * sz, sc };
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const mx = mouse.x * W * 0.15, my = mouse.y * H * 0.15;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - (W / 2 + mx), dy = p.y - (H / 2 + my);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) { p.vx += dx / dist * 0.02; p.vy += dy / dist * 0.02; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j], ddx = p.x - q.x, ddy = p.y - q.y, d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 90) { ctx.save(); ctx.globalAlpha = (1 - d / 90) * 0.12; ctx.strokeStyle = '#4DFFB4'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.restore(); }
        }
        ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.col; ctx.shadowBlur = 8; ctx.shadowColor = p.col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      const cubeSize = Math.min(W, H) * 0.2;
      const projected = cubeVerts.map(([x, y, z]) => project3D(x, y, z, cx, cy, cubeSize));
      cubeEdges.forEach(([a, b]) => {
        const pa = projected[a], pb = projected[b];
        ctx.save(); ctx.globalAlpha = Math.min(1, (pa.sc + pb.sc) * 0.45); ctx.strokeStyle = '#4DFFB4'; ctx.lineWidth = 1.5; ctx.shadowBlur = 10; ctx.shadowColor = '#4DFFB4';
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); ctx.restore();
      });
      projected.forEach((p) => { ctx.save(); ctx.fillStyle = '#4DFFB4'; ctx.shadowBlur = 14; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); ctx.restore(); });
      angle += 0.004;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); c.removeEventListener('mousemove', onMouseMove); };
  }, []);
  return <canvas ref={ref} className={`canvas3d ${className}`} />;
}

// ─── TYPING ────────────────────────────────────────────────────────────────────
function Typing({ texts }) {
  const [cur, setCur] = useState(''); const [idx, setIdx] = useState(0); const [del, setDel] = useState(false); const [paused, setPaused] = useState(false);
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
  return (<span className="typing-text"><span className="typing-accent">{cur}</span><span className="cursor-blink">|</span></span>);
}

function Reveal({ children, delay = 0, direction = 'up' }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const transforms = { up: 'translateY(50px)', left: 'translateX(-50px)', right: 'translateX(50px)', scale: 'scale(0.9)' };
  return (<div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : transforms[direction], transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}s, transform .85s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>);
}

function TechMarquee() {
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">{items.map((tech, i) => (<span key={i} className="marquee-item hoverable">{tech}</span>))}</div>
    </div>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false); const [active, setActive] = useState('home'); const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      for (const id of ['contact', 'snapshot', 'blog', 'github', 'projects', 'skills', 'about', 'home']) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['github', 'GitHub'], ['blog', 'Blog'], ['contact', 'Contact']];
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#home" className="nav-logo hoverable"><FLogo size={32} /><span className="logo-text"><span className="logo-bracket">&lt;</span>Fareed<span className="logo-bracket">/&gt;</span></span></a>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map(([id, label]) => (<li key={id}><a href={`#${id}`} className={`nav-link hoverable ${active === id ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{label}{active === id && <span className="nav-dot" />}</a></li>))}
          </ul>
          <div className="nav-right">
            <button className="theme-btn hoverable" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
            <Magnetic><a href="#contact" className="hire-btn hoverable">Hire Me →</a></Magnetic>
            <button className="menu-btn hoverable" onClick={() => setMenuOpen((m) => !m)}><div className={`hamburger ${menuOpen ? 'open' : ''}`}><span /><span /><span /></div></button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const copyEmail = () => { navigator.clipboard.writeText('fareedh109@gmail.com'); toast.success('Email copied! 📧'); };
  return (
    <section className="hero-section" id="home" ref={ref}>
      <div className="hero-bg"><div className="hero-grid" /><div className="hero-glow g1" /><div className="hero-glow g2" /><div className="hero-glow g3" /><Canvas3D className="hero-canvas" /></div>
      <div className="container hero-container">
        <div className={`hero-content ${inView ? 'in' : ''}`}>
          <div className="hero-badge hoverable"><span className="pulse-ring" /><span className="pulse-dot" />Available for Hire &nbsp;🇵🇰 Pakistan</div>
          <h1 className="hero-name"><span className="hero-name-line">Hi, I'm</span><span className="hero-name-main">Fareed</span></h1>
          <div className="hero-role"><Typing texts={['Computer Engineer', 'MERN Stack Developer', 'Full Stack Engineer', 'React.js Expert', 'Node.js Developer', 'AI App Builder']} /></div>
          <p className="hero-desc">I'm a <strong>Computer Engineer</strong> and <strong>MERN Stack Developer</strong> from Pakistan 🇵🇰 — building high-performance, scalable web apps and AI-integrated solutions.</p>
          <div className="hero-cta">
            <Magnetic><a href="#projects" className="btn btn-primary hoverable"><span>View Projects</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></a></Magnetic>
            <Magnetic strength={0.25}><a href="#contact" className="btn btn-outline hoverable">Hire Me</a></Magnetic>
            <a href="https://drive.google.com/file/d/1Y8QugFjSFwJnNRQ309ywFVRnHz6u40-b/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-ghost hoverable">⬇ Resume</a>
            <button className="btn btn-ghost hoverable" onClick={copyEmail}>📧 Copy Email</button>
          </div>
        </div>
        <div className={`hero-visual ${inView ? 'in' : ''}`}>
          <TiltCard maxTilt={16}>
            <div className="hero-card-3d hoverable">
              <div className="hero-card-inner">
                <div className="hero-avatar tilt-depth-2"><FLogo size={72} /></div>
                <div className="hero-card-name tilt-depth-2">Fareed Hussain</div>
                <div className="hero-card-title tilt-depth-1">Computer Engineer & MERN Dev</div>
                <div className="hero-card-badges tilt-depth-1">{['React', 'Node.js', 'MongoDB', 'Express'].map((t) => <span key={t} className="hero-card-badge">{t}</span>)}</div>
                <div className="hero-card-status tilt-depth-3"><span className="status-dot" />Open to Work</div>
              </div>
              <div className="card-shine" />
            </div>
          </TiltCard>
        </div>
      </div>
      <TechMarquee />
      <div className="scroll-hint"><div className="scroll-mouse"><div className="scroll-wheel" /></div><span>Scroll</span></div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section" id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">About Me</span><h2 className="section-title">Computer Engineer &<br /><em>MERN Stack Developer</em></h2></div></Reveal>
        <div className="about-grid">
          <Reveal direction="left"><ProfilePhoto3D /></Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="about-content">
              <h3 className="about-heading">Building the <span className="accent">Future with Code</span></h3>
              <p className="about-text">I'm <strong>Fareed Hussain</strong>, a <strong>Computer Engineer</strong> and <strong>Full Stack MERN Developer</strong> from Pakistan 🇵🇰. I build end-to-end web applications that are fast, secure, and production-ready.</p>
              <p className="about-text">My engineering background combined with <strong>React, Node.js, Express, and MongoDB</strong> expertise lets me deliver clean architecture and exceptional UX. I'm also passionate about <strong>AI integration</strong>.</p>
              <div className="trait-grid">
                {[['⚡', 'Fast Learner'], ['🎯', 'Detail Oriented'], ['🚀', 'Performance First'], ['💡', 'Problem Solver'], ['🔒', 'Security Minded'], ['🤖', 'AI Enthusiast']].map(([icon, label]) => (
                  <div key={label} className="trait hoverable"><span className="trait-icon">{icon}</span><span>{label}</span></div>
                ))}
              </div>
              <div className="about-cta">
                <Magnetic><a href="https://drive.google.com/file/d/1Y8QugFjSFwJnNRQ309ywFVRnHz6u40-b/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-primary hoverable">⬇ Download Resume</a></Magnetic>
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
  const [activeTab, setActiveTab] = useState('frontend');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const cats = [{ k: 'frontend', l: 'Frontend', i: '⚛️' }, { k: 'backend', l: 'Backend', i: '⚡' }, { k: 'database', l: 'Database', i: '🍃' }, { k: 'tools', l: 'Tools', i: '🛠️' }];
  const techCloud = ['Generative AI', 'REST APIs', 'Socket.io', 'Postman', 'Figma', 'Stripe API', 'JWT', 'Mongoose', 'Axios', 'React Router', 'Vite', 'Netlify', 'Render'];
  return (
    <section className="section" id="skills" ref={ref} style={{ background: 'var(--bg)' }}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Tech Stack</span><h2 className="section-title">Skills &amp; <em>Technologies</em></h2></div></Reveal>
        <div className="skills-tabs">{cats.map((cat) => (<button key={cat.k} className={`skill-tab hoverable ${activeTab === cat.k ? 'active' : ''}`} onClick={() => setActiveTab(cat.k)}><span>{cat.i}</span> {cat.l}</button>))}</div>
        <div className="skills-panel">
          {SKILLS.filter((s) => s.category === activeTab).map((sk, i) => (
            <div key={sk._id} className="skill-row" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)', transition: `all .6s ease ${i * 0.08}s` }}>
              <div className="skill-info"><span className="skill-name">{sk.name}</span><span className="skill-pct">{sk.level}%</span></div>
              <div className="skill-track"><div className="skill-fill" style={{ width: inView ? `${sk.level}%` : '0%' }} /><div className="skill-glow" style={{ width: inView ? `${sk.level}%` : '0%' }} /></div>
            </div>
          ))}
        </div>
        <Reveal delay={0.2}><div className="tech-cloud">{techCloud.map((t) => <span key={t} className="tech-tag hoverable">{t}</span>)}</div></Reveal>
      </div>
    </section>
  );
}

// ─── GITHUB STATS ──────────────────────────────────────────────────────────────
function GithubStats({ username = GITHUB_USERNAME }) {
  const [stats, setStats] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = reposRes.ok ? await reposRes.json() : [];
        const totalStars = Array.isArray(repos) ? repos.reduce((s, r) => s + (r.stargazers_count || 0), 0) : 0;
        if (!cancelled) setStats({ repos: data.public_repos || 0, followers: data.followers || 0, following: data.following || 0, stars: totalStars });
      } catch { if (!cancelled) setError(true); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [username]);
  return (
    <section className="section" id="github" ref={ref} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Open Source</span><h2 className="section-title">GitHub <em>Activity</em></h2></div></Reveal>
        {loading && <p style={{ textAlign: 'center', opacity: 0.6 }}>Loading stats…</p>}
        {!loading && error && <p style={{ textAlign: 'center', opacity: 0.6 }}>Visit <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>GitHub profile</a></p>}
        {!loading && !error && stats && (
          <div className="github-stats-grid">
            {[['📦', stats.repos, 'Repositories'], ['⭐', stats.stars, 'Total Stars'], ['👥', stats.followers, 'Followers'], ['🔗', stats.following, 'Following']].map(([icon, val, label], i) => (
              <div key={label} className="github-stat-card hoverable" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `all .6s ease ${i * 0.1}s` }}>
                <div style={{ fontSize: '1.8rem' }}>{icon}</div>
                <div className="github-stat-val">{val}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{label}</div>
              </div>
            ))}
          </div>
        )}
        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <img src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true`} alt="GitHub streak" style={{ maxWidth: '100%', borderRadius: 12 }} onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 3D FLIP PROJECT CARD ──────────────────────────────────────────────────────
function FlipProjectCard({ project, index, inView, onSelect }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip-card-scene" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(40px)', transition: `all .75s cubic-bezier(.16,1,.3,1) ${index * 0.12}s` }}>
      <div className={`flip-card hoverable ${flipped ? 'flipped' : ''}`} onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} onClick={() => onSelect(project)}>
        <div className="flip-face front">
          <div className="flip-visual" style={{ background: project.color }}>
            {project.icon}
            {project.featured && index === 0 && <span className="feat-badge">⭐ Featured</span>}
          </div>
          <div className="proj-info">
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-desc">{project.shortDesc}</p>
            <div className="stack-tags">{project.tags.slice(0, 4).map((t) => <span key={t} className="stack-tag">{t}</span>)}</div>
          </div>
        </div>
        <div className="flip-face back">
          <div>
            <div className="flip-back-title">{project.icon} Key Features</div>
            <ul className="flip-highlights">{project.highlights.slice(0, 4).map((h, i) => <li key={i}>{h}</li>)}</ul>
          </div>
          <div className="flip-actions">
            <button className="btn btn-outline hoverable" style={{ fontSize: '.8rem', padding: '.5rem 1rem' }} onClick={(e) => { e.stopPropagation(); onSelect(project); }}>👁 Details</button>
            <a href={project.githubUrl} className="btn btn-ghost hoverable" style={{ fontSize: '.8rem', padding: '.5rem 1rem' }} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>⑂ GitHub</a>
            {project.liveUrl !== '#' && <a href={project.liveUrl} className="btn btn-primary hoverable" style={{ fontSize: '.8rem', padding: '.5rem 1rem' }} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>🚀 Live</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close hoverable" onClick={onClose}>✕</button>
        <div className="modal-header" style={{ background: project.color, padding: '2rem', display: 'flex', gap: '1.5rem' }}>
          <div style={{ fontSize: '3rem' }}>{project.icon}</div>
          <div><h2 className="modal-title">{project.title}</h2><div className="stack-tags" style={{ marginTop: '.5rem' }}>{project.tags.map((t) => <span key={t} className="stack-tag">{t}</span>)}</div></div>
        </div>
        <div className="modal-body">
          <p className="modal-desc">{project.description}</p>
          <h4 className="modal-sub">✨ Key Features</h4>
          <ul className="modal-highlights">{project.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
          <div className="modal-links">
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline hoverable">⑂ GitHub</a>
            {project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary hoverable">🚀 Live Demo</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('all'); const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <section className="section" id="projects" ref={ref} style={{ background: 'var(--bg)' }}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Portfolio</span><h2 className="section-title">Featured <em>Projects</em></h2><p>Hover to flip — click for full details</p></div></Reveal>
        <div className="filter-row">{[['all', 'All'], ['fullstack', 'Full Stack']].map(([k, l]) => (<button key={k} className={`filter-btn hoverable ${filter === k ? 'on' : ''}`} onClick={() => setFilter(k)}>{l}</button>))}</div>
        <div className="proj-grid">
          {filtered.map((p, i) => (<FlipProjectCard key={p._id} project={p} index={i} inView={inView} onSelect={setSelectedProject} />))}
        </div>
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}

// ─── BLOG ──────────────────────────────────────────────────────────────────────
function BlogModal({ post, onClose }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-blog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close hoverable" onClick={onClose}>✕</button>
        <div className="modal-header" style={{ background: post.cover, padding: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>{post.icon}</div>
          <div><h2 className="modal-title">{post.title}</h2><div style={{ display: 'flex', gap: '1rem', marginTop: '.5rem', fontSize: '.8rem', opacity: 0.8 }}><span>📖 {post.readTime} min</span><span>👁 {post.views.toLocaleString()}</span></div></div>
        </div>
        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) return <h4 key={i} className="modal-sub">{para.replace(/\*\*/g, '')}</h4>;
            return <p key={i} className="modal-desc" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section className="section" id="blog" ref={ref} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Blog</span><h2 className="section-title">Dev <em>Articles</em></h2></div></Reveal>
        <div className="blog-grid">
          {BLOGS.map((post, i) => (
            <article key={post._id} className="blog-card hoverable" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(35px)', transition: `all .7s ease ${i * 0.12}s` }} onClick={() => setSelectedPost(post)}>
              <div className="blog-cover" style={{ background: post.cover }}><div className="blog-icon">{post.icon}</div><div className="blog-cover-shine" /></div>
              <div className="blog-body">
                <div className="blog-tags">{post.tags.map((t) => <span key={t} className="blog-tag">{t}</span>)}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-foot"><div className="blog-meta"><span>📖 {post.readTime}min</span><span>👁 {post.views.toLocaleString()}</span></div><span className="blog-read">Read →</span></div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  );
}

// ─── SNAPSHOT 3D CARD ──────────────────────────────────────────────────────────
function TiltInfoCard() {
  const { ref, tilt, glare, onMove, onLeave } = useTilt3D(24);
  const { ref: secRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const stats = [['4+', 'Projects Shipped'], ['90%+', 'Skill Proficiency'], ['12+', 'Technologies'], ['24hr', 'Reply Time']];
  return (
    <section className="section" id="snapshot" ref={secRef} style={{ background: 'var(--bg)' }}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">At a Glance</span><h2 className="section-title">My <em>Snapshot</em></h2><p>Move your mouse over the card 👇</p></div></Reveal>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(40px)', transition: 'all .8s cubic-bezier(.16,1,.3,1)', maxWidth: 620, margin: '0 auto' }}>
          <div className="tilt-scene">
            <div ref={ref} className="snapshot-card hoverable" onMouseMove={onMove} onMouseLeave={onLeave} style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}>
              <div className="tilt-glare" style={{ borderRadius: 24, background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 55%)`, opacity: glare.o > 0 ? 1 : 0 }} />
              <div style={{ transform: 'translateZ(40px)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-block', marginBottom: '1rem' }}><FLogo size={72} /></div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Fareed Hussain</h3>
                <p style={{ opacity: 0.75, margin: '0.35rem 0 1.5rem' }}>Computer Engineer & MERN Stack Developer · Pakistan 🇵🇰</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem', transform: 'translateZ(20px)' }}>
                  {stats.map(([val, label]) => (<div key={label} className="snapshot-stat"><div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>{val}</div><div style={{ fontSize: '.72rem', opacity: 0.7, marginTop: '.25rem' }}>{label}</div></div>))}
                </div>
                <div style={{ marginTop: '1.75rem', transform: 'translateZ(30px)' }}>
                  <Magnetic><a href="#contact" className="btn btn-primary hoverable">Let's Work Together →</a></Magnetic>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false); const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSending(true); setTimeout(() => { setSent(true); setForm({ name: '', email: '', subject: '', message: '' }); toast.success("Message sent! I'll reply within 24hrs. 🚀"); setTimeout(() => setSent(false), 5000); setSending(false); }, 1000); };
  return (
    <section className="section" id="contact" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Contact</span><h2 className="section-title">Let's Build<br /><em>Something Great</em></h2></div></Reveal>
        <div className="contact-grid">
          <Reveal direction="left">
            <div className="contact-info">
              <p className="contact-intro">Available for freelance, full-time, and collaborations.</p>
              {[['📧', 'Email', 'fareedh109@gmail.com'], ['📱', 'Phone', '+92 304 8093502'], ['📍', 'Location', 'Pakistan 🇵🇰'], ['⏰', 'Availability', 'Mon–Sat, 9am–9pm PKT']].map(([icon, label, val]) => (
                <div key={label} className="contact-method hoverable"><div className="c-icon">{icon}</div><div><div className="c-label">{label}</div><div className="c-val">{val}</div></div></div>
              ))}
              <div className="social-row">
                <a href="https://github.com/hussainfareed" target="_blank" rel="noreferrer" className="social-btn hoverable">⑂ GitHub</a>
                <a href="https://www.linkedin.com/in/fareed-hussain-2765092a6/" target="_blank" rel="noreferrer" className="social-btn hoverable">in LinkedIn</a>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="contact-form">
              <div className="form-row">
                <div className="f-group"><label className="f-label">Your Name *</label><input className="f-input" placeholder="John Doe" value={form.name} onChange={update('name')} required /></div>
                <div className="f-group"><label className="f-label">Email *</label><input className="f-input" type="email" placeholder="john@co.com" value={form.email} onChange={update('email')} required /></div>
              </div>
              <div className="f-group"><label className="f-label">Subject</label><input className="f-input" placeholder="Project Collaboration" value={form.subject} onChange={update('subject')} /></div>
              <div className="f-group"><label className="f-label">Message *</label><textarea className="f-input f-textarea" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={update('message')} required /></div>
              <div className="form-actions">
                <Magnetic><button className="btn btn-primary hoverable" disabled={sending} onClick={submit}>{sending ? '⏳ Sending...' : '🚀 Send Message'}</button></Magnetic>
                {sent && <span className="f-success">✅ Sent!</span>}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BackTop() {
  const [v, setV] = useState(false);
  useEffect(() => { const s = () => setV(window.scrollY > 500); window.addEventListener('scroll', s); return () => window.removeEventListener('scroll', s); }, []);
  if (!v) return null;
  return <button className="back-top hoverable" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');
  const toggleTheme = useCallback(() => { setTheme((t) => { const n = t === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', n); return n; }); }, []);

  if (!loaded) return <Loader onDone={() => setLoaded(true)} />;

  return (
    <div data-theme={theme}>
      <ScrollProgress />
      <Cursor />
      <Toaster position="bottom-right" toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '.8rem' } }} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GithubStats username={GITHUB_USERNAME} />
        <Blog />
        <TiltInfoCard />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo"><FLogo size={28} /><span><span className="accent">&lt;</span>Fareed<span className="accent">/&gt;</span></span></div>
            <span className="footer-copy">© Fareed Hussain. All rights reserved.</span>
            <span className="footer-copy">Built with ❤️ using MERN Stack 🚀</span>
          </div>
        </div>
      </footer>
      <BackTop />
    </div>
  );
}
