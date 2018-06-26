const ResumeEducationItem = require('../models/resumeEducationItem.js');
const ResumeEducationItemSerialzer = require('../serializers/resumeEducationItem.serializer.js');
const Resume = require('../models/resume.js');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

exports.create = function (req, res) {

  console.log(req.body.company);

  // Create and Save a new educationItem
  const resumeEducationItem = new ResumeEducationItem({
    resume: req.body.resumeID,
    education: req.body.education,
    school: req.body.school,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  resumeEducationItem.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error occurred while creating the resumeEducationItem' });
    } else {
      Resume.findById(req.body.resumeID, function (err, resume) {
        if (err) {
          console.log(err);
          res.status(500).send({ message: 'Error occurred while retrieving resume' });
        } else {
          resume.resumeEducationItems.push(data);
          resume.save((err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: 'Error occurred while saving resumeEducationItems into resume' });
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
  // Retrieve and return all resumeEducationItems from the database.
  ResumeEducationItem.find(function (err, resumeEducationItems) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error occurred while retrieving resumeEducationItems' });
    } else {
      const jsonAPI = ResumeEducationItemSerialzer.serialize(resumeEducationItems);
      console.log('jsonAPI:', jsonAPI);
      res.send(jsonAPI);
    }
  });
};

exports.findOne = function (req, res) {
  // Find a single educationItem with a resumeEducationItemID
  ResumeEducationItem.findById(req.params.resumeEducationItemID, function(err, resumeEducationItem) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: `Error retrieving resumeEducationItem with ID: ${req.params.resumeEducationItemID}` });
    } else {
      const jsonAPI = ResumeEducationItemSerialzer.serialize(resumeEducationItem);
      console.log('jsonAPI:', JSON.stringify(jsonAPI));
      res.send(jsonAPI);
    }
  });
};

exports.update = function (req, res) {
  // Update a educationItem identified by the educationItemID in the request
  ResumeEducationItem.findById(req.params.resumeEducationItemID, function(err, resumeEducationItem) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: `Error retrieving resumeEducationItem with ID: ${req.params.resumeEducationItemID}` });
    } else {
      new JSONAPIDeserializer().deserialize(req.body, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('data:', data);
          resumeEducationItem.education = data['education'];
          resumeEducationItem.school = data['school'];
          resumeEducationItem.location = data['location'];
          resumeEducationItem.startDate = data['start-date'];
          resumeEducationItem.endDate = data['end-date'];

          resumeEducationItem.save((err, savedResumeEducationItem) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: 'Error occurred while updating the resumeEducationItem' });
            } else {
              const jsonAPI = ResumeEducationItemSerialzer.serialize(savedResumeEducationItem);
              console.log('jsonAPI:', JSON.stringify(jsonAPI));
              res.send(jsonAPI);
            }
          });
        }
      });
    }
  });
};

exports.delete = function (req, res) {
  // Delete a educationItem with the specified educationItemID in the request
  ResumeEducationItem.remove({ _id: req.params.resumeEducationItemID }, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: `Error occurred while deleting the resumeEducationItem with ID: ${req.params.resumeEducationItemID}` });
    } else {
      res.send({ message: 'resumeEducationItem deleted successfully' });
    }
  });
};
