const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// 코드 설명 ======>
//
// 위에 코드는 다음과 같다
//
// http호출 후 createServer를 통해 서버를 생성한다.
// 이 서버는 request와 response를 변수를 가지는 콜백함수를 가진다.
//
// var server = http.createServer(function(req, res) {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
//
// 서버를 웹에 띄우기 위해 listen을 해준다.
// 변수로는 port와 hostname을 가지며 콜백함수를 통해 서버를 정의한다.
// 
// server.lisen(port, hostname, function() {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
