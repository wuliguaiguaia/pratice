import "./loadImage.js"
import "./loadMusic.js"
import "./initScene.js"
var start = document.getElementById("start");
start.addEventListener("click", function (e) {
  console.log("游戏开始！");
  document.dispatchEvent(new Event("gameStart"));
})