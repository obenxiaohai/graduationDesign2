var fs = require('fs');
var argument = process.argv.splice(2);
fs.readFile('./init/info.json','utf8',function(err,data){
	if(err) throw err;
	var data = JSON.parse(data);

	data['stuNum'] = parseInt(argument[0]);
	data['grade'] = parseInt(argument[1]);
	//every question's score
	data['singleS'][2] = parseInt(argument[2]);
	data['multiS'][2] = parseInt(argument[3]);
	data['judge'][2] = parseInt(argument[4]);
	data['shortA'][2] = parseInt(argument[5]);
	fs.writeFile('./init/info.json',JSON.stringify(data),'utf8',function(err){
		console.log('ok');
	});
});