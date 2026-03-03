# 🚀 Fareed Portfolio — Ultra Pro v2.0

A next-level, 3D animated MERN Stack developer portfolio with smooth animations, interactive 3D canvas, custom cursor, and professional design.

---

## ✨ Features

- **3D Interactive Canvas** — Rotating wireframe cube + sphere + particle network (mouse-interactive)
- **Custom Cursor** — Smooth magnetic cursor with hover effects
- **F Logo** — SVG logo with gradient glow animation
- **Floating 3D Card** — Hero developer card with perspective hover
- **Animated Loader** — Branded loading screen with progress bar
- **Typing Effect** — Smooth multi-text cycling
- **Scroll Reveal** — Staggered entrance animations
- **Dark / Light Mode** — Full theme toggle
- **Skill Bars** — Animated progress bars with glow
- **Project Mockups** — Custom inline UI mockups per project
- **Project Hover Overlay** — GitHub + Live Demo overlay on hover
- **Contact Form** — Full form with API + demo mode fallback
- **Mobile Responsive** — Hamburger menu + full mobile layout
- **Works without MongoDB** — Seed data fallback built in

---

## 📁 Project Structure

```
fareed-portfolio/
├── client/                   # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx           # ← All components in one file
│   │   ├── index.js          # Entry point
│   │   └── styles/
│   │       └── global.css    # All styles
│   └── package.json
│
├── server/                   # Node.js / Express Backend
│   ├── models/
│   │   ├── Project.js
│   │   ├── Blog.js
│   │   ├── Testimonial.js
│   │   ├── Contact.js
│   │   └── Skill.js
│   ├── routes/
│   │   ├── projects.js
│   │   ├── blog.js
│   │   ├── testimonials.js
│   │   ├── contact.js
│   │   └── skills.js
│   ├── index.js              # Express server
│   ├── .env                  # Environment variables
│   └── package.json
│
└── README.md
```

---

## 🛠️ Setup & Run

### 1. Install Client Dependencies
```bash
cd client
npm install
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Start the Backend (Terminal 1)
```bash
cd server
npm run dev
# or: node index.js
# Server runs at http://localhost:5000
```

### 4. Start the Frontend (Terminal 2)
```bash
cd client
npm start
# Opens at http://localhost:3000
```

> **No MongoDB?** No problem. All data falls back to seed data automatically.

---

## 🎨 Customization

### Update Your Name / Info
Edit `App.jsx` — search for "Fareed" and replace with your name.

### Update Projects
Edit the `PROJECTS` array at the top of `App.jsx`.

### Update Skills
Edit the `SKILLS` array at the top of `App.jsx`.

### Update Contact Info
Search for `fareed@example.com` in `App.jsx` and update.

### Change Accent Color
Edit `--accent` in `global.css` (default: `#4DFFB4`).

---

## 🚀 Deploy

### Frontend → Vercel
```bash
cd client
npm run build
# Upload /build folder to Vercel
```

### Backend → Railway / Render
Set environment variables:
- `MONGO_URI` = your MongoDB Atlas URI
- `CLIENT_URL` = your Vercel frontend URL
- `NODE_ENV` = production

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, CSS3, Canvas API |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Fonts | Syne, Space Mono, Outfit (Google) |
| Libraries | Axios, react-hot-toast, react-countup, react-intersection-observer |

---

Built with ❤️ — Ultra Pro Edition
