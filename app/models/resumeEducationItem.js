const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeEducationItemSchema = new mongoose.Schema({
  resume: { type: Schema.Types.ObjectId, ref: 'Resume' },
  education: String,
  school: String,
  location: String,
  startDate: Date,
  endDate: Date,
});

const ResumeEducationItem = mongoose.model('ResumeEducationItem', ResumeEducationItemSchema);

module.exports = ResumeEducationItem;
