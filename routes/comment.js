var express = require('express');
var router = express.Router();

// 加载评论页面
router.get('/', function(req, res, next) {
	res.render('comment', {
		title: '评论列表',
		name: 'linyu'
	});
});

module.exports = router;