//渲染场景
document.addEventListener("loadImageSuccess", function (e) {
  console.log("使用图片创建场景...");
  setTimeout(function () {
    console.log("创建场景完成");
  }, 2000)
});
//渲染音效
document.addEventListener("loadMusicSuccess", function (e) {
  console.log("使用音乐创建音效...");
  setTimeout(function () {
    console.log("创建音效完成");
  }, 500)
});