var get_score_Qnum = require('../init/initial2');
var fs = require('fs');
var StoreScore = require('./conAccess');
var conRecord = require('./conRecordAll');
/*
partScore:
 获取到的数组元素分别为【单选，多选，判断，简答】
 Qnum:
 获取题目的总数
*/
var initPath = './init/info.json'
var partScore;
var Qnum;
var examPath = './exam/';
exports.GetGrades = function(paperID){
	fs.readFile(initPath,'utf8',function(err,data){
		if(err) throw err;
		var ini = JSON.parse(data);
		partScore= [ini.singleS[2],ini.multiS[2],ini.judge[2],ini.shortA[2]];
		Qnum = ini.singleS[1]+ini.multiS[1]+ini.judge[1]+ini.shortA[1];
		toGet(paperID);
	});
};
function toGet(paperID){
	console.log(Qnum);
	console.log("partScore"+partScore);
	fs.readFile(examPath+paperID+'.json','utf8',function(err,data){
		var json = JSON.parse(data);
		console.log('json:'+json)
		var sumGrade = 0;
		for (var i = 1; i <= Qnum; i++) {
				var arr = json['Q'+i];
				switch(arr[3]){
					case 'Single': (arr[1] == arr[2])?(json['Q'+i][4]=partScore[0]):(json['Q'+i][4]=0);break;
					case 'Multi' : (arr[1] == arr[2])?(json['Q'+i][4]=partScore[1]):(json['Q'+i][4]=0);break;
					case 'Judge' : (arr[1] == arr[2])?(json['Q'+i][4]=partScore[2]):(json['Q'+i][4]=0);break;
					case 'Short' : (arr[1] == arr[2])?(json['Q'+i][4]=partScore[3]):(json['Q'+i][4]=0);break;
				}
				sumGrade += (parseInt(json['Q'+i][4]) ==NaN)?0:parseInt(json['Q'+i][4]);
		}
		console.log("总分:"+sumGrade);
		conRecord.WriteGrade(paperID,json);
		StoreScore.toStoreScore(sumGrade,paperID);
	});
}