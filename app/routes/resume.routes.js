const router = require('express').Router();

//router.get('/', (req, res) => {
  //res.status(200).json({ message: 'Resumes!' });
//});

const resume = require('../controllers/resume.controller.js');


// Create new resume
router.post('/', resume.create);

// Retrieve resume
router.get('/', resume.find);

// Delete resume
//router.delete('/resumes', resume.delete);

// /resumeCareerItem
//router.use('/resume-career-items', require('./resumeCareerItem.routes.js'));
// Update resumeCareerItem
//router.put('/resume/:resumeCareerItemID', resume.updateResumeCareerItem);
// Update resumeEducationItem
//router.put('/resume/:resumeEducationItemID', resume.updateResumeEducationItem);

module.exports = router;
