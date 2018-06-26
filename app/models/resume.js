const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//const ResumeCareerItemSchema = require('../models/resumeCareerItem.js').schema;

const ResumeSchema = new Schema({
  name: String,
  //resumeCareerItems: [ResumeCareerItemSchema],
  resumeCareerItems: [{ type: Schema.Types.ObjectId, ref: 'ResumeCareerItem' }],
}, { usePushEach: true });

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;
