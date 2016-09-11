var express = require('express');
var app = express();

// bodyParser 모듈 사용
var bodyParser = require('body-parser')

// 사용자가 POST 방식을 사용할 때,
// POST를 사용할 수 있도록 도와주는 bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// pretty한 코드(=정렬이 잘 되어있는)로 출력
app.locals.pretty = true;

app.get('/form', function(req, res) {
  res.render('form');
});

// get 방식:
// url 상에 입력한 모든 정보가 표시된다.
// 쿼리스트링으로 정보를 전달할 수 있는 장점이 있다.
app.get('/form_receiver', function(req, res) {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});

// post 방식:
// url 상에 입력한 정보가 표시 되지 않는다.
// 즉, 로그인과 같은 보안을 요구하는 곳에 사용해야한다.
// 물론 보안적으로 완전하지 못하다. 단순히 url 상에 표시가 안 되는 것
// 또한, url이 너무 길어지면 제대로 정보 전달이 안될 수 있다.
app.post('/form_receiver', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});

// query string
app.get('/topic/:id', function(req, res) {
  //res.send(req.query.id+','+req.query.name);
  var topics = [
    'Javascript is ...',
    'Node.js is ...',
    'Express is ...'
  ];

  // Semantic URL
  var output = `
      <a href="/topic?id=0">Javascript</a><br>
      <a href="/topic?id=1">Node.js</a><br>
      <a href="/topic?id=2">Express</a><br>
      ${topics[req.params.id]}
  `;

  res.send(output);
});

app.get('/topic/:id/:mode', function(req, res) {
  res.send(req.params.id+','+req.params.mode);
});

// express와 jade 템플릿 연결
app.set('view engine', 'jade');
// jade 템플릿이 들어갈 디렉토리 설정
app.set('views', './views');

// jade를 사용하는 템플릿 라우팅
app.get('/template', function(req, res) {
  // temp.jade를 렌더링
  // temp.jade에서 사용될 time이라는 객체 선언
  res.render('temp', {time:Date()});
});

// public 이라는 디렉토리를 정적 서비스로 선언하겠다.
// 정적으로 파일을 처리하면 요청이 들어올때마다 node가 그것을 잡아서 실행시켜준다.
// 즉, node 서버를 재실행하지 않아도 곧장 반영이 된다.
app.use(express.static('public'));

// dynamic 디렉토리는 동적서비스로 사용하겠다.
// 그러기 위해 output이라는 변수를 통해 html 코드를 집어넣었다.
// 하지만 dynamic 을 실행하기 위해선 node 서버를 재실행해야 반영이 된다.
// 이런 점에선 동적실행보단 정적실행이 웹페이지 작성엔 좋다.
// 동적실행은, 반복적인 수행을 해야할 때 좋다.
app.get('/dynamic', function(req, res) {
  var output = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dynamic homepage</title>
    </head>
    <body>
      <p>Hello Dynamic!</p>
    </body>
  </html>
`;
  res.send(output);
});

// 사용자가 웹에 접속하는 방식에는 get과 post가 있다.
// 일반적으로 url을 통해 접속하는 방법은 get이다.
//
// get방식으로 접속한 사용자 중 "홈페이지"로 접속하는 사람들을 위해
// get('/', ); 을 사용한다.  ====> 홈페이지(root page) = /
// get('address',callback);
//
// 이러한 get을 "라우터" 라고 하고
// get이 하는 일을 "라우팅" 이라고 한다.
// 라우터 : 길을 찾는 일을 수행
// 라우팅 : 길을 찾는 일
//
// 사용자는 라우터에 의해 라우팅된 주소로 접속하면
// callback 함수(Controller)가 실행되면서
// 웹의 기능이 수행된다.
app.get('/', function (req, res) {
  res.send('Home page');
});

app.get('/login', function (req, res) {
  res.send('Please login');
});

// express를 연결하는 linsten, listen은 서버가 포트를 바라보게 해준다.
// listen(port, callback);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
