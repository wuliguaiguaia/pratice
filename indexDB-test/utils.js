/**
 * indexDB 持久与大容量存储
 * https://wangdoc.com/javascript/bom/indexeddb.html
 * 
 * 同源限制
 * 数据库升级的时候不允许读写数据, 升级是一个事务
 * 新增与删除表与索引必须在升级版本时进行
 *
 */

/*
 * 问题：
 * 1、连续读写会多次打开数据库
 * 2、DB 类似 util， DBStore 才是类
 */

import { DBConfig } from './constants.js';

/* *** 数据库操作 ** */
export class DB {
  open(name, version, { upgrade, success, error, blocked }) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(name, version);
      // if(upgrade){}
      request.onupgradeneeded = event => {
        console.log(event);
        // console.log(event.target.result === request.result) // true
        // console.log(event.target.result === event.target.transaction.db); // true

        const { newVersion, oldVersion, target: { result, transaction } } = event;
        upgrade?.(result, oldVersion, newVersion, transaction);
        resolve();
        console.log('onupgradeneeded');
      };

      request.onsuccess = event => {
        const {target: { result } } = event;
        success?.(result);
        resolve();
        console.log('success');
      };

      request.onerror = event => {
        error?.(event);
        reject();
      };

      request.onblocked = event => {
        blocked?.(event);
        reject();
      };
    });
  }

  remove(name, { success, error }) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(name);
      request.onsuccess = event => {
        success?.(event);
        resolve();
      };

      request.onerror = event => {
        error?.(event);
        reject();
      };
    });
  }
}

/* ** 数据表操作 ** */
export class DBStore {
  constructor(db, transaction, name) {
    this.db = db;
    this.dbStoreNames = db.objectStoreNames;
    this.name = name;
    this.transaction = transaction; // 升级使用
  }

  createStore(options) {
    if (!this.dbStoreNames.contains(this.name)) {
      this.store = this.db.createObjectStore(this.name, options);
    } else {
      this.store = this.transaction.objectStore(this.name);
    }
    return this;
  }

  createIndex(indexes) {
    indexes.forEach(index => {
      const { name, attr, options } = index;
      if (!this.indexNames.contains(name)) {
        this.store.createIndex(name, attr, options);
      }
    });
    return this;
  }

  deleteIndex(name) {
    if (this.indexNames.contains(name)) { 
      this.store.deleteIndex(name);
    }
    return this;
  }

  readStore(method) {
    // 默认 readonly
    console.log(']]]]');
    return this.db.transaction([this.name], method).objectStore(this.name);
  }

  addData({ data, success, error }) {
    return new Promise((resolve, reject) => {
      const request = this.readStore('readwrite')
        .add(data);
      request.onsuccess = event => {
        success?.(event);
        resolve();
      };
      request.onerror = event => {
        error?.(event);
        reject();
      };

        this.getData({id:1}).then(res => {
        console.log(res);
      })
    });
  }

  putData({ data, success, error }) {
    // 默认主键存在与数据内，不提供主键
    return new Promise((resolve, reject) => {
      const request = this.readStore('readwrite')
        .put(data);
      request.onsuccess = event => {
        success?.(event);
        resolve();
      };

      request.onerror = event => {
        error?.(event);
        reject();
      };

    
    });
  }

  getData({ id, success, error }) {
    return new Promise((resolve, reject) => {
      let store = this.readStore();
      console.log(432423);
      const request = store.get(id);
      request.onsuccess = event => {
        success?.(event);
        resolve(event.target.result);
      };

      request.onerror = event => {
        error?.(event);
        reject(event);
      };
    });
  }

  deleteData({ id, success, error }) {
    return new Promise((resolve, reject) => {
      const request = this.readStore('readwrite')
        .delete(id);
      request.onsuccess = event => {
        success?.(event);
        resolve();
      };

      request.onerror = event => {
        error?.(event);
        reject();
      };
    });
  }

  getAllData({ index, key, query, count, success, error }) {
    return new Promise((resolve, reject) => {
      let store = this.readStore();
      let request = null;
      if (index) { // 通过索引查找
        store = store.index(index);
        request = key ? store.getAll(key, count) : store.getAll(query, count);
      } else {
        request = store.getAll(query, count);
      }

      // query ?
      request.onsuccess = event => {
        success?.(event);
        resolve(event.target.result);
      };
      request.onerror = event => {
        error?.(event);
        reject(event);
      };
    });
  }

  getAllKeys({ index, key, query, count, success, error }) {
    return new Promise((resolve, reject) => {
      let store = this.readStore();
      let request = null;
      if (index) { // 通过索引查找
        store = store.index(index);
        request = key ? store.getAllKeys(key, count) : store.getAllKeys(query, count);
      } else {
        request = store.getAllKeys(query, count);
      }

      // query ?
      request.onsuccess = event => {
        success?.(event);
        resolve(event.target.result);
      };
      request.onerror = event => {
        error?.(event);
        reject(event);
      };
    });
  }

  clearData({ success, error }) {
    return new Promise((resolve, reject) => {
      const request = this.readStore().clear();
      request.onsuccess = event => {
        success?.(event);
        resolve();
      };

      request.onerror = event => {
        error?.(event);
        reject();
      };
    });
  }

  count({ key, success, error }) {
    return new Promise((resolve, reject) => {
      const request = this.readStore().count(key);
      request.onsuccess = event => {
        success?.(event);
        resolve();
      };

      request.onerror = event => {
        error?.(event);
        reject();
      };
    });
  }

  readIndex(name) {
    return this.store.index(name);
  }

  get indexNames() {
    return this.store.indexNames;
  }

  get primaryKey() {
    return this.store.keyPath;
  }

  get autoIncrement() {
    return this.store.autoIncrement;
  }
}
