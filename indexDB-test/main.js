// IndexedDB 是浏览器提供的本地数据库，它可以被网页脚本创建和操作，相比较 cookie，localStorage，sessionStorage，IndexDB 允许储存大量数据，提供查找接口，还能建立索引，适用于大容量缓存与离线访问场景

let db;
// 打开数据库 indexedDB.open
let request = window.indexedDB.open('test', 1);

request.onupgradeneeded = function (event) { // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
  db = event.target.result;
  let objectStore;
  if (!db.objectStoreNames.contains('person')) {
    // 新增一张叫做person的表格，主键是id
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }

  // 新建索引
  objectStore.createIndex('name', 'name', { unique: true });
  objectStore.createIndex('age', 'age', { unique: false });
  objectStore.createIndex('email', 'email', { unique: false }); // unique 是否允许重复
}

request.onsuccess = function (e) {
  db = request.result;
  // add(3, '小乔乔乔', 1, '小乔@qq.com');
  // add(id++, 'yl', 3, '小dd乔@qq.com');
  // add('zy', '小d乔@qq.com');
  // add('qm', '小a乔@qq.com');
  // remove(3)
  // readAll();

  // update(2, '小乔乔', 1, '小乔的@qq.com');


  var transaction = db.transaction(['person'], 'readonly');
  var store = transaction.objectStore('person');
  var index = store.index('name'); // 通过索引读取
  var s = index.get('小乔');

  s.onsuccess = function (e) {
    var result = e.target.result;
    if (result) {
      // ...
      console.log(result);
    } else {
      // ...
    }
  }
}

function add(id, name, age, email) {
  let request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id, name, age, email });
  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };
  request.onerror = function (event) {
    console.log('数据写入失败');
  }
}

function remove(id) {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(id); // 参数是主键的值
  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

function read(id) {
  var request = db.transaction(['person'])
    .objectStore('person')
    .get(id); // 参数是主键的值

   request.onerror = function(event) {
     console.log('事务失败');
   };

   request.onsuccess = function( event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}


function readAll() {
  var objectStore = db.transaction('person').objectStore('person');

  objectStore.openCursor().onsuccess = function (event) { // 遍历数据表格的所有记录，要使用指针对象 IDBCursor。
    var cursor = event.target.result;

    if (cursor) {
      console.log('Id: ' + cursor.key);
      console.log('Name: ' + cursor.value.name);
      console.log('Age: ' + cursor.value.age);
      console.log('Email: ' + cursor.value.email);
      cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}


function update(id, name, age, email) {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id, name, age, email });

  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };

  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}
// 数据记录的读写和删改，都要通过事务完成。事务对象提供error、abort和complete三个事件，用来监听操作结果。

// 阮一峰教程： https://www.bookstack.cn/read/javascript-tutorial/spilt.3.docs-bom-indexeddb.md 
// https://www.ruanyifeng.com/blog/2018/07/indexeddb.html
