const router = require('express').Router();

router.get('/v1', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// /resume
//router.use('/v1', require('./resume.routes.js'));
router.use('/v1/resumes', require('./resume.routes.js'));
// /resumeCareerItem
router.use('/v1/resume-career-items', require('./resumeCareerItem.routes.js'));
//router.use('/v1', require('./resumeCareerItem.routes.js'));
// /resumeEducationItem
//router.use('/v1', require('./resumeEducationItem.routes.js'));

module.exports = router;
