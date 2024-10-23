// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다
// 랜덤번호 < 유저번호 Down
// 랜덤번호 > 유저번호 Up

// reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가, 버튼이 disable)

// 유저가 1~100 범위 밖에 숫자를 입력하면, 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다

// 변수 호출
let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resetButton = document.getElementById("reset-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let history = [];

// 이벤트 발생
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});
// 정답 호출(랜덤 번호 생성)
function pickRandomNumber() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("answer", computerNum);
}
/* play */
function play() {
  let userValue = userInput.value; // 유저의 값의 유저가 입력한 값과 같다
  // 1과 100사이의 숫자만 입력
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "Please Enter the Number Between 1 and 100";
    return;
  }
  //똑같은 숫자를 입력시 다시 입력 안내
  if (history.includes(userValue)) {
    resultArea.textContent = "You've already entered this number. Enter again";
    return;
  }

  //chances
  chances--; // chance는 1씩 사라짐
  chanceArea.textContent = `Chances left ${chances} left`;
  console.log("chance", chances);

  //결과값 안내
  if (userValue < computerNum) {
    resultArea.textContent = "Up";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down";
  } else {
    resultArea.textContent = "Correct";
    gameOver = true;
  }
  //하나씩 입력할때마다 배열 +1 증가
  history.push(userValue);
  // 게임 종료
  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver) {
    playButton.disabled = true;
  }
}
// 리셋
function reset() {
  userInput.value = "";
  pickRandomNumber();
  resultArea.textContent = "Here is the result";
  gameOver = false;
  playButton.disabled = false;
}

pickRandomNumber();
