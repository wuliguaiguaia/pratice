//加载音乐
document.addEventListener("gameStart", function () {
  console.log("加载音乐...");
  setTimeout(function () {
    console.log("加载音乐完成");
    document.dispatchEvent(new Event("loadMusicSuccess"));
  }, 2000);
});