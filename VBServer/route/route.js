var access = require('../stuInfo/conAccess');
var record = require('../stuInfo/conRecord');
var recordAll = require('../stuInfo/conRecordAll');
var getfinalScore = require('../stuInfo/conGetScore');
exports.route = function(str,socket){
	var toPath;
		//这里有一个事实：如果传入的字符串没有@#$，
		//那么数组长度为1，arr[1]的值为undifined.
		//如果有@#$，且冒号后面没有内容，那么arr[1]==""
	toPath = str.split('@#$');
	//login:
	//"login@#$jia@#$pasword"
	//upload:
	//"upload@#$paperID@#$ans"
	//uploadAll:
	//"uploadAll@#$paperID@#$ans"
	switch(toPath[0]){
		case 'login' : toLogin(toPath[1],toPath[2],socket);break;
		case 'upload':  toUpload(toPath[1],toPath[2]);break;
		case 'uploadAll': toUploadAll(toPath[1],toPath[2]);break;
		case 'getScore' :toGetScore(toPath[1]);break;
		default : return 'err';
	}
}

function toLogin(name,password,socket){
	//console.log('name:'+name);
	access.Login(name,password,socket);
}
function toUpload(paperID,ans){
	record.WriteAnswer(paperID,ans);
}
function toUploadAll(paperID,ans){
	recordAll.WriteAnswer(paperID,ans);
}

function toGetScore(paperID){
	getfinalScore.GetGrades(paperID);
}