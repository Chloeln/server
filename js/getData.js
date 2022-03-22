//引入queryString模块
const qs = require("querystring");	
const getData = function (req,res,next){
	//先定义一个变量用于接收数据的
	let data = '';
	//定义一个用于接收数据的事件
	req.on("data",function(chunk){
		//把ascii码转换成string类型
		data += chunk;
		
	} );
	//数据接收完成后做的事情,就是把数据解析成json对象
	req.on("end",function(){
		//不能通过JSON进行转换
		// console.log(JSON.parse(data));
		req.body = qs.parse(data);
		// req.body = data;
		next();
	});
}
module.exports = getData;


