var fs = require('fs');

// Sync
console.log('Sync ======>');
var data = fs.readFileSync('./data.txt', {encoding: 'utf8'});
console.log(data);

// Async
console.log('Async ======>');
fs.readFile('./data.txt', {encoding: 'utf8'}, function(error, data) {
  console.log(1);
  console.log(data);
});

console.log(2);


// 11번째줄[console.log(1)]과, 15번째줄[console.log(2)]의 결과를 보면
// 15번째 줄이 먼저 실행되는 것을 볼 수 있다.
// 이것은 readFile이 비동기 방식이기 때문이며 수행 과정을 살펴보면
// 9번째줄 출력 -> 10번째 줄 작업 시작 후 곧장 15째줄 출력이 이루어진다.
// 그 후, 10번째 줄의 작업이 끝나면 콜백함수가 실행되는 것이다.
// 이렇게 비동기방식은 작업을 백그라운드로 맡긴 후 자기 작업을 수행하는 것으로
// 백그라운드에서 돌아가는 애는 자신의 작업을 별도 수행 후 본 작업에게 알려준다.
