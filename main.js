"strict";

//게임오버 문구
//승리! 문구
//리플레이버튼
//재생버튼 - 처음에 누르면 게임 시작 / 중간에 누르면 게임 중지 / 다시시작 버튼 활성화

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
    img.style = `position: absolute; left:${itemLeft}px; top:${itemTop}px;`;
    img.id = `${index + 1}`;
    field.appendChild(img);
  }
}

const button = document.querySelector(".game__btn");

onloadGameItems(".carrot", "carrot", 8);
onloadGameItems(".bug", "bug", 8);

//당근 개수 표시
const counter = document.querySelector(".game__couter");
const carrot = document.querySelectorAll(".carrot");
const InitCarrotCount = Array.prototype.slice.call(carrot);
const carrotArray = Array.prototype.slice.call(carrot);
counter.innerHTML = carrotArray.length;

const bug = document.querySelectorAll(".bug");
const bugArray = Array.prototype.slice.call(bug);

//당근을 눌렀을때 개수 감소, 당근 오브젝트
for (let i = 0; i < carrotArray.length; i++) {
  carrotArray[i].addEventListener("click", (event) => {
    if (Array.isArray(carrotArray)) {
      for (let i = 0; i < InitCarrotCount.length; i++) {
        if (i == event.target.id) {
          carrotArray.splice(i, 1);
          counter.innerHTML = carrotArray.length;
          let carrotImg = document.getElementById(`${i}`);
          carrotImg.parentNode.removeChild(carrotImg);
        }
      }
    }
  });
}

//벌레 눌렀을때 게임 종료
for (let i = 0; i < bugArray.length; i++) {
  bugArray[i].addEventListener("click", (event) => {
    if (Array.isArray(bugArray)) {
      clearInterval(Timer);
      console.log("게임오버");
    }
  });
}
