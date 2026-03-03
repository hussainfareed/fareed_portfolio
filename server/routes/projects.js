const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const seed = [
  { _id:'p1', title:'Airbnb Clone', description:'Full-stack Airbnb clone with booking system, Mapbox maps, Stripe payments, JWT auth.', tags:['React','Node.js','MongoDB','Stripe','Mapbox'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:true, category:'fullstack', stats:{stars:124,forks:38,views:2400} },
  { _id:'p2', title:'Real-Time Chat App', description:'WebSocket-powered chat with rooms, typing indicators, file sharing, and E2E encryption.', tags:['React','Socket.io','Node.js','MongoDB'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:true, category:'fullstack', stats:{stars:89,forks:21,views:1800} },
  { _id:'p3', title:'E-Commerce Platform', description:'Full MERN e-commerce with admin dashboard, shopping cart, and Stripe payment gateway.', tags:['React','Redux','Node.js','MongoDB','Stripe'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:false, category:'fullstack', stats:{stars:156,forks:44,views:3100} },
  { _id:'p4', title:'SaaS Analytics Dashboard', description:'Real-time analytics with RBAC, live D3.js charts, export and subscription management.', tags:['React','D3.js','Node.js','MongoDB'], githubUrl:'https://github.com', liveUrl:'https://demo.com', featured:false, category:'fullstack', stats:{stars:67,forks:18,views:1200} },
];
router.get('/', async (req, res) => {
  try { const data = await Project.find(); res.json({ success:true, data:data.length?data:seed }); }
  catch(e) { res.json({ success:true, data:seed }); }
});
router.post('/', async (req, res) => {
  try { const doc = await Project.create(req.body); res.json({ success:true, data:doc }); }
  catch(e) { res.status(400).json({ success:false, error:e.message }); }
});
module.exports = router;
