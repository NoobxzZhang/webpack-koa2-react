require('./check-versions')();

const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const router = require('koa-router')();
const historyApiCallback = require('koa2-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackMiddleware = require('koa-webpack-middleware');
const log4js = require('log4js');

const webpackDevConfig = require('./webpack.dev.conf');
const webpackProConfig = require('./webpack.prod.conf');

const webpackConfig = process.env.NODE_ENV === 'production' ? webpackProConfig : webpackDevConfig;
const logConfig = require('../config/log');
const socketRoute = require('../socket/route');
const globalConfig = require('../config/global');

const app = new Koa();
const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  quiet: process.env.NODE_ENV === 'production',
  stats: {
    colors: true,
  },
});
const hotMiddleware = webpackMiddleware.hotMiddleware(compiler, {});

// 配置日志文件存储
log4js.configure(logConfig);
const loggerInfo = log4js.getLogger('info');
const loggerError = log4js.getLogger('error');

// 配置服务器启动
devMiddleware.waitUntilValid(() => {
  app.listen(globalConfig.port, err => {
    if (err) {
      console.log('Http Server start error', err);
      if (globalConfig.logOutput) {
        loggerError.error('Http Server start error', err);
      }
    }
    console.log('Http Server listening on port', globalConfig.port);
    if (globalConfig.logOutput) {
      loggerInfo.info('Http Server listening on port', globalConfig.port, 'with pid', process.pid);
    }
  });
});

// 配置静态资源服务器
app.use(koaStatic(path.resolve('static')));

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置 '/socket' 路由
router.post('/socket', socketRoute);
app.use(router.routes());
app.use(router.allowedMethods());

// 刷新浏览器重定向，使所有浏览器操作都指向index.html，需放除koa-router外的其他中间件前面
app.use(historyApiCallback());

// 引入webpack服务器
app.use(devMiddleware);

// 配置webpack热更新
app.use(hotMiddleware);

// 配置控制台日志中间件
app.use(koaLogger());

module.exports = app;
