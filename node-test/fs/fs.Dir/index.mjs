/* 表示目录流的类。由 fs.opendir()、fs.opendirSync() 或 fsPromises.opendir() 创建。*/
  import { opendir } from 'fs/promises';
  try {
    const dir = await opendir('./');
    console.log(dir);
    /* 
    opendir Dir {
      [Symbol(kDirHandle)]: DirHandle {},
      [Symbol(kDirBufferedEntries)]: [],
      [Symbol(kDirPath)]: './',
      [Symbol(kDirClosed)]: false,
      [Symbol(kDirOperationQueue)]: null,
      [Symbol(kDirOptions)]: { bufferSize: 32, encoding: 'utf8' },
      [Symbol(kDirReadPromisified)]: [Function: bound [kDirReadImpl]],
      [Symbol(kDirClosePromisified)]: [Function: bound close]
    }
    */
    for await (const dirent of dir)
      console.log(dirent.name);
  } catch (err) {
    console.error(err);
  }
 

/* import { readdir, opendir} from 'fs';

readdir('./', (err, data) => {
  console.log('readdir', data);
})
opendir('./', (err, data) => {
  console.log('opendir', data);
}) */