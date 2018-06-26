const JSONAPISerializer = require('json-api-serializer');

const Serializer = new JSONAPISerializer();

Serializer.register('resume', {
  id: '_id',
  blacklist: [],
  convertCase: 'kebab-case',
  links: {
    self(data) {
      return `/resumes/${data._id}`;
    },
  },
  relationships: {
    resumeCareerItems: {
      type: 'resumeCareerItem',
      links(data) {
        //return { related: `/resumes/${data._id}/resume-career-items` };
        return { related: `/resumes/${data._id}/resume-career-items` };
        //return { related: '/resume-career-items' };
      },
    },
  },
});

Serializer.register('resumeCareerItem', {
  id: '_id',
  convertCase: 'kebab-case',
  relationships: {
    resumes: {
      type: 'resume',
      links(data) {
        return { related: `/resumes/${data._id}` };
      },
    },
  },
});

module.exports = Serializer;
