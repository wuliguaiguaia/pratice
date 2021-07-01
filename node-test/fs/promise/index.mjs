import { open } from 'fs/promises';
/* 
  <FileHandle> 对象是数字文件描述符的对象封装。
  <FileHandle> 对象的实例通过 fsPromises.open() 方法创建。 
*/


let filehandle;
try {
  filehandle = await open('test.txt', 'r');
  console.log(filehandle);
/* 
  FileHandle {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    close: [Function: close],
    [Symbol(kCapture)]: false,
    [Symbol(kHandle)]: FileHandle {},
    [Symbol(kFd)]: 21,
    [Symbol(kRefs)]: 1,
    [Symbol(kClosePromise)]: null
  } 
*/

} finally {
  await filehandle?.close();
}