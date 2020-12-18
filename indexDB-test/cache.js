/**
 * 文档内容离线存储
 */

import { DB, DBStore } from './utils.js';
import { DBConfig, DocCacheConfig, test } from './constants.js';

const DBUtil = new DB();
let store = null;
let store2 = null;

const openDB = () => {
  return DBUtil.open(DBConfig.name, DBConfig.version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // 新建表与索引
      store = new DBStore(db, transaction, DocCacheConfig.name)
        .createStore(DocCacheConfig.options)
        .createIndex(DocCacheConfig.indexes);
      store2 = new DBStore(db, transaction, test.name)
        .createStore(test.options)
        .createIndex(test.indexes);
      // window._dblog && console.log('创建数据库')
      console.log('创建/升级数据库');
    },
    success(db) {
      store = new DBStore(db, null, DocCacheConfig.name)
      store2 = new DBStore(db, null, test.name)
      console.log('打开数据库');
    },
    error() {
      console.log('打开数据库报错');
    },
    blocked() {
      console.log('上次的数据库未关闭');
    }
  });
};

export const setLocalData = data => {
  return openDB().then((event) => {
    return store.addData({
      data: { ...data, updatedAt: Date.now() },
      success() {
        console.log('数据写入成功');
      },
      error() {
        console.log('数据写入失败');
      }
    });
  });
};

export const putLocalData = data => {
  return openDB().then((event) => {
    return store.putData({
      data: { ...data, updatedAt: Date.now() },
      success() {
        console.log('数据更新成功');
      },
      error() {
        console.log('数据更新失败');
      }
    });
  });
};

export const getLocalData = ({ id, index, key }) => {
  return openDB().then((event) => {
    return store.getData({
      id,
      index,
      key,
      success() {
        console.log('数据读取成功');
      },
      error() {
        console.log('数据读取失败');
      }
    });
  });
};

export const getAllLocalData = ({ index, query, count, key }) => {
  return openDB().then((event) => {
    return store.getAllData({
      index,
      query,
      count,
      key,
      success(event) {
        console.log('数据读取成功');
      },
      error() {
        console.log('数据读取失败');
      }
    });
  });
};

export const getAllLocalDataKeys = ({ index, query, count, key }) => {
  return openDB().then((event) => {
    return store.getAllKeys({
      index,
      query,
      count,
      key,
      success(event) {
        console.log('主键读取成功');
      },
      error() {
        console.log('主键读取失败');
      }
    });
  });
};

export const deleteLocalData = ({ id }) => {
  return openDB().then((event) => {
    return store.deleteData({
      id,
      success() {
        console.log('数据删除成功');
      },
      error() {
        console.log('数据删除失败');
      }
    });
  });
};
