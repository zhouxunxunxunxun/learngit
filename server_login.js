const http = require('http');
const fs = require('fs');
const querystring=require('querystring');
const urllib = require('url');

var users = {}//储存用户信息 名字:密码

var server = http.createServer(function (req,res){
	//解析数据
	var str = '';
	req.on('data',function (data){
		str += data;
	});
	req.on('end',function(){
		var obj = urllib.parse(req.url,true);
		const url = obj.pathname;
		const GET = obj.query;
		const POST = querystring.parse(str);//将字符串转化为json格式
		//区分————接口或文件
		if(url == '/user'){//接口
			switch(GET.act){
				case 'reg':
				//检查用户名是否已经有了
				//插入users
				if(users[GET.user]){
					res.write('{"ok":false,"msg":"此用户已存在"}');
				}else{
					//插入用户名
					users[GET.user] = GET.pass;
					res.write('{"ok":true,"msg":"注册成功"}');
				}
				break;
				case 'login':
				//检查用户是否存在
				//检查用户密码是否正确
				if(users[GET.user]==null){
					res.write('{"ok":false,"msg":"此用户不存在"}');
				}else if(users[GET.user] != GET.pass){
					res.write('{"ok":false,"msg":"用户名或密码有误"}');	
				}else{
					res.write('{"ok":true,"msg":"登陆成功"}');
				}
				break;
				default:
				res.write('{"ok":false,"msg":"未知的act"}');
				break;
			}
			res.end();
		}else{//文件
									//读取文件
			var filename = './www'+url;
			fs.readFile(filename,function(err,data){
				if(err){
					res.write('404');
				}else{
					res.write(data);
				}
				res.end();
			});
		}
	});
});

server.listen(8080);     