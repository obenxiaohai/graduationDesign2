var fs = require('fs');
var xlsx = require('node-xlsx');
/*
	examId:记录试卷号
	cur :记录当前题号
	content:记录题目内容
*/
var examId = 0;
var cur=1;
var content='';
exports.init = function(){
	fs.readFile('./init/info.json','utf8',function(err,data){
		var ini = JSON.parse(data);
		console.log('考试人数为：'+ ini.stuNum+'人');
		console.log('难度级别为：'+ ini.grade+'级');
		console.log('正在生成试卷。。')
		createQuestion(ini.stuNum,ini.grade,ini.singleS,ini.multiS,ini.judge,ini.shortA);
	});
};
/*
num:人数,grade:级别,
剩余参数为题型。
*/
function createQuestion(num,grade,singleS,multiS,judge,shortA){
	if(typeof num === 'number' && typeof grade === 'number'){
		for (var i = 0; i < num; i++) {
			cur=1;
			cur=gotQuestion(grade,singleS,cur);
			//cur=gotQuestion(grade,multiS,cur);
			//cur=gotQuestion(grade,judge,cur);
			//gotQuestion(grade,shortA,cur);
		}
	}
	else{
		console.log('info.json文件中的数据类型有误！请键入数字')
	}
}
//获取试题
function gotQuestion(grade,Quest_type,curQ){
	var data =null;
	var len=0;
	try{
		var obj = xlsx.parse('./questionbank/'+Quest_type[0]);
	}catch(e){
		console.log(Quest_type[0]+'题库不存在或文件格式错误！');
		throw new Error();
	}
	try{
		//obj[i]表示第i个工作表，i从0开始
		data = obj[grade-1].data;
		len  = data.length;
		}catch(e){
			console.log('不存在该难度题型！请重新设置！');
			throw new Error();
	}
	console.log(Quest_type[0]+'题库中共有'+len+'道题。');
	if(len<Quest_type[1]){
		console.log(Quest_type[0]+'题库中题目数量不足。');
		throw new Error();
	}
			
	
	//该句表示表一第一条记录的第一项。
	//console.log('data0:'+data[0][0]);
	//随机选题
	//for (var i = 1; i <= len; i++) {
	//	content += '"Q'+i+'":["'+data[i-1][0]+"\",\""+data[i-1][1]+"\"],"+'\n'
	//}
	var group = getRand(len,Quest_type[1]);

	switch(Quest_type[0]){
		case 'SingleSelect.xlsx': dealSingle(Quest_type,content,group,data,curQ);break;
		case 'MutiSelect.xlsx'  : 
		case 'Judgment.xlsx'    : dealMutiAndJudg(Quest_type,content,group,data,curQ);break;
		case 'ShortAnswer.xlsx' : dealShortA(Quest_type,content,group,data,curQ);break;
		default:break;
	}
	//console.log('Quest_type:'+Quest_type);
	//console.log(content);
	
	//console.log('group:'+getRand(len,Quest_type[1]));
	return curQ;
}


//随机数模块
/*
  param:
    len:题库中题目个数,Qnum:要抽出题目个数
  return:
       题目序号数组。
*/
function getRand(len,Qnum){
	var group = [];
	var sum = 1;
	var temp;
	var i = 0;
	group[0] = Math.floor( (Math.random() * (len-1) ) );
	while(sum !== Qnum){
	    i = 0;
	    temp = Math.floor( (Math.random() * (len-1) ) );
		for(i=0;i<sum;i++){
			if (group[i]=== temp) {
				temp = null;
				break;
			}
		}
		//console.log('i:'+i+',sum:'+sum);
		if(i === sum){
			group[sum] = temp;
			sum++;
		}
	}
	return group;

}

function writeToFile(id,data){
	fs.writeFile('./exam/'+id+'.json',data,function(){

		console.log('生成第'+id+'份试卷成功！');
	});
}

function dealSingle(Quest_type,content,group,data,curQ){
	content += '{';
	for (var i = 0; i < Quest_type[1]; i++) {
		content += '"Q'+(i+1)+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\"],"+'\n'
	}
	curQ += Quest_type[1];
}

function dealMutiAndJudg(Quest_type,content,group,data,curQ){
	for (var i = 0; i < Quest_type[1]; i++) {
		content += '"Q'+curQ+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\"],"+'\n'
	}
	curQ += Quest_type[1];
}


function dealShortA(Quest_type,content,group,data,curQ){
	for (var i = 0; i < Quest_type[1]; i++) {
		content += '"Q'+curQ+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\"],"+'\n'
	}
	curQ = 1;
	content+='}'
	examId++;
	writeToFile(examId,content);
}