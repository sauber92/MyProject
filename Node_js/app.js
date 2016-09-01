var express = require('express');
var app = express();

// public 이라는 디렉토리를 정적 서비스로 선언하겠다.
app.use(express.static('public'));

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
