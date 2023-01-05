"strict";
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
    field.appendChild(img);
  }
}

window.addEventListener("load", () => {
  onloadGameItems(".carrot", "carrot", 8);
  onloadGameItems(".bug", "bug", 8);
});

//1.타이머
//2.함수 : 당근을 눌렀을때 아이템 카운터 개수 감소
//3.아이템 카운터
//4.함수 : 벌레를 눌렀을 때 게임 오버
//5.게임오버
//6.리플레이버튼
//7.승리! 문구
//8.재생버튼 - 처음에 누르면 게임 시작 / 중간에 누르면 게임 중지 / 다시시작 버튼 활성화
