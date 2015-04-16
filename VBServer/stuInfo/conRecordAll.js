var fs = require('fs');
var examPath = './exam/';
exports.WriteAnswer = function(paperID,ans){
	fs.readFile(examPath+paperID+'.json','utf8',function(err,data){
		var json = JSON.parse(data);
		var ansGroup = ans.split('@#');
		var len = ansGroup.length;
		ansGroup.forEach(function(Q_ans){
			var Qnum = Q_ans.split('#$')[0];
			var answer = Q_ans.split('#$')[1];
			json[Qnum][2] = answer;
			if(Qnum == 'Q'+len){
				fs.writeFile(examPath+paperID+'.json',JSON.stringify(json),'utf8',function(err){
					if(err) throw err;
				});
			}
		});
	});

};

exports.WriteGrade = function(paperID,json){

	fs.writeFile(examPath+paperID+'.json',JSON.stringify(json),'utf8',function(err){
		if(err) throw err;
		});
}