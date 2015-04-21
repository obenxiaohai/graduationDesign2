var fs = require('fs');
var examPath = './exam/';
//使用@#区分题间。使用#$区分题号与答案
exports.WriteAnswer = function(paperID,ans){
	console.log("用户提交全部题："+ans);
	fs.readFile(examPath+paperID+'.json','utf8',function(err,data){
		var json = JSON.parse(data);
		var ansGroup = ans.split('@#');
		var len = ansGroup.length;
		ansGroup.forEach(function(Q_ans){
			var Qnum = Q_ans.split('#$')[0];
			console.log("Qnum:"+Qnum);
			console.log("Q_ans:"+Q_ans);
			var answer = Q_ans.split('#$')[1];
			console.log("answer:"+answer);
			console.log("json[Qnum]:"+json[Qnum]);
			try{
				json[Qnum][2] = answer;
			}catch(e){}
			if(Qnum == 'Q'+(len-1)){
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