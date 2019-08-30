// eslint-disable-next-line import/no-extraneous-dependencies
const Fixtures = require('node-mongodb-fixtures');

const url = 'mongodb+srv://yuriy_90:121790yura@clusterdb2internship-8gkox.mongodb.net/test?retryWrites=true&w=majority';
const path = require('path');

const fixtures = new Fixtures({
  dir: path.join(__dirname, '/fixtures'),
  filter: 'categories.*',
});

fixtures
  .connect(url)
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .finally(() => fixtures.disconnect());
