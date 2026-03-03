const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const seed = [
  { _id:'b1', title:'How I Built a Full-Stack Airbnb Clone with MERN', excerpt:'Deep dive into building a production-ready Airbnb clone with Stripe and Mapbox.', tags:['MERN','React','Node.js'], readTime:8, views:1420, likes:89 },
  { _id:'b2', title:'JWT Authentication in Node.js: The Complete Guide', excerpt:'Implement secure JWT authentication with refresh tokens and production best practices.', tags:['Node.js','JWT','Security'], readTime:6, views:2100, likes:134 },
  { _id:'b3', title:'React Performance: 10 Optimization Techniques', excerpt:'Make your React apps blazing fast with useMemo, useCallback, lazy loading and code splitting.', tags:['React','Performance','JS'], readTime:5, views:980, likes:67 },
];
router.get('/', async (req, res) => {
  try { const data = await Blog.find({ published:true }); res.json({ success:true, data:data.length?data:seed }); }
  catch(e) { res.json({ success:true, data:seed }); }
});
module.exports = router;
