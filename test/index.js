function fn() {
  throw new Object({
    errCode: "1001",
    message: "生成py文件失败",
  })
}

try {
  fn()
} catch (err) {
  console.log(err);
}