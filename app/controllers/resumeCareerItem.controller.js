const ResumeCareerItem = require('../models/resumeCareerItem.js');
const ResumeCareerItemSerialzer = require('../serializers/resumeCareerItem.serializer.js');
const Resume = require('../models/resume.js');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

exports.create = function (req, res) {
  console.log(req.body.company);

  // Create and Save a new careerItem
  const resumeCareerItem = new ResumeCareerItem({
    resume: req.body.resumeID,
    jobTitle: req.body.jobTitle,
    company: req.body.company,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    descriptions: req.body.descriptions,
  });

  resumeCareerItem.save((err, data) => {
    if (err) {
      console.log('error:', err);
      res.status(500).send({ message: 'Error occurred while creating the resumeCareerItem' });
    } else {
      Resume.findById(req.body.resumeID, (err, resume) => {
        if (err) {
          console.log('error:', err);
          res.status(500).send({ message: 'Error occurred while retrieving resume' });
        } else {
          resume.resumeCareerItems.push(data);
          resume.save((err, data) => {
            if (err) {
              console.log('error:', err);
              res.status(500).send({ message: 'Error occurred while saving resumeCareerItems into resume' });
            } else {
              res.send(data);
            }
          });
        }
      });
    }
  });
};

exports.findAll = function (req, res) {
  // Retrieve and return all resumeCareerItems from the database.
  ResumeCareerItem.find(function (err, resumeCareerItems) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error occurred while retrieving resumeCareerItems' });
    } else {
      const jsonAPI = ResumeCareerItemSerialzer.serialize(resumeCareerItems);
      //console.log('jsonAPI:', jsonAPI);
      res.send(jsonAPI);
    }
  });
};

exports.findOne = function (req, res) {
  // Find a single careerItem with a resumeCareerItemID
  ResumeCareerItem.findById(req.params.resumeCareerItemID, function(err, resumeCareerItem) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: `Error retrieving resumeCareerItem with ID: ${req.params.resumeCareerItemID}` });
    } else {
      const jsonAPI = ResumeCareerItemSerialzer.serialize(resumeCareerItem);
      //console.log('jsonAPI:', JSON.stringify(jsonAPI));
      res.send(jsonAPI);
    }
  });
};

exports.update = function (req, res) {
  // Update a careerItem identified by the careerItemID in the request
  ResumeCareerItem.findById(req.params.resumeCareerItemID, function(err, resumeCareerItem) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: `Error retrieving resumeCareerItem with ID: ${req.params.resumeCareerItemID}` });
    } else {
      new JSONAPIDeserializer().deserialize(req.body, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('data:', data);
          resumeCareerItem.jobTitle = data['job-title'];
          resumeCareerItem.company = data['company'];
          resumeCareerItem.location = data['location'];
          resumeCareerItem.startDate = data['start-date'];
          resumeCareerItem.endDate = data['end-date'];
          resumeCareerItem.descriptions = data['descriptions'];

          resumeCareerItem.save((err, savedResumeCareerItem) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: 'Error occurred while updating the resumeCareerItem' });
            } else {
              const jsonAPI = ResumeCareerItemSerialzer.serialize(savedResumeCareerItem);
              //console.log('jsonAPI:', JSON.stringify(jsonAPI));
              res.send(jsonAPI);
            }
          });
        }
      });
    }
  });
};

exports.delete = function (req, res) {
  // Delete a careerItem with the specified careerItemID in the request
  const { resumeCareerItemID } = req.params;
  console.log('resumeCareerItemID to be deleted:', resumeCareerItemID);

  ResumeCareerItem.findOneAndRemove({ _id: resumeCareerItemID }, function (err, resumeCareerItem) {
    if (err) {
      console.log('Error:');
      console.log(err);
      res.status(500).send({ message: `Error occurred while deleting the resumeCareerItem with ID: ${req.params.resumeCareerItemID}` });
    } else {
      console.log('Successfully deleted');
      resumeCareerItem.remove();
      const jsonAPI = ResumeCareerItemSerialzer.serialize(resumeCareerItem);
      res.send(jsonAPI);
    }
  });
};
