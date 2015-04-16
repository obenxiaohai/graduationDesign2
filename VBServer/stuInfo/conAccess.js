var access = require('./access.js'); 
var util = require('util'); 
var fs = require('fs');
var accessfile = './demo.mdb';
var examPath = './exam/';
var paperID = 1;
exports.toStoreScore = function(sumGrade,paperID){
	var paperid = parseInt(paperID);
	access.execute({ 
	accessfile: 'demo.mdb', 
	//sql: "UPDATE demo SET paperID = "+paperid+" WHERE id ="+"'"+id+"'"
	sql: util.format("UPDATE demo SET score =%d WHERE paperID =%d",+sumGrade,+paperid)
	}, function(data){ 
	//console.log(data); 
	}); 
};
exports.Login = function(name,pwd,socket){
	 access.query({ 
		accessfile: accessfile, 
		//sql: "SELECT password FROM demo WHERE id="+"'"+name+"'"
		sql: util.format("SELECT password,paperID FROM demo WHERE id='%s'",+name)
		}, function(data){
		var password;
		var realPaperId;
		var finish_exam;	
		try{
			password = data.records[0].password;
			realPaperId = data.records[0].paperID;
			finish_exam = data.records[0].score;
			console.log('finish_exam:'+parseInt(finish_exam));
			console.log('finish_exam==NaN?'+isNaN(parseInt(finish_exam)));
		}catch(e){

		}
		console.log('password:'+password+' '+'pwd:'+pwd);
		if(password == pwd && isNaN(parseInt(finish_exam))){
			(function(paperID,name){
				fs.readFile(examPath+paperID+'.json','utf8',function(err,data){
					if (err) throw err;
					try{
						socket.write('ok@#$'+paperID+'@#$'+data+'@#$\r\n');
						console.log('data传输给用户:'+data);
						givePaperID(paperID,name);
					}catch(e){
						console.log('学号为'+name+'的考生断开连接');
						//Ensures that no more I/O activity happens on this socket. 
						//Only necessary in case of errors (parse error or so).
						//socket.destroy();
					}

			    });
			})((  isNaN(realPaperId) || realPaperId == 0)?paperID:realPaperId,name);
			if( isNaN(parseInt(realPaperId) ) || parseInt(realPaperId) == 0)
				paperID++;
		}else{
			try{
				socket.write('notok\r\n');
				console.log('not OK for login');
			}catch(e){
				console.log('学号为'+name+'的考生断开连接');
				//socket.destroy();
			}
			//console.log('notok');
		} 
	}); 

};
//Login('2011310200801',123,'hello');
function givePaperID(paperID,id){
	var paperid = parseInt(paperID);
	access.execute({ 
	accessfile: 'demo.mdb', 
	//sql: "UPDATE demo SET paperID = "+paperid+" WHERE id ="+"'"+id+"'"
	sql: util.format("UPDATE demo SET paperID =%d WHERE id ='%s'",+paperid,+id)
	}, function(data){ 
	//console.log(data); 
	}); 
}


