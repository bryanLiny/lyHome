/*process.stdin.resume();
process.on('SIGINT',function(){
	console.log("Got a SIGINT Exiting");
	process.exit(0);
});*/

/*杀死子进程*/
/*var spawn = require('child_process').spawn;
var ping = spawn('ping', ['bbc.co.uk']);

ping.stdout.setEncoding('utf8');
ping.stdout.on('data', function(data) {
	console.log(data);
});
ping.on('exit', function(data, signal) {
	console.log('child process was killed with a ' + signal + ' signal');
});
ping.kill('SIGINT');*/

/*集群*/
//cluster的功能是创建与CPU 核心个数相同的服务器进程，
//以确保充分利用多核CPU的资源
var cluster = require('cluster');
var http = require('http');
var os = require('os');
var cpu = os.cpus().length;

var workers = {};

if (cluster.isMaster) {
	console.log('Master process started with PID:' + process.pid);
	cluster.on('death', function(worker) {
		console.log('worker ' + worker.pid + ' died');
		delete workers[worker.pid];
		worker = cluster.fork();
		workers[worker.pid] = worker;
	});
	for (var i = cpu - 1; i >= 0; i--) {
		var worker = cluster.fork();
		workers[worker.pid] = worker;
	};
} else {
	console.log('Worker process started with PID:' + process.pid);
	var app = require('./app');
	app.listen(3000);
}

process.on('SIGTERM', function() {
	for (var pid in workers) {
		process.kill(pid);
	};
	process.exit(0);
});

/*事件*/
//var EventEmitter = require('events').EventEmitter;
//var ee = new EventEmitter();
//ee.emit('message', 'This is a message!');
// ee.on('message', function(data) {
// 	console.log(data);
// });
// ee.on('self destruct', function() {
// 	console.log('The message is destructed !');
// });
// ee.emit('message', 'This is a secret message,destruct 5 seconds');
// setTimeout(function() {
// 	ee.emit('self destruct');
// }, 5000);

// setTimeout(function(){
// 	console.log('Sending first ping');
// 	ee.emit('ping');
// },2000);

// ee.on('ping',function(){
// 	console.log('Got ping');
// 	setTimeout(function(){
// 		ee.emit('pong');
// 	},2000);
// });

// ee.on('pong',function(){
// 	console.log('Got pong');
// 	setTimeout(function(){
// 		ee.emit('ping');
// 	},2000);
// });



