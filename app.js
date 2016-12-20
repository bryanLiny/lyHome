var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 设置端口
app.set('port', process.env.PORT || 3000);
// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));
// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'jade');
/* 
//也可以采用hbs,解析html静态模板
// 加载hbs模块
var hbs = require('hbs');
// 指定模板文件的后缀名为html
app.set('view engine', 'html');
// 运行hbs模块
app.engine('html', hbs.__express);*/

// 设定favorite icon 存放路径
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// 静态文件存放路劲
app.use(express.static(path.join(__dirname, 'public')));

// 引入中间件
app.use('/', routes);
app.use('/users', users);

// 处理404错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 开发环境，服务器500错误处理，并打印错误栈轨迹
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境，服务器500错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;