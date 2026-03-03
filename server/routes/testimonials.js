const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const seed = [
  { _id:'t1', name:'Ahmed Raza', role:'CTO', company:'TechCorp Pakistan', content:'Fareed delivered an exceptional e-commerce platform. His MERN stack expertise is top-notch. Clean code, great communication, delivered on time!', rating:5 },
  { _id:'t2', name:'Sarah Johnson', role:'Product Manager', company:'StartupXYZ', content:'Working with Fareed was a pleasure. He built our entire SaaS dashboard from scratch. The animations and performance are incredible. Highly recommended!', rating:5 },
  { _id:'t3', name:'Hassan Ali', role:'Founder', company:'DigitalEdge', content:'Fareed transformed our idea into a fully functional real-time chat application. Professional, skilled, and very responsive. Will hire again!', rating:5 },
  { _id:'t4', name:'Emily Chen', role:'Lead Developer', company:'WebAgency', content:'The Airbnb clone Fareed built exceeded all our expectations. Full-stack expertise with beautiful UI and solid backend architecture. 10/10!', rating:5 },
];
router.get('/', async (req, res) => {
  try { const data = await Testimonial.find({ approved:true }); res.json({ success:true, data:data.length?data:seed }); }
  catch(e) { res.json({ success:true, data:seed }); }
});
router.post('/', async (req, res) => {
  try { const doc = await Testimonial.create(req.body); res.json({ success:true, data:doc }); }
  catch(e) { res.status(400).json({ success:false, error:e.message }); }
});
module.exports = router;
