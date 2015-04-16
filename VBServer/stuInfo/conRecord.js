var fs = require('fs');
var examPath = './exam/';
exports.WriteAnswer = function(paperID,ans){
	fs.readFile(examPath+paperID+'.json','utf8',function(err,data){
		var json = JSON.parse(data);
		var Qnum = ans.split('#$')[0];
		var answer = ans.split('#$')[1];
		json[Qnum][2] = answer;
		(function(json,paperID){
			fs.writeFile(examPath+paperID+'.json',JSON.stringify(json),'utf8',function(err){
				if(err) throw err;
			});
		})(json,paperID);
	});
};