// crypto 模块提供了加密功能，其中包括了用于 OpenSSL 散列、HMAC、加密、解密、签名、以及验证的函数的一整套封装。

const crypto = require('crypto');
const { createHmac, createHash } = crypto;
const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');
console.log(hash);
// c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e


const hash1 = createHash('sha256');
hash1.update('I love cupcakes');
console.log(hash1.digest('hex'));

// crypto.constants 导出的以下常量适用于 crypto、tls 和 https 模块的各种用途，并且通常特定于 OpenSSL。
// console.log(crypto.constants);
