const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
router.post('/', async (req, res) => {
  try {
    const doc = await Contact.create(req.body);
    res.json({ success:true, data:doc, message:'Message received!' });
  } catch(e) { res.status(400).json({ success:false, error:e.message }); }
});
router.get('/', async (req, res) => {
  try { const data = await Contact.find().sort({ createdAt:-1 }); res.json({ success:true, data }); }
  catch(e) { res.status(500).json({ success:false, error:e.message }); }
});
module.exports = router;
