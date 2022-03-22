const express = require("express");
//主要处理前端发送的json字符串
const bodyparser = require("body-parser")
//引入路由模块
const router = require("./router.js");
const app = express();

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyparser.json());

app.use("/api",router);

app.listen(80,()=>{
	console.log("服务器开启");
});