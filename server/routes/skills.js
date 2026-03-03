const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const seed = [
  {_id:'s1',name:'React.js',category:'frontend',level:92},{_id:'s2',name:'TypeScript',category:'frontend',level:80},
  {_id:'s3',name:'Redux',category:'frontend',level:82},{_id:'s4',name:'Tailwind CSS',category:'frontend',level:88},
  {_id:'s5',name:'Node.js',category:'backend',level:90},{_id:'s6',name:'Express.js',category:'backend',level:88},
  {_id:'s7',name:'Socket.io',category:'backend',level:78},{_id:'s8',name:'REST APIs',category:'backend',level:93},
  {_id:'s9',name:'MongoDB',category:'database',level:85},{_id:'s10',name:'Mongoose',category:'database',level:87},
  {_id:'s11',name:'Git/GitHub',category:'tools',level:90},{_id:'s12',name:'Docker',category:'tools',level:70},
];
router.get('/', async (req, res) => {
  try { const data = await Skill.find(); res.json({ success:true, data:data.length?data:seed }); }
  catch(e) { res.json({ success:true, data:seed }); }
});
module.exports = router;
