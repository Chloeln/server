const express = require("express");
//引入中间件
const getdata = require("./getData.js");
const mysql = require("mysql");
//自动生成UUID
// const {u4: uuid4} = require('uuid')
//创建数据库链接
const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'web'
});
//创建路由
const router = express.Router();
// router.use(getdata);

//登录 /login
router.post("/login", (req, res) => {
	// console.log(req.body);
	let user = req.body;
	db.query("select * from user where username = ? and password = ?",
		[user.username, user.password], (err, result) => {
			if(err){
				console.log(err.message);
				res.send({
					status: 0,
					msg: "登录失败",
					data: result
				});
				return ;
			}
			if (result != "") {
				console.log(result)
				res.send({
					status: 1,
					msg: "登录成功",
					data: result,
					token: result[0].id
				});
			}else{
				res.send({
					status: 2,
					msg: "登录失败",
					data: result
				});
			}
		});
});
//注册 /reg
router.post("/reg",(req,res)=>{
	//接收数据
	let user = req.body;
	console.log(user);
	//把数据插入到数据库中
	db.query("insert into user(id,username,password)values(?,?,?)",
	[user.id,user.username,user.password],(err,result)=>{
		if(err){
			console.log(err.message);
			res.send({
				status: 0,
				msg: "注册失败",
			});
			return ;
		}
		if(result. affectedRows === 1){
			res.send({
				status: 1,
				msg: "注册成功",
			});
		}
	})
})



//用户信息修改 /updateuser

//查询所有 /queryall  
router.get("/index",(req,res)=>{
	db.query("select * from user",(err,result)=>{
		if(err){
			return console.log(err.message);
		}
		res.send({
			status: 200,
			msg: "获取数据列表成功",
			data: result
		});
	})
	
})
//查询某一个 /querybook

//添加数据 /addbook

//更新 /updatebook

//删除 /deletebook

//共享路由
module.exports = router;
