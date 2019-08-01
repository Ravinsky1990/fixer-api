const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-body');
const mongoose = require('mongoose');
const appRoutes = require('./src/routes');

const app = new Koa();
const router = new KoaRouter();


app.use(bodyParser());

mongoose.connect('mongodb+srv://yuriy_90:121790yura@clusterdb2internship-8gkox.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

router.use(appRoutes.routes());
app.use(router.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running!!!');
});
