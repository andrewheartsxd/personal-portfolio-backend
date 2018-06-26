const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('resumeEducationItems', {
  attributes: ['education', 'school', 'location', 'startDate', 'endDate'],
});
