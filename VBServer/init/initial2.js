var fs = require('fs');
var xlsx = require('node-xlsx');

/*
	cur :记录当前题号
	examId:记录试卷号
*/
var cur = 1; 
var examId = 0;

exports.init = function(){
	fs.readFile('./init/info.json','utf8',function(err,data){
		if(err) throw err;
		var ini = JSON.parse(data);
		console.log('考试人数为：'+ ini.stuNum+'人');
		console.log('难度级别为：'+ ini.grade+'级');
		console.log('正在生成试卷。。');
		createQuestion(ini.stuNum,ini.grade,ini.singleS,ini.multiS,ini.judge,ini.shortA);
	});
};


/*
num:人数,grade:级别,
剩余参数为题型。
*/
function createQuestion(num,grade,singleS,multiS,judge,shortA){
	if(typeof num === 'number' && typeof grade === 'number'){		
		gotQuestion(num,grade,singleS,multiS,judge,shortA,cur);	
	}
	else{
		console.log('info.json文件中的数据类型有误！请键入数字');
	}
}

function gotQuestion(num,grade,singleS,multiS,judge,shortA){
	//obj用于保存题库题目总数与数据。
	var obj1 = getDataObj(grade,singleS);
	var obj2 = getDataObj(grade,multiS);
	var obj3 = getDataObj(grade,judge);
	var obj4 = getDataObj(grade,shortA);
	for (var i = 0; i <num ; i++) {
		createExam(obj1,obj2,obj3,obj4,singleS,multiS,judge,shortA);
	}
}

function getDataObj(grade,Quest_type){
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
	return [data,len];
}


function createExam(obj1,obj2,obj3,obj4,singleS,multiS,judge,shortA){
	var data = obj1[0];
	var len = obj1[1];
	var curQ = 1;
	var group = getRand(len,singleS[1]);
	var content = '{';
	for (var i = 0; i < singleS[1]; i++) {
		content += '"Q'+(i+1)+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\",\"\",\"Single\",\"\"],"+'\n'
	}
	curQ += singleS[1];
	data = obj2[0];
	len = obj2[1];
	group = getRand(len,multiS[1]);
	for (var i = 0; i < multiS[1]; i++) {
		content += '"Q'+(curQ+i)+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\",\"\",\"Multi\",\"\"],"+'\n'
	}
	curQ += multiS[1];
	data = obj3[0];
	len = obj3[1];
	group = getRand(len,judge[1]);
	for (var i = 0; i < judge[1]; i++) {
		content += '"Q'+(curQ+i)+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\",\"\",\"Judge\",\"\"],"+'\n'
	}
	curQ += judge[1];
	data = obj4[0];
	len = obj4[1];
	group = getRand(len,shortA[1]);
	for (var i = 0; i < shortA[1]; i++) {
		if(i < shortA[1]-1)
		content += '"Q'+(curQ+i)+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\",\"\",\"Short\",\"\"],"+'\n';
		else
		content += '"Q'+(curQ+i)+'":["'+data[group[i]][0]+"\",\""+data[group[i]][1]+"\",\"\",\"Short\",\"\"]"+'\n';	
	}

	content+='}'
	examId++;
	writeToFile(examId,content);
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