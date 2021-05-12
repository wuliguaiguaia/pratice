// 加载图片
document.addEventListener("gameStart", function () {
  console.log("加载图片...");
  setTimeout(function () {
    console.log("加载图片完成");
    document.dispatchEvent(new Event("loadImageSuccess"));
  }, 1000);
});