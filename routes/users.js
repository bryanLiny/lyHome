var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* 获取用户 */
router.get('/', function(req, res, next) {
	res.render('users');
});

/* 新增用户 */
router.get('/addUser', function(req, res, next) {

	userDao.add(req, res, next);
});

// 查找
router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});

// 查找ById 
router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});

// 删除
router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});

// 更新 
router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});

module.exports = router;