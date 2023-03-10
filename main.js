"strict";

let audio;
function playAudio(audio) {
  switch (audio) {
    case "carrot":
      audio = new Audio("sound/carrot_pull.mp3");
      break;
    case "bug":
      audio = new Audio("sound/bug_pull.mp3");
      break;
    case "alert":
      audio = new Audio("sound/alert.wav");
      break;
    case "win":
      audio = new Audio("sound/game_win.mp3");
      break;
    default:
      audio = new Audio("sound/bg.mp3");
  }
  audio.play();
}

//사운드
const BGM = document.getElementById("bg");
window.addEventListener("load", () => {
  BGM.loop = true;
  BGM.autoplay = true;
});

//Timer
const GameTimer = document.querySelector(".game__timer");
let time = 20;
let sec = "";
let Timer = setInterval(() => {
  sec = time % 60;
  GameTimer.innerHTML = sec + "초";
  time--;

  //타임 아웃
  if (time < 0) {
    clearInterval(Timer);
    GameAlert("Time Over");
    playAudio("alert");
  }
}, 1000);

//Game Items
const field = document.querySelector(".game__field");
const fieldWidth = field.offsetWidth - 60;
const fieldHeight = field.offsetHeight - 60;

function onloadGameItems(image, imageName, num) {
  for (let index = 0; index < num; index++) {
    const item = document.querySelector(image);
    const positionInfo = item.getBoundingClientRect();
    const imgHeight = positionInfo.height;
    const imgWidth = positionInfo.width;
    const itemLeft = Math.floor(Math.random() * (fieldWidth - imgWidth));
    const itemTop = Math.floor(Math.random() * (fieldHeight - imgHeight));
    const img = new Image();
    img.src = `img/${imageName}.png`;
    img.className = `${imageName}`;
    img.style = `position: absolute; left:${itemLeft}px; top:${itemTop}px; `;
    img.id = `${index + 1}`;
    field.appendChild(img);
  }
}

//당근과 벌레 로드
onloadGameItems(".carrot", "carrot", 8);
onloadGameItems(".bug", "bug", 8);

//플레이 정지
const button = document.querySelector(".game__btn");

button.addEventListener("click", () => {
  button.innerHTML = `<i class="fa-solid fa-stop"></i>`;
  clearInterval(Timer);
  GameAlert("Stop Game");
  playAudio("alert");
});

//당근 개수 표시
const counter = document.querySelector(".game__couter");
const carrot = document.querySelectorAll(".carrot");
const carrotArray = Array.prototype.slice.call(carrot);
counter.innerHTML = carrotArray.length;
const bug = document.querySelectorAll(".bug");
const bugArray = Array.prototype.slice.call(bug);

//당근을 눌렀을때 개수 감소, 당근 오브젝트
let count = carrotArray.length - 1;
for (let i = 0; i < carrotArray.length; i++) {
  carrotArray[i].addEventListener("click", (event) => {
    if (Array.isArray(carrotArray)) {
      for (let i = 0; i < carrotArray.length; i++) {
        if (i == event.target.id) {
          counter.innerHTML = count--;
          let carrotImg = document.getElementById(`${i}`);
          carrotImg.parentNode.removeChild(carrotImg);
          playAudio("carrot");
        }
      }
    }

    if (counter.innerHTML == "0") {
      //승리! 문구
      clearInterval(Timer);
      GameAlert("You Win");
      playAudio("alert");
      playAudio("win");
    }
  });
}

const gameAlert = document.getElementById("game__alert");
const bord = document.getElementById("game__bord");
const result = document.getElementById("game__context");
const replay = document.getElementById("replay");

function GameAlert(message) {
  gameAlert.style.zIndex = "1";
  bord.style.visibility = "visible";
  result.style.visibility = "visible";
  result.innerHTML = message;
  replay.style.visibility = "visible";
}
//벌레 눌렀을때 게임 종료, Game Over문구
for (let i = 0; i < bugArray.length; i++) {
  bugArray[i].addEventListener("click", () => {
    if (Array.isArray(bugArray)) {
      clearInterval(Timer);
      GameAlert("Game Over");
      playAudio("bug");
      playAudio("alert");
    }
  });
}

//리플레이버튼
replay.addEventListener("click", () => {
  location.reload();
});

/**아쉬운 점
 * 1. 옵저버 카운터에 사용하면 될 것 같은데 어떻게 접근해야할지 어렵다ㅠㅠ
 * 2. 2중 for문을 사용했다. BigO가 커질 것
 * 3. 직관적이지 않은 변수 이름
 * 4. filter를 이용해 배열에서 특정한 요소를 삭제하고 재정렬하는 방식으로 작업하고 싶었는데
 * 그러지 못했다. 결국 배열은 줄어들지 않고 카운터만 줄어드는 방식으로 작업했는데..
 * 지금 게임에는 상관없지만, 만일 당근이 줄어들었을 때의 배열 데이터가 필요하다면 다시 작업해야 할 것.
 *
 * 해결 못한 문제 : BGM이 제대로 재생되지 않는다. 무조건 로드를 다시 한 번 해야하고 오디오의 play함수에서 DOM 문제가 발생한다..
 *
 * **/
