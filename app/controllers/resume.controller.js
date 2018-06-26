const Resume = require('../models/resume.js');
const ResumeSerialzer = require('../serializers/resume.serializer.js');

exports.create = function (req, res) {
  // Create and Save a new resume
  const resume = new Resume({
    name: req.body.name,
    resumeCareerItems: req.body.resumeCareerItems || [],
  });

  resume.save((err, data) => {
    console.log(data);
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error occurred while creating the resume' });
    } else {
      console.log('data', data);
      let resumeID = data._id;
      console.log('resumeID', resumeID);
      res.send(data);
    }
  });
};

exports.find = function (req, res) {
  // Retrieve and return resume from the database.
  // If using reference relationship
  Resume
    .find()
    .populate('resumeCareerItems')
    .exec((err, resume) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error occurred while retrieving resume' });
      } else {
        const jsonAPI = ResumeSerialzer.serialize('resume', resume[0].toJSON());
        //   const jsonAPI = ResumeSerialzer.serialize(resume);
        //console.log('jsonAPI:', JSON.stringify(jsonAPI));
        res.send(jsonAPI);
      }
    });
  // If using embedded relationship (subdocument) 
  //Resume.find((err, resume) => {
    //if (err) {
      //console.error(err);
      //res.status(500).send({ message: 'Error occurred while retrieving resume' });
    //} else {
      //const jsonAPI = ResumeSerialzer.serialize(resume);
      //console.log('jsonAPI:', JSON.stringify(jsonAPI));
      //res.send(jsonAPI);
    //}
  //});
};

//exports.update = function (req, res) {
  //// Update a careerItem identified by the careerItemID in the request
  //ResumeCareerItem.findById(req.params.resumeCareerItemID, function(err, data) {
    //if (err) {
      //console.error(err);
      //res.status(500).send({ message: `Error retrieving resumeCareerItem with ID: ${req.params.resumeCareerItemID}` });
    //} else {
      //const resumeCareerItem = data;
      //resumeCareerItem.jobTitle = req.body.jobTitle;
      //resumeCareerItem.company = req.body.company;
      //resumeCareerItem.startDate = req.body.startDate;
      //resumeCareerItem.endDate = req.body.endDate;
      //resumeCareerItem.descriptions = req.body.descriptions;

      //resumeCareerItem.save((err, data) => {
        //console.log(data);
        //if (err) {
          //console.log(err);
          //res.status(500).send({ message: 'Error occurred while updating the resumeCareerItem' });
        //} else {
          //res.send(data);
        //}
      //});
    //}
  //});
//};

exports.delete = function (req, res) {
  // Delete resume with resumeID in the request
  Resume.remove({ _id: req.params.resumeItemID }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: `Error occurred while deleting the resume with ID: ${req.params.resumeID}` });
    } else {
      console.log('Deleted:', data);
      res.send({ message: 'resume deleted successfully' });
    }
  });
};
