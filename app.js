/* eslint-disable no-console */
const Koa = require('koa');
const cors = require('@koa/cors');
const dotenv = require('dotenv');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-body');
const mongoose = require('mongoose');
const beautifulUnique = require('mongoose-beautiful-unique-validation');
const appRoutes = require('./src/accounts/routes');
const passport = require('./src/libs/passport/index');

dotenv.config();
passport.initialize();


const app = new Koa();
const router = new KoaRouter({
  prefix: '/api',
});
app.use(cors());

app.use(bodyParser({
  multipart: true,
}));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
}, () => {
  // eslint-disable-next-line no-console
  console.log('connected to db!');
});
mongoose.plugin(beautifulUnique);


router.use('/accounts', appRoutes.routes());
app.use(router.routes());

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('Server is running!!!');
});
