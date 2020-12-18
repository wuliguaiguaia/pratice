export const DBConfig = {
  name: 'jiangyi',
  version: 2
};

export const DocCacheConfig = {
  // 表名
  name: 'DocumentCache',

  options: {
    /* 不写 keypath，自动生成的主键不在数据体里
     * 写了后数据体传了就以此为准，相同的话就会报错,没传的话如果有自增属性就会自增，没有自增就会报错
     */
    keyPath: 'id', 
    autoIncrement: true
  },

  // 索引
  indexes: [
    {
      name: 'byDocumentId',
      attr: 'documentId',
      options: {
        unique: false
      }
    },
    {
      name: 'byLecturenoteId',
      attr: 'lecturenoteId',
      options: {
        unique: false
      }
    },
    {
      name: 'byUserId',
      attr: 'userId',
      options: {
        unique: false
      }
    },
    {
      name: 'byUpdatedAt',
      attr: 'updatedAt',
      options: {
        unique: false
      }
    }
  ],

  // 数据库升级时，超时的15天的删除
  overtime: 1296000,

  sessionId: 'docVersionId'
};


export const test = {
  // 表名
  name: 'testtest',

  options: {
    // keyPath: 'id', // 自动生成的主键不在数据体里
    autoIncrement: true
  },

  // 索引
  indexes: [
    {
      name: 'byDocumentId',
      attr: 'documentId',
      options: {
        unique: false
      }
    },
    {
      name: 'fdsdsfasfasf',
      attr: 'ddd',
      options: {
        unique: false
      }
    },
    {
      name: 'byLecturenoteId',
      attr: 'lecturenoteId',
      options: {
        unique: false
      }
    },
    {
      name: 'byUserId',
      attr: 'userId',
      options: {
        unique: false
      }
    },
    {
      name: 'byUpdatedAt',
      attr: 'updatedAt',
      options: {
        unique: false
      }
    }
  ],

  // 数据库升级时，超时的15天的删除
  overtime: 1296000,

  sessionId: 'docVersionId'
};
