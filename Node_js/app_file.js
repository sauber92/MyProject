// app_file.js 설명:
//    Node.js 를 활용한 웹앱 제작 실습
//
// 사용 디렉토리 설명:
//    1. data : 사용자가 등록한 파일 저장
//    2. views_file : 템플릿 엔진 저장
//    3. public_file : static 한 파일(html, css) 저장

// express 모듈 가져오기
var express = require('express');

// express를 사용하여 app라는 객체 생성
var app = express();

// post 방식 사용을 위한 bodyPaser 선언
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// file system 사용 선언
var fs = require('fs');

// jade 템플릿 사용
app.set('views', './views_file');
app.set('view engine', 'jade');
app.locals.pretty = true;

// app을 3000번 포트에 connect
app.listen(3000, function() {
  console.log('Connected, 3000 port!!!');
});
// 라우팅
app.get('/topic/new', function(req, res) {
  res.render('new');
});
app.get('/topic', function(req, res) {
  fs.readdir('data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('view', {topics:files});
  });
});
app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile('data/'+title, description, function(err) {
    if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    res.send('Sucess!');
  });
});
