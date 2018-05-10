const Koa = require('koa');
const Router = require('koa-router');
const database = require('./common/db');
const cors = require('@koa/cors');

const port = 1234;

const app = new Koa();
const router = new Router();

app.use(cors());

const precipitation = require('./precipitation');
const temperature = require('./temperature');

router.get('/getPrecipitation', (ctx, next) => {
    ctx.body = precipitation;
});

router.get('/getTemperature', (ctx, next) => {
    ctx.body = temperature;
});

app.use(router.routes());

app.listen(port);
