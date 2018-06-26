const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('resumeCareerItems', {
  attributes: [
    'jobTitle',
    'company',
    'location',
    'startDate',
    'endDate',
    'descriptions',
  ],
});
