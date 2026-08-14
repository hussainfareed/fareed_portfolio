import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import profileImg from './profile.jpg';
import './styles/global.css';

// ─── GITHUB CONFIG ───────────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'hussainfareed';

// ─── PROJECTS DATA ─────────────────────────────────────────────────────────────
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
    // Add real screenshots here (e.g. imported from src/assets/projects/stayhub-1.png).
    // Card auto-slides through these on hover. Leave empty to fall back to the icon tile.
    images: [],
    video: '', // optional: path/URL to a short muted screen-recording (mp4/webm) — takes priority over generated mockup
    mockupKind: 'listing',
    accent1: '#FF5A5F',
    accent2: '#FFB4B7',
    highlights: [
      'JWT-based authentication with protected routes',
      'Property listing with search, filters & pagination',
      'Booking system with availability tracking',
      'Fully responsive React frontend',
      'RESTful API with Express & MongoDB',
    ],
  },
  {
    _id: 'p2',
    title: 'Gen AI – Interview & Resume Report Generator',
    description: 'An AI-powered tool that analyzes resumes and generates detailed interview preparation reports. Users can upload their resume and receive personalized feedback, potential interview questions, skill gap analysis, and improvement suggestions powered by Generative AI.',
    shortDesc: 'AI-powered resume analyzer that generates personalized interview prep reports.',
    tags: ['React', 'Node.js', 'Generative AI', 'MongoDB', 'Express', 'Vercel'],
    githubUrl: 'https://github.com/hussainfareed/gen-ai-interview',
    liveUrl: 'https://gen-ai-interview-liard.vercel.app/',
    featured: true,
    category: 'fullstack',
    color: 'linear-gradient(135deg,rgba(77,255,180,.1),rgba(99,102,241,.1))',
    icon: '🤖',
    images: [],
    video: '',
    mockupKind: 'chat',
    accent1: '#4DFFB4',
    accent2: '#6366f1',
    highlights: [
      'Resume parsing and AI-based analysis',
      'Personalized interview question generation',
      'Skill gap identification and recommendations',
      'Generative AI integration (LLM-powered)',
      'Deployed on Vercel with CI/CD',
    ],
  },
  {
    _id: 'p3',
    title: 'AI Code Review Tool',
    description: 'An intelligent code review assistant that analyzes code snippets and provides detailed feedback on code quality, potential bugs, security vulnerabilities, performance improvements, and best practices. Built with MERN stack and integrated with AI APIs for smart suggestions.',
    shortDesc: 'AI-powered code reviewer that gives smart feedback on quality, bugs & best practices.',
    tags: ['React', 'Node.js', 'AI API', 'MongoDB', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hussainfareed',
    liveUrl: '#',
    featured: true,
    category: 'fullstack',
    color: 'linear-gradient(135deg,rgba(245,158,11,.12),rgba(244,63,94,.08))',
    icon: '🧠',
    images: [],
    video: '',
    mockupKind: 'code',
    accent1: '#f59e0b',
    accent2: '#f43f5e',
    highlights: [
      'AI-powered code analysis and smart suggestions',
      'Supports multiple programming languages',
      'Bug detection and security vulnerability scanning',
      'Performance optimization recommendations',
      'Clean and intuitive React UI',
    ],
  },
  {
    _id: 'p4',
    title: 'PhysioElite – Clinic Management Website',
    description: 'A professional full-stack website for a physiotherapy clinic. Features include appointment booking, doctor and physiotherapist profiles, service listings, patient management, and an admin dashboard. Built with the MERN stack and deployed on Netlify.',
    shortDesc: 'Full-stack physiotherapy clinic website with appointments, doctor profiles & admin panel.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Netlify'],
    githubUrl: 'https://github.com/hussainfareed/physio-london',
    liveUrl: 'https://papaya-dusk-d96a94.netlify.app',
    featured: false,
    category: 'fullstack',
    color: 'linear-gradient(135deg,rgba(99,102,241,.12),rgba(77,255,180,.08))',
    icon: '🏥',
    images: [],
    video: '',
    mockupKind: 'booking',
    accent1: '#6366f1',
    accent2: '#4DFFB4',
    highlights: [
      'Online appointment booking system',
      'Doctor and physiotherapist profiles',
      'Admin dashboard for clinic management',
      'JWT-secured patient login',
      'Fully responsive, modern UI',
    ],
  },
];

// ─── BLOG DATA ─────────────────────────────────────────────────────────────────
const BLOGS = [
  {
    _id: 'b1',
    title: 'How I Built a Full-Stack Airbnb Clone with MERN',
    excerpt: 'Deep dive into building a production-ready Airbnb clone using MongoDB, Express, React, and Node.js with JWT authentication and real-time booking.',
    content: `I'm a Computer Engineer and Full Stack MERN Developer from Pakistan who built StayHub — a production-ready Airbnb clone. Here's everything I learned.

**The Stack**
React for the frontend, Node.js + Express for the backend API, and MongoDB with Mongoose for the database. JWT handles authentication throughout.

**Key Challenges**
The trickiest part was handling real-time property availability — making sure two users couldn't book the same property for the same dates simultaneously. I solved this using atomic MongoDB operations and careful schema design.

**Authentication Flow**
JWT-based auth with refresh tokens was implemented end-to-end. Protected routes exist on both the frontend (React Router guards) and backend (Express middleware), ensuring only authenticated users can create listings or book properties.

**Database Schema**
MongoDB shines here. Each listing document contains nested availability arrays, owner references, and image metadata. Mongoose middleware handles pre-save validations automatically.

**Deployment**
The backend is hosted on Render (free tier), the frontend on Vercel. Environment variables are managed securely and MongoDB Atlas serves as the cloud database with IP whitelisting.

**Lessons Learned**
Always design your MongoDB schema carefully before writing a single API route. Use Postman to test every endpoint before connecting the frontend. And never skip error handling — users will find every edge case you missed.`,
    tags: ['MERN', 'React', 'Node.js'],
    readTime: 8,
    views: 1420,
    likes: 89,
    cover: 'linear-gradient(135deg,rgba(77,255,180,.25),rgba(99,102,241,.15))',
    icon: '⚡',
  },
  {
    _id: 'b2',
    title: 'JWT Authentication in Node.js: The Complete Guide',
    excerpt: 'Implement secure JWT authentication in Express.js with refresh tokens, middleware, and production best practices for secure APIs.',
    content: `JWT (JSON Web Tokens) are the industry standard for securing REST APIs. Here's everything you need to implement rock-solid authentication in your Node.js apps.

**What is JWT?**
JWT is a compact, URL-safe token encoding user information in three parts: Header, Payload, and Signature. The server signs it; the client sends it with every request in the Authorization header.

**Setting Up**
Install jsonwebtoken and bcryptjs. Store your JWT_SECRET in .env — never hardcode secrets in your codebase.

**The Auth Flow**
User registers → password is hashed with bcrypt → saved to MongoDB. User logs in → password verified → JWT issued (short-lived access token + long-lived refresh token). Protected routes → middleware verifies JWT → user gets access to data.

**Refresh Tokens**
Access tokens should expire in 15 minutes for security. Refresh tokens last 7 days and are used to silently issue new access tokens without forcing re-login. Store refresh tokens in httpOnly cookies — never localStorage.

**Middleware Pattern**
Create a reusable authenticate middleware that verifies the token, decodes the payload, attaches the user to req.user, and calls next(). Apply it to any route that needs protection.

**Common Mistakes**
Never store JWTs in localStorage — use httpOnly cookies instead. Always validate token expiry on the server. Rotate refresh tokens on every use. Implement token blacklisting for logout.

**Production Tips**
Use helmet.js for security headers, express-rate-limit for login routes, and always log failed authentication attempts for monitoring.`,
    tags: ['Node.js', 'JWT', 'Security'],
    readTime: 6,
    views: 2100,
    likes: 134,
    cover: 'linear-gradient(135deg,rgba(99,102,241,.25),rgba(244,63,94,.15))',
    icon: '🔒',
  },
  {
    _id: 'b3',
    title: 'React Performance: 10 Optimization Techniques',
    excerpt: 'Make your React apps blazing fast with useMemo, useCallback, lazy loading, code splitting, and advanced bundle optimization tricks.',
    content: `Performance matters. A slow React app loses users. Here are 10 battle-tested techniques I use in every production project.

**1. useMemo for Expensive Calculations**
Wrap computationally heavy operations in useMemo so they only recompute when dependencies change. Don't overuse it — memoization has its own cost.

**2. useCallback for Stable References**
Prevent child components from re-rendering unnecessarily by memoizing callback functions with useCallback. Essential when passing callbacks to memoized children.

**3. React.lazy + Suspense for Code Splitting**
Split your bundle and lazy-load components not needed on initial render. This can cut your initial load time by 40–60%.

**4. Virtualization for Long Lists**
Use react-window or TanStack Virtual for lists with hundreds of items. Never render all items at once — only what's in the viewport.

**5. Avoid Anonymous Functions in JSX**
Define handlers outside JSX to prevent recreation on every render. Arrow functions in JSX create new function references each time.

**6. Key Props Done Right**
Never use array index as key for dynamic lists. Use unique, stable IDs from your data to help React's diffing algorithm.

**7. State Colocation**
Keep state as close to where it's used as possible. Lifting state unnecessarily causes cascading re-renders across your component tree.

**8. React.memo for Pure Components**
Wrap components that receive the same props frequently with React.memo to skip unnecessary re-renders.

**9. Debounce Input Handlers**
For search inputs and filters, debounce the API call by 300–500ms to avoid excessive requests on every keystroke.

**10. Profile Before Optimizing**
Use React DevTools Profiler to record renders and identify real bottlenecks. Fix them with data — not guesses. Premature optimization is the root of all evil.`,
    tags: ['React', 'Performance', 'JS'],
    readTime: 5,
    views: 980,
    likes: 67,
    cover: 'linear-gradient(135deg,rgba(245,158,11,.25),rgba(77,255,180,.15))',
    icon: '🚀',
  },
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

// ─── CURSOR ────────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null), ring = useRef(null), m = useRef({ x:0, y:0 }), r = useRef({ x:0, y:0 });
  const [big, setBig] = useState(false), [clicking, setClicking] = useState(false);
  useEffect(() => {
    const onMove = e => { m.current = { x: e.clientX, y: e.clientY }; if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; } };
    const onDown = () => setClicking(true), onUp = () => setClicking(false);
    document.addEventListener('mousemove', onMove); document.addEventListener('mousedown', onDown); document.addEventListener('mouseup', onUp);
    let raf;
    const follow = () => { r.current.x += (m.current.x - r.current.x) * 0.08; r.current.y += (m.current.y - r.current.y) * 0.08; if (ring.current) { ring.current.style.left = r.current.x + 'px'; ring.current.style.top = r.current.y + 'px'; } raf = requestAnimationFrame(follow); };
    raf = requestAnimationFrame(follow);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mousedown', onDown); document.removeEventListener('mouseup', onUp); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    const on = () => setBig(true), off = () => setBig(false);
    const els = document.querySelectorAll('a, button, .hoverable');
    els.forEach(el => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off); });
    return () => els.forEach(el => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off); });
  });
  return (<><div ref={dot} className={`cursor-dot ${clicking ? 'clicking' : ''}`} /><div ref={ring} className={`cursor-ring ${big ? 'big' : ''} ${clicking ? 'clicking' : ''}`} /></>);
}

// ─── LOADER ────────────────────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [pct, setPct] = useState(0), [phase, setPhase] = useState('loading');
  useEffect(() => {
    const t = setInterval(() => { setPct(p => { if (p >= 100) { clearInterval(t); setPhase('reveal'); setTimeout(onDone, 800); return 100; } return p + Math.random() * 3 + 0.5; }); }, 20);
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

// ─── FLOGO (now shows profile photo instead of the "F" mark) ──────────────────
function FLogo({ size = 44, animated = false }) {
  return (
    <div
      className={`f-logo ${animated ? 'f-logo-animated' : ''}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        padding: 2,
        background: 'linear-gradient(135deg,#4DFFB4,#6366f1)',
        boxShadow: '0 0 18px rgba(77,255,180,.35)',
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg,#0a0a12)' }}>
        <img
          src={profileImg}
          alt="Fareed Hussain"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
        />
      </div>
    </div>
  );
}

// ─── CANVAS 3D ─────────────────────────────────────────────────────────────────
function Canvas3D({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let W, H, raf, angle = 0, angleY = 0, mouse = { x: 0, y: 0 };
    const resize = () => { W = c.offsetWidth; H = c.offsetHeight; c.width = W; c.height = H; };
    resize();
    const particles = Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.8 + .3, col: Math.random() > .6 ? '#4DFFB4' : Math.random() > .5 ? '#6366f1' : '#f59e0b', alpha: Math.random() * .5 + .3 }));
    const cubeVerts = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const cubeEdges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const spherePts = []; for (let i = 0; i < 180; i++) { const phi = Math.acos(1 - 2*i/180), theta = Math.PI*(1+Math.sqrt(5))*i; spherePts.push([Math.sin(phi)*Math.cos(theta), Math.cos(phi), Math.sin(phi)*Math.sin(theta)]); }
    const onMouseMove = e => { const rect = c.getBoundingClientRect(); mouse.x = (e.clientX-rect.left-W/2)/W; mouse.y = (e.clientY-rect.top-H/2)/H; };
    c.addEventListener('mousemove', onMouseMove);
    const project3D = (x,y,z,cx,cy,sz) => { const cosA=Math.cos(angle+mouse.x*.5),sinA=Math.sin(angle+mouse.x*.5),cosB=Math.cos(angleY+mouse.y*.3),sinB=Math.sin(angleY+mouse.y*.3),rx=x*cosA-z*sinA,rz=x*sinA+z*cosA,ry=y*cosB-rz*sinB,rz2=y*sinB+rz*cosB,sc=380/(380+rz2+250); return {x:cx+rx*sc*sz,y:cy+ry*sc*sz,z:rz2,sc}; };
    const draw = () => {
      ctx.clearRect(0,0,W,H); const cx=W/2,cy=H/2;
      for (let i=0;i<particles.length;i++) { const p=particles[i]; p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1; for(let j=i+1;j<particles.length;j++){const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){ctx.save();ctx.globalAlpha=(1-d/100)*.1;ctx.strokeStyle='#4DFFB4';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.restore();}} ctx.save();ctx.globalAlpha=p.alpha;ctx.fillStyle=p.col;ctx.shadowBlur=6;ctx.shadowColor=p.col;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.restore(); }
      const cubeSize=Math.min(W,H)*.18,projected=cubeVerts.map(([x,y,z])=>project3D(x,y,z,cx,cy,cubeSize));
      cubeEdges.forEach(([a,b])=>{const pa=projected[a],pb=projected[b],alpha=Math.min(1,(pa.sc+pb.sc)*.4);ctx.save();ctx.globalAlpha=alpha*.7;ctx.strokeStyle='#4DFFB4';ctx.lineWidth=1.5;ctx.shadowBlur=8;ctx.shadowColor='#4DFFB4';ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.stroke();ctx.restore();});
      projected.forEach(p=>{ctx.save();ctx.fillStyle='#4DFFB4';ctx.shadowBlur=12;ctx.shadowColor='#4DFFB4';ctx.globalAlpha=.9;ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,Math.PI*2);ctx.fill();ctx.restore();});
      const sphSize=Math.min(W,H)*.14,sphCx=cx+W*.28,sphCy=cy-H*.15,sphPts=spherePts.map(([x,y,z])=>project3D(x,y,z,sphCx,sphCy,sphSize));
      sphPts.forEach((p,i)=>{if(i%3!==0)return;ctx.save();ctx.globalAlpha=Math.max(0,p.sc)*.35;ctx.fillStyle='#6366f1';ctx.shadowBlur=4;ctx.shadowColor='#6366f1';ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fill();ctx.restore();});
      angle+=.005;angleY+=.003;raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw); window.addEventListener('resize',resize);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);c.removeEventListener('mousemove',onMouseMove);};
  },[]);
  return <canvas ref={ref} className={`canvas3d ${className}`} />;
}

// ─── TYPING ────────────────────────────────────────────────────────────────────
function Typing({ texts }) {
  const [cur,setCur]=useState('');const [idx,setIdx]=useState(0);const [del,setDel]=useState(false);const [paused,setPaused]=useState(false);
  useEffect(()=>{if(paused)return;const text=texts[idx];const delay=del?35:cur.length===text.length?2500:75;const t=setTimeout(()=>{if(!del){if(cur.length<text.length)setCur(text.slice(0,cur.length+1));else{setPaused(true);setTimeout(()=>{setPaused(false);setDel(true);},2000);}}else{if(cur.length>0)setCur(text.slice(0,cur.length-1));else{setDel(false);setIdx((idx+1)%texts.length);}}},delay);return()=>clearTimeout(t);},[cur,del,idx,texts,paused]);
  return (<span className="typing-text"><span className="typing-accent">{cur}</span><span className="cursor-blink">|</span></span>);
}

// ─── REVEAL ────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up' }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const transforms = { up:'translateY(50px)', left:'translateX(-50px)', right:'translateX(50px)', scale:'scale(0.9)' };
  return (<div ref={ref} style={{ opacity:inView?1:0, transform:inView?'none':transforms[direction], transition:`opacity .85s cubic-bezier(.16,1,.3,1) ${delay}s, transform .85s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>);
}

// ─── FLOAT BADGE ───────────────────────────────────────────────────────────────
function FloatBadge({ children, style, color, delay = 0 }) {
  return (<div className="float-badge hoverable" style={{ ...style, color, borderColor:color+'44', background:color+'11', animationDelay:delay+'s' }}>{children}</div>);
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ theme, toggleTheme }) {
  const [scrolled,setScrolled]=useState(false);const [active,setActive]=useState('home');const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{const h=()=>{setScrolled(window.scrollY>60);const ids=['contact','snapshot','blog','github','projects','skills','about','home'];for(const id of ids){const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-200){setActive(id);break;}}};window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  const links=[['home','Home'],['about','About'],['skills','Skills'],['projects','Projects'],['github','GitHub'],['blog','Blog'],['contact','Contact']];
  return (
    <nav className={`navbar ${scrolled?'scrolled':''}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#home" className="nav-logo hoverable"><FLogo size={32}/><span className="logo-text"><span className="logo-bracket">&lt;</span>Fareed<span className="logo-bracket">/&gt;</span></span></a>
          <ul className={`nav-links ${menuOpen?'open':''}`}>
            {links.map(([id,label])=>(<li key={id}><a href={`#${id}`} className={`nav-link hoverable ${active===id?'active':''}`} onClick={()=>setMenuOpen(false)}>{label}{active===id&&<span className="nav-dot"/>}</a></li>))}
          </ul>
          <div className="nav-right">
            <button className="theme-btn hoverable" onClick={toggleTheme} title="Toggle theme">{theme==='dark'?'☀️':'🌙'}</button>
            <a href="#contact" className="hire-btn hoverable">Hire Me →</a>
            <button className="menu-btn hoverable" onClick={()=>setMenuOpen(m=>!m)}><div className={`hamburger ${menuOpen?'open':''}`}><span/><span/><span/></div></button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { ref, inView } = useInView({ threshold:0.1, triggerOnce:true });
  return (
    <section className="hero-section" id="home" ref={ref}>
      <div className="hero-bg"><div className="hero-grid"/><div className="hero-glow g1"/><div className="hero-glow g2"/><div className="hero-glow g3"/><Canvas3D className="hero-canvas"/></div>
      <div className="container hero-container">
        <div className={`hero-content ${inView?'in':''}`}>
          <div className="hero-badge hoverable"><span className="pulse-ring"/><span className="pulse-dot"/>Available for Hire &nbsp;🇵🇰 Pakistan</div>
          <h1 className="hero-name"><span className="hero-name-line">Hi, I'm</span><span className="hero-name-main">Fareed</span></h1>
          <div className="hero-role"><Typing texts={['Computer Engineer','MERN Stack Developer','Full Stack Engineer','React.js Expert','Node.js Developer','AI App Builder']}/></div>
          <p className="hero-desc">I'm a <strong>Computer Engineer</strong> and <strong>MERN Stack Developer</strong> from Pakistan 🇵🇰 — building high-performance, scalable web apps and AI-integrated solutions that turn complex problems into elegant digital products.</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary hoverable"><span>View Projects</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></a>
            <a href="#contact" className="btn btn-outline hoverable">Hire Me</a>
            <a href="https://drive.google.com/file/d/1Y8QugFjSFwJnNRQ309ywFVRnHz6u40-b/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-ghost hoverable">⬇ Resume</a>
          </div>
        </div>
        <div className={`hero-visual ${inView?'in':''}`}>
          <div className="hero-card-3d hoverable">
            <div className="hero-card-inner">
              <div className="hero-avatar"><FLogo size={64}/></div>
              <div className="hero-card-name">Fareed</div>
              <div className="hero-card-title">Computer Engineer & MERN Dev</div>
              <div className="hero-card-badges">{['React','Node.js','MongoDB','Express'].map(t=><span key={t} className="hero-card-badge">{t}</span>)}</div>
              <div className="hero-card-status"><span className="status-dot"/>Open to Work</div>
            </div>
            <div className="card-shine"/>
          </div>
          <FloatBadge style={{top:'-1rem',left:'-2rem'}} color="#4ade80" delay={0}>🍃 MongoDB</FloatBadge>
          <FloatBadge style={{top:'30%',right:'-2.5rem'}} color="#60a5fa" delay={0.4}>⚛️ React 18</FloatBadge>
          <FloatBadge style={{bottom:'25%',left:'-2.5rem'}} color="#818cf8" delay={0.8}>🟢 Node.js</FloatBadge>
          <FloatBadge style={{bottom:'-1rem',right:'1rem'}} color="#fbbf24" delay={1.2}>⚡ Express</FloatBadge>
        </div>
      </div>
      <div className="scroll-hint"><div className="scroll-mouse"><div className="scroll-wheel"/></div><span>Scroll</span></div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section" id="about" style={{background:'var(--bg2)'}}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">About Me</span><h2 className="section-title">Computer Engineer &<br/><em>MERN Stack Developer</em></h2></div></Reveal>
        <div className="about-grid">
          <Reveal direction="left">
            <div className="about-visual">
              <div className="about-avatar hoverable"><div className="avatar-glow"/><FLogo size={96} animated/><div className="avatar-ring r1"/><div className="avatar-ring r2"/><div className="avatar-ring r3"/></div>
              <FloatBadge style={{top:'0',right:'-1rem'}} color="#4ade80" delay={0}>⚡ React 18 Ready</FloatBadge>
              <FloatBadge style={{bottom:'3rem',left:'-1rem'}} color="#818cf8" delay={0.6}>🚀 Node.js v20</FloatBadge>
              <FloatBadge style={{bottom:'-1rem',right:'2rem'}} color="#fbbf24" delay={1.2}>🍃 MongoDB Atlas</FloatBadge>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="about-content">
              <h3 className="about-heading">Building the <span className="accent">Future with Code</span></h3>
              <p className="about-text">I'm <strong>Fareed Hussain</strong>, a <strong>Computer Engineer</strong> and <strong>Full Stack MERN Developer</strong> from Pakistan 🇵🇰. With a solid engineering foundation combined with hands-on MERN expertise, I build end-to-end web applications that are fast, secure, and production-ready.</p>
              <p className="about-text">My computer engineering background gives me a deep understanding of systems, algorithms, and software design — which I combine with modern technologies like <strong>React, Node.js, Express, and MongoDB</strong>. I'm also passionate about <strong>AI integration</strong>, having built tools powered by Generative AI to solve real-world problems.</p>
              <p className="about-text">Whether it's a full-stack rental platform, an AI-powered resume analyzer, or a clinic management system — I bring the same commitment: <strong>clean architecture, great performance, and exceptional UX</strong>.</p>
              <div className="trait-grid">
                {[['⚡','Fast Learner'],['🎯','Detail Oriented'],['🚀','Performance First'],['💡','Problem Solver'],['🔒','Security Minded'],['🤖','AI Enthusiast']].map(([icon,label])=>(<div key={label} className="trait hoverable"><span className="trait-icon">{icon}</span><span>{label}</span></div>))}
              </div>
              <div className="about-cta">
                <a href="https://drive.google.com/file/d/1Y8QugFjSFwJnNRQ309ywFVRnHz6u40-b/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-primary hoverable">⬇ Download Resume</a>
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
  const [activeTab,setActiveTab]=useState('frontend');
  const { ref, inView } = useInView({ threshold:0.1, triggerOnce:true });
  const cats=[{k:'frontend',l:'Frontend',i:'⚛️'},{k:'backend',l:'Backend',i:'⚡'},{k:'database',l:'Database',i:'🍃'},{k:'tools',l:'Tools',i:'🛠️'}];
  const techCloud=['Generative AI','REST APIs','Socket.io','Postman','Figma','Stripe API','JWT','bcrypt','Mongoose','Axios','React Router','Vite','Netlify','Render'];
  return (
    <section className="section" id="skills" ref={ref} style={{background:'var(--bg)'}}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Tech Stack</span><h2 className="section-title">Skills &amp; <em>Technologies</em></h2><p>My full toolkit as a Computer Engineer and MERN Stack Developer</p></div></Reveal>
        <div className="skills-tabs">{cats.map(cat=>(<button key={cat.k} className={`skill-tab hoverable ${activeTab===cat.k?'active':''}`} onClick={()=>setActiveTab(cat.k)}><span>{cat.i}</span> {cat.l}</button>))}</div>
        <div className="skills-panel">
          {SKILLS.filter(s=>s.category===activeTab).map((sk,i)=>(
            <div key={sk._id} className="skill-row" style={{opacity:inView?1:0,transform:inView?'none':'translateX(-30px)',transition:`all .6s ease ${i*.08}s`}}>
              <div className="skill-info"><span className="skill-name">{sk.name}</span><span className="skill-pct">{sk.level}%</span></div>
              <div className="skill-track"><div className="skill-fill" style={{width:inView?`${sk.level}%`:'0%'}}/><div className="skill-glow" style={{width:inView?`${sk.level}%`:'0%'}}/></div>
            </div>
          ))}
        </div>
        <Reveal delay={0.2}><div className="tech-cloud">{techCloud.map(t=><span key={t} className="tech-tag hoverable">{t}</span>)}</div></Reveal>
      </div>
    </section>
  );
}

// ─── GITHUB STATS ──────────────────────────────────────────────────────────────
function GithubStats({ username = GITHUB_USERNAME }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('user fetch failed');
        const data = await res.json();
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = reposRes.ok ? await reposRes.json() : [];
        const totalStars = Array.isArray(repos) ? repos.reduce((s, r) => s + (r.stargazers_count || 0), 0) : 0;
        if (!cancelled) {
          setStats({
            repos: data.public_repos || 0,
            followers: data.followers || 0,
            following: data.following || 0,
            stars: totalStars,
          });
        }
      } catch (e) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  return (
    <section className="section" id="github" ref={ref} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Open Source</span>
            <h2 className="section-title">GitHub <em>Activity</em></h2>
            <p>Live stats pulled directly from my GitHub profile</p>
          </div>
        </Reveal>

        {loading && <p style={{ textAlign: 'center', opacity: 0.6 }}>Loading stats…</p>}
        {!loading && error && (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>
            Couldn't load live stats right now — visit my{' '}
            <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="hoverable" style={{ color: 'var(--accent,#4DFFB4)' }}>
              GitHub profile
            </a>{' '}
            directly.
          </p>
        )}
        {!loading && !error && stats && (
          <div className="github-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1rem', maxWidth: '700px', margin: '0 auto' }}>
            {[
              ['📦', stats.repos, 'Repositories'],
              ['⭐', stats.stars, 'Total Stars'],
              ['👥', stats.followers, 'Followers'],
              ['🔗', stats.following, 'Following'],
            ].map(([icon, val, label], i) => (
              <div
                key={label}
                className="hoverable"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(20px)',
                  transition: `all .6s ease ${i * 0.1}s`,
                  background: 'var(--surface,#1a1a2e)',
                  border: '1px solid var(--border,rgba(255,255,255,.08))',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.8rem' }}>{icon}</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent,#4DFFB4)' }}>{val}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true`}
              alt="GitHub streak stats"
              style={{ maxWidth: '100%', borderRadius: '12px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PROJECT MODAL ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(()=>{document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';};},[]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <button className="modal-close hoverable" onClick={onClose}>✕</button>
        <div className="modal-header" style={{background:project.color,padding:'2rem',display:'flex',gap:'1.5rem',alignItems:'flex-start'}}>
          <div style={{fontSize:'3rem'}}>{project.icon}</div>
          <div>
            <h2 className="modal-title">{project.title}</h2>
            <div className="stack-tags" style={{marginTop:'0.5rem'}}>{project.tags.map(t=><span key={t} className="stack-tag">{t}</span>)}</div>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-desc">{project.description}</p>
          <h4 className="modal-sub">✨ Key Features</h4>
          <ul className="modal-highlights">{project.highlights.map((h,i)=><li key={i}>{h}</li>)}</ul>
          <div className="modal-links">
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline hoverable">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{marginRight:'0.4rem'}}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              View on GitHub
            </a>
            {project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary hoverable">🚀 Live Demo</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT MOCKUP (generated UI, acts as a live "screen recording" preview) ──
function ProjectMockup({ kind, c1, c2 }) {
  const Star = ({ x, y, fill }) => (
    <path transform={`translate(${x} ${y}) scale(0.55)`} d="M8 0l2.35 4.76 5.25.76-3.8 3.7.9 5.24L8 11.9l-4.7 2.56.9-5.24-3.8-3.7 5.25-.76z" fill={fill} />
  );

  return (
    <svg className="proj-mockup-svg" viewBox="0 0 400 1000" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} stopOpacity="0.16" />
          <stop offset="100%" stopColor={c2} stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={`photo-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} stopOpacity="0.55" />
          <stop offset="100%" stopColor={c2} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="400" height="1000" fill={`url(#bg-${kind})`} />

      {/* shared top app bar */}
      <g transform="translate(0 44)">
        <rect width="400" height="52" fill="#ffffff" opacity="0.04" />
        <circle cx="28" cy="26" r="9" fill={c1} opacity="0.8" />
        <rect x="44" y="20" width="60" height="12" rx="3" fill="#ffffff" opacity="0.4" />
        <rect x="240" y="16" width="120" height="20" rx="10" fill="#ffffff" opacity="0.06" />
        <circle cx="360" cy="26" r="12" fill={c2} opacity="0.35" />
      </g>

      {/* ── StayHub: property listing feed ───────────────────────────────── */}
      {kind === 'listing' && (
        <>
          <g transform="translate(24 116)">
            <rect width="352" height="30" rx="15" fill="#ffffff" opacity="0.07" />
            <rect x="14" y="10" width="140" height="10" rx="4" fill="#ffffff" opacity="0.3" />
            <circle cx="330" cy="15" r="9" fill={c2} opacity="0.6" />
          </g>
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} transform={`translate(24 ${166 + i * 156})`}>
              <rect width="352" height="136" rx="16" fill="#ffffff" opacity="0.05" />
              <rect width="140" height="136" rx="16" fill={`url(#photo-${kind})`} />
              <path d={`M20 100 L55 60 L80 82 L110 40 L140 100 Z`} fill="#ffffff" opacity="0.18" />
              <circle cx="35" cy="35" r="10" fill="#ffffff" opacity="0.35" />
              <rect x="10" y="10" width="46" height="16" rx="8" fill="#00000055" />
              <Star x={16} y={14} fill="#ffd54f" />
              <rect x="30" y="17" width="18" height="8" rx="2" fill="#ffffff" opacity="0.7" />
              <rect x="158" y="14" width="170" height="14" rx="4" fill="#ffffff" opacity="0.55" />
              <rect x="158" y="38" width="130" height="10" rx="4" fill="#ffffff" opacity="0.3" />
              <Star x={158} y={62} fill={c2} /><Star x={172} y={62} fill={c2} /><Star x={186} y={62} fill={c2} /><Star x={200} y={62} fill={c2} /><Star x={214} y={62} fill="#ffffff33" />
              <rect x="158" y="80" width="90" height="8" rx="4" fill="#ffffff" opacity="0.22" />
              <rect x="158" y="104" width="70" height="22" rx="11" fill={c2} opacity="0.7" />
              <rect x="170" y="111" width="46" height="8" rx="4" fill="#0a0a12" opacity="0.7" />
            </g>
          ))}
        </>
      )}

      {/* ── Gen AI: interview report / chat feed ─────────────────────────── */}
      {kind === 'chat' && (
        <>
          <g transform="translate(24 120)">
            <rect width="352" height="86" rx="18" fill={`url(#photo-${kind})`} opacity="0.3" />
            <rect x="20" y="18" width="150" height="12" rx="4" fill="#ffffff" opacity="0.55" />
            <rect x="20" y="40" width="200" height="9" rx="4" fill="#ffffff" opacity="0.3" />
            {[0, 1, 2, 3].map((b) => (
              <rect key={b} x={20 + b * 60} y="60" width="46" height="14" rx="7" fill={c2} opacity={0.25 + b * 0.15} />
            ))}
          </g>
          {Array.from({ length: 5 }).map((_, i) => {
            const mine = i % 2 === 1;
            return (
              <g key={i} transform={`translate(0 ${224 + i * 118})`}>
                {!mine && <circle cx="38" cy="26" r="16" fill={c1} opacity="0.5" />}
                <rect x={mine ? 108 : 62} width="264" height="88" rx="18" fill={mine ? c1 : '#ffffff'} opacity={mine ? 0.32 : 0.06} />
                <rect x={(mine ? 108 : 62) + 18} y="16" width="200" height="10" rx="4" fill="#ffffff" opacity="0.45" />
                <rect x={(mine ? 108 : 62) + 18} y="36" width="160" height="9" rx="4" fill="#ffffff" opacity="0.28" />
                <rect x={(mine ? 108 : 62) + 18} y="55" width={mine ? 100 : 130} height="9" rx="4" fill="#ffffff" opacity="0.22" />
                {mine && <circle cx="378" cy="26" r="16" fill={c2} opacity="0.55" />}
              </g>
            );
          })}
        </>
      )}

      {/* ── AI Code Review: editor with syntax highlight + inline warning ─── */}
      {kind === 'code' && (
        <>
          <g transform="translate(24 120)">
            <rect width="352" height="24" rx="6" fill="#ffffff" opacity="0.05" />
            {['App.js', 'utils.js', 'api.js'].map((f, i) => (
              <rect key={f} x={8 + i * 78} y="4" width="70" height="16" rx="8" fill={i === 0 ? c1 : '#ffffff'} opacity={i === 0 ? 0.5 : 0.08} />
            ))}
          </g>
          {Array.from({ length: 12 }).map((_, i) => {
            const flagged = i === 6;
            const widths = [60, 210, 170, 40, 190, 150, 230, 60, 200, 170, 40, 120];
            const colors = [c2, '#ffffff', c1, '#ffffff', c2, '#ffffff', '#ff6b6b', '#ffffff', c1, '#ffffff', c2, '#ffffff'];
            const op = [0.7, 0.28, 0.55, 0.28, 0.5, 0.24, 0.75, 0.2, 0.5, 0.26, 0.6, 0.22];
            return (
              <g key={i} transform={`translate(24 ${160 + i * 34})`}>
                <rect x="-10" width={flagged ? 372 : 0} height="26" fill={flagged ? '#ff6b6b' : 'transparent'} opacity="0.08" />
                <rect x={(i * 13) % 20} width="16" height="4" rx="2" fill="#ffffff" opacity="0.15" />
                <rect x="30" y="0" width={widths[i]} height="12" rx="3" fill={colors[i]} opacity={op[i]} />
                {flagged && <>
                  <circle cx={30 + widths[i] + 18} cy="6" r="7" fill="#ff6b6b" />
                  <rect x={30 + widths[i] + 15} y="3" width="6" height="6" rx="1" fill="#0a0a12" />
                </>}
              </g>
            );
          })}
          <g transform="translate(24 546)">
            <rect width="352" height="60" rx="12" fill="#ff6b6b" opacity="0.1" />
            <rect x="16" y="14" width="14" height="14" rx="7" fill="#ff6b6b" />
            <rect x="42" y="16" width="220" height="10" rx="4" fill="#ffffff" opacity="0.4" />
            <rect x="42" y="34" width="160" height="8" rx="4" fill="#ffffff" opacity="0.22" />
          </g>
        </>
      )}

      {/* ── PhysioElite: calendar + doctor profile + booking cards ─────────── */}
      {kind === 'booking' && (
        <>
          <g transform="translate(24 116)">
            <rect width="352" height="130" rx="16" fill="#ffffff" opacity="0.05" />
            <rect x="16" y="14" width="120" height="12" rx="4" fill="#ffffff" opacity="0.45" />
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <text key={i} x={20 + i * 46} y="52" fontSize="10" fill="#ffffff" opacity="0.35">{d}</text>
            ))}
            {Array.from({ length: 14 }).map((_, i) => {
              const col = i % 7, row = Math.floor(i / 7);
              const active = i === 9;
              return <circle key={i} cx={24 + col * 46} cy={72 + row * 32} r="12" fill={active ? c2 : '#ffffff'} opacity={active ? 0.75 : 0.08} />;
            })}
          </g>
          {Array.from({ length: 4 }).map((_, i) => (
            <g key={i} transform={`translate(24 ${266 + i * 130})`}>
              <rect width="352" height="112" rx="16" fill="#ffffff" opacity="0.05" />
              <circle cx="58" cy="56" r="30" fill={`url(#photo-${kind})`} />
              <rect x="106" y="24" width="150" height="12" rx="4" fill="#ffffff" opacity="0.5" />
              <rect x="106" y="46" width="100" height="9" rx="4" fill="#ffffff" opacity="0.28" />
              <Star x={106} y={64} fill="#ffd54f" /><Star x={120} y={64} fill="#ffd54f" /><Star x={134} y={64} fill="#ffd54f" /><Star x={148} y={64} fill="#ffd54f" /><Star x={162} y={64} fill="#ffffff33" />
              <rect x="270" y="40" width="66" height="28" rx="14" fill={c2} opacity="0.7" />
              <rect x="282" y="49" width="42" height="10" rx="3" fill="#0a0a12" opacity="0.7" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

// ─── PROJECT CARD (pro-level: 3D tilt + depth layers + sliding image/video preview) ─
function ProjectCard({ project, index, featured, onOpen }) {
  const cardRef = useRef(null);
  const slideTimer = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const [hovered, setHovered] = useState(false);
  const [slide, setSlide] = useState(0);

  const hasVideo = !!project.video;
  const hasImages = !hasVideo && project.images && project.images.length > 0;

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 14 });
    setGlare({ x: px * 100, y: py * 100, o: 0.18 });
  };

  const onEnter = () => {
    setHovered(true);
    if (hasImages && project.images.length > 1) {
      slideTimer.current = setInterval(() => {
        setSlide((s) => (s + 1) % project.images.length);
      }, 1100);
    }
  };

  const onLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
    if (slideTimer.current) { clearInterval(slideTimer.current); slideTimer.current = null; }
    setSlide(0);
  };

  useEffect(() => () => { if (slideTimer.current) clearInterval(slideTimer.current); }, []);

  return (
    <div
      ref={cardRef}
      className={`proj-card pro hoverable ${featured ? 'featured' : ''}`}
      style={{
        opacity: 1,
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transitionDelay: `${index * 0.12}s`,
        cursor: 'pointer',
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => onOpen(project)}
    >
      {/* parallax glow blob — sits behind the card, drifts opposite to tilt for extra depth */}
      <div
        className="proj-parallax-blob"
        style={{
          background: `radial-gradient(circle, ${project.accent1}55, transparent 70%)`,
          transform: `translate(${-tilt.ry * 2.2}px, ${tilt.rx * 2.2}px)`,
        }}
      />

      <div className="proj-visual pro" style={{ background: project.color }}>
        {/* depth layer: ambient glow, sits furthest back */}
        <div className="proj-depth-glow" style={{ transform: 'translateZ(0px)' }} />

        {/* depth layer: browser chrome — makes the preview read as a live app, not a static image */}
        <div className="proj-chrome" style={{ transform: 'translateZ(45px)' }}>
          <span className="proj-chrome-dot r" /><span className="proj-chrome-dot y" /><span className="proj-chrome-dot g" />
          <span className="proj-chrome-url">{(project.liveUrl !== '#' ? project.liveUrl : project.githubUrl).replace(/^https?:\/\//, '')}</span>
          {hovered && <span className="proj-rec"><span className="proj-rec-dot" />LIVE</span>}
        </div>

        {/* depth layer: media (video / sliding screenshots / auto-scrolling generated preview) */}
        <div className="proj-media-layer" style={{ transform: 'translateZ(20px)' }}>
          {hasVideo ? (
            <video
              className="proj-media"
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
            />
          ) : hasImages ? (
            <div className="proj-slider" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {project.images.map((src, i) => (
                <img key={i} src={src} alt={`${project.title} preview ${i + 1}`} className="proj-media" draggable={false} />
              ))}
            </div>
          ) : (
            <div className={`proj-mockup-frame ${hovered ? 'scrolling' : ''}`}>
              <ProjectMockup kind={project.mockupKind || 'listing'} c1={project.accent1 || '#4DFFB4'} c2={project.accent2 || '#6366f1'} />
            </div>
          )}
        </div>

        {/* depth layer: gradient scrim so overlay text stays readable */}
        <div className="proj-scrim" style={{ transform: 'translateZ(30px)' }} />

        {/* depth layer: slide dots */}
        {hasImages && project.images.length > 1 && (
          <div className="proj-dots" style={{ transform: 'translateZ(50px)' }}>
            {project.images.map((_, i) => (
              <span key={i} className={`proj-dot ${i === slide ? 'on' : ''}`} />
            ))}
          </div>
        )}

        {featured && <span className="feat-badge" style={{ transform: 'translateZ(60px)' }}>⭐ Featured</span>}

        {/* depth layer: hover overlay actions, sits nearest camera */}
        <div className="proj-overlay pro" style={{ transform: 'translateZ(70px)', opacity: hovered ? 1 : 0 }}>
          <button className="overlay-btn hoverable" onClick={(e) => { e.stopPropagation(); onOpen(project); }}>👁 View Details</button>
          <a href={project.githubUrl} className="overlay-btn hoverable" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>⑂ GitHub</a>
          {project.liveUrl !== '#' && (
            <a href={project.liveUrl} className="overlay-btn hoverable" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>🚀 Live Demo</a>
          )}
        </div>

        {/* glare sweep for glass feel */}
        <div className="proj-glare" style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 55%)` }} />
      </div>

      <div className="proj-info" style={{ transform: 'translateZ(10px)' }}>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-desc">{project.shortDesc}</p>
        <div className="stack-tags">{project.tags.map((t) => <span key={t} className="stack-tag">{t}</span>)}</div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--accent)', opacity: 0.8 }}>Click to read more →</div>
      </div>
    </div>
  );
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
function Projects() {
  const [filter,setFilter]=useState('all');
  const [selectedProject,setSelectedProject]=useState(null);
  const { ref, inView } = useInView({ threshold:0.05, triggerOnce:true });
  const filtered = filter==='all' ? PROJECTS : PROJECTS.filter(p=>p.category===filter);
  return (
    <section className="section" id="projects" ref={ref} style={{background:'var(--bg2)'}}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Portfolio</span><h2 className="section-title">Featured <em>Projects</em></h2><p>Real-world full-stack & AI-powered apps — click any project to explore details</p></div></Reveal>
        <div className="filter-row">
          {[['all','All'],['fullstack','Full Stack'],['frontend','Frontend'],['backend','Backend']].map(([k,l])=>(<button key={k} className={`filter-btn hoverable ${filter===k?'on':''}`} onClick={()=>setFilter(k)}>{l}</button>))}
        </div>
        <div className="proj-grid" style={{ perspective: '1400px' }}>
          {filtered.map((p, i) => (
            <div
              key={p._id}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px) scale(.97)',
                transition: `opacity .75s cubic-bezier(.16,1,.3,1) ${i * .12}s, transform .75s cubic-bezier(.16,1,.3,1) ${i * .12}s`,
              }}
            >
              <ProjectCard project={p} index={i} featured={p.featured && i === 0} onOpen={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>
      {selectedProject&&<ProjectModal project={selectedProject} onClose={()=>setSelectedProject(null)}/>}
    </section>
  );
}

// ─── BLOG MODAL ────────────────────────────────────────────────────────────────
function BlogModal({ post, onClose }) {
  useEffect(()=>{document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';};},[]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-blog" onClick={e=>e.stopPropagation()}>
        <button className="modal-close hoverable" onClick={onClose}>✕</button>
        <div className="modal-header" style={{background:post.cover,padding:'2rem',display:'flex',gap:'1.5rem',alignItems:'flex-start'}}>
          <div style={{fontSize:'3rem'}}>{post.icon}</div>
          <div>
            <div className="blog-tags" style={{marginBottom:'0.5rem'}}>{post.tags.map(t=><span key={t} className="blog-tag">{t}</span>)}</div>
            <h2 className="modal-title">{post.title}</h2>
            <div style={{display:'flex',gap:'1rem',marginTop:'0.5rem',fontSize:'0.8rem',opacity:0.8}}>
              <span>📖 {post.readTime} min read</span><span>👁 {post.views.toLocaleString()} views</span><span>❤️ {post.likes} likes</span>
            </div>
          </div>
        </div>
        <div className="modal-body" style={{maxHeight:'60vh',overflowY:'auto'}}>
          {post.content.split('\n\n').map((para,i)=>{
            if(para.startsWith('**')&&para.endsWith('**')) return <h4 key={i} className="modal-sub">{para.replace(/\*\*/g,'')}</h4>;
            return <p key={i} className="modal-desc" dangerouslySetInnerHTML={{__html:para.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}}></p>;
          })}
        </div>
      </div>
    </div>
  );
}

// ─── BLOG ──────────────────────────────────────────────────────────────────────
function Blog() {
  const [selectedPost,setSelectedPost]=useState(null);
  const { ref, inView } = useInView({ threshold:0.1, triggerOnce:true });
  return (
    <section className="section" id="blog" ref={ref} style={{background:'var(--bg)'}}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Blog</span><h2 className="section-title">Dev <em>Articles</em></h2><p>Sharing MERN stack knowledge — click any article to read in full</p></div></Reveal>
        <div className="blog-grid">
          {BLOGS.map((post,i)=>(
            <article key={post._id} className="blog-card hoverable"
              style={{opacity:inView?1:0,transform:inView?'none':'translateY(35px)',transition:`all .7s ease ${i*.12}s`,cursor:'pointer'}}
              onClick={()=>setSelectedPost(post)}>
              <div className="blog-cover" style={{background:post.cover}}><div className="blog-icon">{post.icon}</div><div className="blog-cover-shine"/></div>
              <div className="blog-body">
                <div className="blog-tags">{post.tags.slice(0,3).map(t=><span key={t} className="blog-tag">{t}</span>)}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-foot">
                  <div className="blog-meta"><span>📖 {post.readTime}min</span><span>👁 {post.views.toLocaleString()}</span><span>❤️ {post.likes}</span></div>
                  <span className="blog-read hoverable">Read Full Article →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selectedPost&&<BlogModal post={selectedPost} onClose={()=>setSelectedPost(null)}/>}
    </section>
  );
}

// ─── 3D TILT INFO CARD ─────────────────────────────────────────────────────────
function TiltInfoCard() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 22;
    const rx = (0.5 - py) * 22;
    setTilt({ rx, ry });
    setGlare({ x: px * 100, y: py * 100, o: 0.25 });
  };
  const onLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
  };

  const stats = [
    ['4+', 'Projects Shipped'],
    ['90%+', 'Avg. Skill Proficiency'],
    ['12+', 'Core Technologies'],
    ['24hr', 'Reply Time'],
  ];

  return (
    <section className="section" id="snapshot" ref={ref} style={{ background: 'var(--bg)', perspective: '1200px' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">At a Glance</span>
            <h2 className="section-title">My <em>Snapshot</em></h2>
            <p>Move your mouse over the card 👇</p>
          </div>
        </Reveal>

        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(40px) scale(.95)',
            transition: 'opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)',
            maxWidth: '620px',
            margin: '0 auto',
          }}
        >
          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="hoverable"
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              background: 'linear-gradient(135deg, rgba(77,255,180,.08), rgba(99,102,241,.08))',
              border: '1px solid var(--border, rgba(255,255,255,.1))',
              backdropFilter: 'blur(10px)',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: 'transform .15s ease-out',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 55%)`,
                transition: 'opacity .2s ease',
              }}
            />

            <div style={{ transform: 'translateZ(40px)', textAlign: 'center' }}>
              <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <FLogo size={72} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Fareed Hussain</h3>
              <p style={{ opacity: 0.75, margin: '0.35rem 0 1.5rem', fontSize: '0.95rem' }}>
                Computer Engineer & MERN Stack Developer · Pakistan 🇵🇰
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
                  gap: '1rem',
                  transform: 'translateZ(20px)',
                }}
              >
                {stats.map(([val, label]) => (
                  <div
                    key={label}
                    style={{
                      background: 'rgba(255,255,255,.04)',
                      border: '1px solid var(--border, rgba(255,255,255,.08))',
                      borderRadius: '14px',
                      padding: '1rem 0.75rem',
                    }}
                  >
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent,#4DFFB4)' }}>{val}</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: '0.25rem' }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.75rem', transform: 'translateZ(30px)' }}>
                <a href="#contact" className="btn btn-primary hoverable">Let's Work Together →</a>
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
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const [sending,setSending]=useState(false);const [sent,setSent]=useState(false);
  const update=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const submit=e=>{e.preventDefault();setSending(true);setTimeout(()=>{setSent(true);setForm({name:'',email:'',subject:'',message:''});toast.success("Message sent! I'll reply within 24hrs. 🚀");setTimeout(()=>setSent(false),5000);setSending(false);},1000);};

  return (
    <section className="section" id="contact" style={{background:'var(--bg2)'}}>
      <div className="container">
        <Reveal><div className="section-header"><span className="section-tag">Contact</span><h2 className="section-title">Let's Build<br/><em>Something Great</em></h2></div></Reveal>
        <div className="contact-grid">
          <Reveal direction="left">
            <div className="contact-info">
              <p className="contact-intro">Available for freelance, full-time, and collaborations. Let's build something amazing together!</p>
              {[['📧','Email','fareedh109@gmail.com'],['📱','Phone','+92 304 8093502'],['📍','Location','Pakistan 🇵🇰'],['⏰','Availability','Mon–Sat, 9am–9pm PKT']].map(([icon,label,val])=>(
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
                <div className="f-group"><label className="f-label">Your Name *</label><input className="f-input" placeholder="John Doe" value={form.name} onChange={update('name')} required/></div>
                <div className="f-group"><label className="f-label">Email Address *</label><input className="f-input" type="email" placeholder="john@co.com" value={form.email} onChange={update('email')} required/></div>
              </div>
              <div className="f-group"><label className="f-label">Subject</label><input className="f-input" placeholder="Project Collaboration" value={form.subject} onChange={update('subject')}/></div>
              <div className="f-group"><label className="f-label">Message *</label><textarea className="f-input f-textarea" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={update('message')} required/></div>
              <div className="form-actions">
                <button className="btn btn-primary hoverable" disabled={sending} onClick={submit}>{sending?'⏳ Sending...':'🚀 Send Message'}</button>
                {sent&&<span className="f-success">✅ Sent! I'll reply soon.</span>}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── BACK TO TOP ───────────────────────────────────────────────────────────────
function BackTop() {
  const [v,setV]=useState(false);
  useEffect(()=>{const s=()=>setV(window.scrollY>500);window.addEventListener('scroll',s);return()=>window.removeEventListener('scroll',s);},[]);
  if(!v)return null;
  return <button className="back-top hoverable" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>;
}

// ─── CSS FOR MODALS (inject into global.css or add here via style tag) ─────────
const modalStyles = `
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;animation:fadeIn .2s ease}
  .modal-box{background:var(--surface,#1a1a2e);border:1px solid var(--border,rgba(255,255,255,.08));border-radius:20px;width:100%;max-width:640px;max-height:88vh;overflow:hidden;display:flex;flex-direction:column;position:relative;animation:slideUp .3s cubic-bezier(.16,1,.3,1)}
  .modal-blog{max-width:720px}
  .modal-close{position:absolute;top:1rem;right:1rem;z-index:10;background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.15);color:#fff;width:32px;height:32px;border-radius:50%;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
  .modal-close:hover{background:rgba(255,255,255,.15)}
  .modal-header{border-radius:20px 20px 0 0}
  .modal-title{font-size:1.4rem;font-weight:700;color:#fff;margin:0}
  .modal-body{padding:1.5rem 2rem 2rem;overflow-y:auto}
  .modal-desc{color:var(--text2,rgba(255,255,255,.7));line-height:1.8;margin-bottom:1rem}
  .modal-sub{color:var(--accent,#4DFFB4);font-size:1rem;font-weight:600;margin:1.5rem 0 0.75rem}
  .modal-highlights{list-style:none;padding:0;margin:0 0 1.5rem;display:flex;flex-direction:column;gap:0.5rem}
  .modal-highlights li{color:var(--text2,rgba(255,255,255,.7));padding:0.5rem 0.75rem;background:rgba(77,255,180,.05);border-left:2px solid var(--accent,#4DFFB4);border-radius:0 6px 6px 0}
  .modal-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem}
  .proj-mockup-icon{font-size:5rem;text-align:center;display:flex;align-items:center;justify-content:center;width:100%;height:100%;min-height:180px}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}

  /* ── PRO PROJECT CARDS: 3D depth + tilt + sliding preview ───────────────── */
  .proj-card.pro{
    position:relative;
    border-radius:20px;
    overflow:hidden;
    transform-style:preserve-3d;
    transition:transform .12s ease-out, box-shadow .3s ease;
    will-change:transform;
    background:var(--surface,#12121e);
    border:1px solid var(--border,rgba(255,255,255,.08));
  }
  .proj-card.pro:hover{ box-shadow:0 30px 60px -20px rgba(0,0,0,.55), 0 0 0 1px rgba(77,255,180,.15); }
  .proj-card.pro.featured{ border-color:rgba(77,255,180,.35); }

  .proj-visual.pro{
    position:relative;
    min-height:220px;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    transform-style:preserve-3d;
  }

  .proj-depth-glow{
    position:absolute; inset:-20%;
    background:radial-gradient(circle at 30% 20%, rgba(255,255,255,.12), transparent 60%);
    pointer-events:none;
  }

  .proj-media-layer{ position:absolute; inset:0; overflow:hidden; }
  .proj-icon-fallback{
    width:100%; height:100%;
    display:flex; align-items:center; justify-content:center;
    font-size:4rem;
  }

  .proj-slider{ display:flex; height:100%; transition:transform .55s cubic-bezier(.16,1,.3,1); }
  .proj-slider .proj-media{ width:100%; height:100%; flex:0 0 100%; object-fit:cover; }
  video.proj-media{ width:100%; height:100%; object-fit:cover; display:block; }

  .proj-scrim{
    position:absolute; inset:0;
    background:linear-gradient(to top, rgba(0,0,0,.65) 0%, rgba(0,0,0,0) 45%);
    pointer-events:none;
  }

  .proj-dots{
    position:absolute; bottom:0.75rem; left:50%; transform:translateX(-50%) translateZ(50px);
    display:flex; gap:6px; z-index:3;
  }
  .proj-dot{ width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,.35); transition:all .25s ease; }
  .proj-dot.on{ background:var(--accent,#4DFFB4); width:16px; border-radius:3px; box-shadow:0 0 8px rgba(77,255,180,.6); }

  .proj-overlay.pro{
    position:absolute; inset:0; z-index:4;
    display:flex; align-items:center; justify-content:center; gap:0.6rem; flex-wrap:wrap;
    background:rgba(5,5,10,.35);
    backdrop-filter:blur(3px);
    transition:opacity .3s ease;
    padding:1rem;
  }

  .proj-glare{
    position:absolute; inset:0; pointer-events:none; z-index:5;
    transition:opacity .2s ease;
  }

  @media (prefers-reduced-motion: reduce){
    .proj-card.pro{ transform:none !important; }
    .proj-slider{ transition:none; }
    .proj-mockup-frame.scrolling .proj-mockup-svg{ animation:none !important; }
  }

  /* ── parallax glow blob behind each card ─────────────────────────────────── */
  .proj-card.pro{ position:relative; isolation:isolate; }
  .proj-parallax-blob{
    position:absolute; inset:-30% -20%; z-index:-1;
    filter:blur(40px); opacity:.55; pointer-events:none;
    transition:transform .2s ease-out;
  }

  /* ── browser chrome header on the media preview ──────────────────────────── */
  .proj-chrome{
    position:absolute; top:0; left:0; right:0; z-index:6;
    display:flex; align-items:center; gap:6px;
    padding:8px 12px;
    background:rgba(8,8,14,.55);
    backdrop-filter:blur(6px);
    border-bottom:1px solid rgba(255,255,255,.06);
  }
  .proj-chrome-dot{ width:7px; height:7px; border-radius:50%; display:inline-block; }
  .proj-chrome-dot.r{ background:#ff5f56; }
  .proj-chrome-dot.y{ background:#ffbd2e; }
  .proj-chrome-dot.g{ background:#27c93f; }
  .proj-chrome-url{
    margin-left:6px; font-family:var(--font-mono,monospace); font-size:.65rem;
    color:rgba(255,255,255,.5); flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  .proj-rec{
    display:flex; align-items:center; gap:4px;
    font-family:var(--font-mono,monospace); font-size:.6rem; font-weight:700;
    color:#ff5f56; letter-spacing:.05em;
  }
  .proj-rec-dot{
    width:6px; height:6px; border-radius:50%; background:#ff5f56;
    animation:rec-pulse 1.1s ease-in-out infinite;
  }
  @keyframes rec-pulse{ 0%,100%{ opacity:1; } 50%{ opacity:.25; } }

  /* ── auto-scrolling generated mockup ("live preview" without real footage) ─ */
  .proj-mockup-frame{
    position:absolute; inset:0; top:30px; overflow:hidden;
  }
  .proj-mockup-svg{
    width:100%; height:320%; display:block;
    transform:translateY(0);
  }
  .proj-mockup-frame.scrolling .proj-mockup-svg{
    animation:proj-scroll 7s ease-in-out infinite;
  }
  @keyframes proj-scroll{
    0%{ transform:translateY(0); }
    45%{ transform:translateY(-68%); }
    55%{ transform:translateY(-68%); }
    100%{ transform:translateY(0); }
  }
`;

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded,setLoaded]=useState(false);
  const [theme,setTheme]=useState('dark');
  const toggleTheme=useCallback(()=>{setTheme(t=>{const n=t==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);return n;});},[]);

  useEffect(()=>{
    const style=document.createElement('style');
    style.textContent=modalStyles;
    document.head.appendChild(style);
    return()=>document.head.removeChild(style);
  },[]);

  if(!loaded) return <Loader onDone={()=>setLoaded(true)}/>;

  return (
    <div data-theme={theme}>
      <Cursor/>
      <Toaster position="bottom-right" toastOptions={{style:{background:'var(--surface)',color:'var(--text)',border:'1px solid var(--border)',fontFamily:'var(--font-mono)',fontSize:'.8rem'}}}/>
      <Navbar theme={theme} toggleTheme={toggleTheme}/>
      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <GithubStats username={GITHUB_USERNAME}/>
        <Blog/>
        <TiltInfoCard/>
        <Contact/>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo"><FLogo size={28}/><span><span className="accent">&lt;</span>Fareed<span className="accent">/&gt;</span></span></div>
            <span className="footer-copy">© Fareed Hussain. All rights reserved.</span>
            <span className="footer-copy">Built with ❤️ using MERN Stack 🚀</span>
          </div>
        </div>
      </footer>
      <BackTop/>
    </div>
  );
}
