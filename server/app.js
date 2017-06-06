const express = require("express");
const http = require("http");
const crypto = require('crypto');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const Encrypt = require('./crypto.js');
// const hbs = require('hbs');
const path = require('path')
const port = process.env.PORT || 3838

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.set('views', './views');
// app.set('view engine', 'hbs');

function createWebAPIRequest(path, data, cookie, response, method) {
	method = method ? method : "POST"
	var music_req = '';
	var cryptoreq = Encrypt(data);
    console.log(cryptoreq)
	var http_client = http.request({
		hostname: 'music.163.com',
		method: method,
		path: path,
		headers: {
			'Accept': '*/*',
			'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
			'Connection': 'keep-alive',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Referer': 'http://music.163.com',
			'Host': 'music.163.com',
			'Cookie': 'appver=2.0.2',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
		}
	}, function(res) {
		res.on('error', function(err) {
			response.status(502).send('fetch error');
		});
		res.setEncoding('utf8');
		if(res.statusCode != 200) {
			createWebAPIRequest(path, data, cookie, response, method);
			return;
		} else {
			res.on('data', function(chunk) {
				music_req += chunk;
			});
			res.on('end', function() {
				if(music_req == '') {
					createWebAPIRequest(path, data, cookie, response, method);
					return;
				}
				if(res.headers['set-cookie']) {
					response.set({
						'Set-Cookie': res.headers['set-cookie'],
					});
					response.send({
						code:200,
						c: res.headers['set-cookie'],
						i: JSON.parse(music_req)
					});
					return;
				}
				response.send(music_req);
			})
		}
	});
	http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
	http_client.end();
}

function createRequest(path, method, data, callback) {
	var ne_req = '';
	var http_client = http.request({
		hostname: 'music.163.com',
		method: method,
		path: path,
		headers: {
			'Referer': 'http://music.163.com',
			'Cookie': 'appver=2.0.2',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			ne_req += chunk;
		});
		res.on('end', function() {

			callback(ne_req);
		})
	});
	if(method == 'POST') {
		http_client.write(data);
	}
	http_client.end();
}

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3838");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.post('/search', function(req, res) {
    var keywords = req.query.keywords || '';
	var type = req.query.type || 1;
	var offset = req.query.offset || '0';
	var limit = req.query.limit || 20;
    // var cookie = req.cookies;

    
	var cookie = req.get('Cookie') ? req.get('Cookie') : (req.query.cookie ? req.query.cookie : '');
	var data = {
		"s": keywords,
		"offset": offset,
		"limit": limit,
		"type": type
	};
    console.log(data, cookie)
	createWebAPIRequest('/weapi/cloudsearch/get/web', data, cookie, res)
})
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

http.createServer(app).listen(3838,function(){console.log("chenggong")});

