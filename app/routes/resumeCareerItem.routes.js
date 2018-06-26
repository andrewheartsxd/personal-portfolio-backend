const router = require('express').Router({ mergeParams: true });

/*router.get('/', (req, res) => {
  res.status(200).json({ message: 'Resume Career Items!' });
});*/

const resumeCareerItem = require('../controllers/resumeCareerItem.controller.js');

// Create new resumeCareerItem
router.post('/', resumeCareerItem.create);

// Retrieve all resumeCareerItems
router.get('/', resumeCareerItem.findAll);

// Retrieve single resumeCareerItem with resumeCareerItemID
//router.get('/resume-career-items/:resumeCareerItemID', resumeCareerItem.findOne);

// Update resumeCareerItem with resumeCareerItemID
router.patch('/:resumeCareerItemID', resumeCareerItem.update);

// Delete resumeCareerItem with resumeCareerItemID
router.delete('/:resumeCareerItemID', resumeCareerItem.delete);

module.exports = router;
