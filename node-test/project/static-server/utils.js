exports.parseRange = function (str, size) {
  if (str.indexOf(",") !== -1) {
    return;
  }
  let range = str.split("-"),
    start = parseInt(range[0], 10),
    end = parseInt(range[1], 10);
  // Case: -100
  if (isNaN(start)) {
    start = size - end;
    end = size - 1;
    // Case: 100-
  } else if (isNaN(end)) {
    end = size - 1;
  }
  // Invalid
  if (isNaN(start) || isNaN(end) || start > end || end > size) {
    return;
  }
  return {
    start: start,
    end: end
  };
};

/* 
  bytes=0-99，从 0 到 99 之间的数据字节。

  bytes=-100，文件的最后 100 个字节。

  bytes=100-，第 100 个字节开始之后的所有字节。

  bytes=0-99,200-299，从 0 到 99 之间的数据字节和 200 到 299 之间的数据字节。
*/