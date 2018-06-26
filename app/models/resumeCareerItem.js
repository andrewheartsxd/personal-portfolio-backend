const mongoose = require('mongoose');

const { Schema } = mongoose;

const ResumeCareerItemSchema = new mongoose.Schema({
  resume: { type: Schema.Types.ObjectId, ref: 'Resume' },
  jobTitle: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  descriptions: [{ text: String }],
});

ResumeCareerItemSchema.pre('remove', function (next) {
  const resumeCareerItem = this;
  resumeCareerItem.model('Resume').update(
    { resumeCareerItems: resumeCareerItem._id },
    { $pull: { resumeCareerItems: resumeCareerItem._id } },
    { multi: true },
    next);
});

const ResumeCareerItem = mongoose.model('ResumeCareerItem', ResumeCareerItemSchema);

module.exports = ResumeCareerItem;
