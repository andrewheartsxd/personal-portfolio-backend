const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

const resumeEducationItem = require('../controllers/resumeEducationItem.controller.js');

// Create new resumeEducationItem
router.post('/resume-education-items', resumeEducationItem.create);

// Retrieve all resumeEducationItems
router.get('/resume-education-items', resumeEducationItem.findAll);

// Retrieve single resumeEducationItem with resumeEducationItemID
router.get('/resume-education-items/:resumeEducationItemID', resumeEducationItem.findOne);

// Update resumeEducationItem with resumeEducationItemID
router.patch('/resume-education-items/:resumeEducationItemID', resumeEducationItem.update);

// Delete resumeEducationItem with resumeEducationItemID
router.delete('/resume-education-items/:resumeEducationItemID', resumeEducationItem.delete);

module.exports = router;
