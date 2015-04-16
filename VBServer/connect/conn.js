var net = require('net');
var server = net.createServer();
var sockets = [];
var stuNum = 1;
var fs = require('fs');
var router = require('../route/route');
exports.createServer = function(){

	server.on('connection',function(socket){
	console.log('got a new connection.');
	socket.setEncoding('utf8');
	socket.setNoDelay(true);
	var str = '';
	var content = '';
	//sockets.push(socket);
	socket.on('data',function(data){
		//console.log('got data: ',data);
		//route函数，用于区分login操作或upload
		//格式: login@#$name@#$password@#$ans@#ans@#ans
		try{
			router.route(data,socket);
			str+=data;
		}catch(e){
			console.log('连接出现问题');
		}

	});
	process.on('uncaughtException', function (err) {
  		console.error(err.stack);
  		console.log("Node NOT Exiting...");
	});
	socket.on('end',function(){
		//console.log('got data:',str);
		//route(str);
	});
});
server.on('error',function(err){
	console.log('Server error:',err.message);
	socket.close();
});
server.on('close',function(){
	console.log('Server closed.');
	//var index = sockets.indexOf(socket);
	//sockets.splice(index,1);
});
server.listen(4001);
console.log('4001端口监听启动，开始试题分发。');		
};
