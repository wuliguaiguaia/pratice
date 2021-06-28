console.log(process.memoryUsage());
/**
  * {
  *   rss: 21102592, 给这个进程分配了多少物理内存(占总分配内存的一部分) 这些物理内存中包含堆，栈，和代码段
  *   heapTotal: 4182016,
  *   heapUsed: 3279872,
  *   external: 200065, V8管理的，绑定到Javascript的C++对象的内存使用情况
  *   arrayBuffers: 11146
  * }
 */