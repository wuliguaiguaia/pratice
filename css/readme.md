CSS选择器的解析是从上到下，从右向左解析，为了避免对所有元素进行解析

样式继承：
       可继承的样式：font-size, font-family, color
       不可继承的样式：border, padding, margin, width, height

提交选择器优先级： !important > 内联style > ID选择器 > 类选择器 > 标签选择器 > 通配符选择器 > 继承

css 伪元素
::selection 选择被用户选取的元素部分
:first-line 选择元素中的第一行
:first-letter 选择元素中的第一个字符
:after 在元素在该元素之后添加内容
:before 在元素在该元素之前添加内容
css 伪类
:root 选择文档的根元素，等同于html元素
:empty 选择没有子元素的元素
:target 选取当前活动的目标元素
:not(selector) 选择除 selector 元素意外的元素
:enabled 选择可用的表单元素
:disabled 选择禁用的表单元素
:checked 选择被选中的表单元素
:first-child 选取当前选择器下第一个元素。
:last-child 和 first-child 相反，选取当前选择器下最后一个元素。
:only-child 选取唯一子元素。如果一个元素的父元素只有它一个子元素，这个伪类就会生效。如果一个元素还有兄弟元素，这个伪类就不会对它生效。
:only-of-type 选取唯一的某个类型的元素。如果一个元素的父元素里只有它一个当前类型的元素，这个伪类就会生效。这个伪类允许父元素里有其他元素，只要不和自己一样就可以。
:focus-visible <https://www.zhangxinxu.com/wordpress/2019/03/css-focus-visible/> 解决聚焦内边框
提交静态伪类（只用于a标签）
:link 指示这个“超链接”（即 a 元素里有一个 href 属性）未被访问
:visited 指示这个“超链接”已被访问
提交动态伪类（使用时鼓励“LVHT”顺序）
:focus 指示这个元素拥有输入“焦点”——即可以接受键盘输入，或通过某种方式可以激活
:hover 指示当鼠标停留在这个元素上时，外观可以作相应改变
:active 指示这个元素可以被用户输入“激活”，如，用户停留在一个超链接上，当点击鼠标时，这个链接就会“激活”
伪类和伪元素的根本区别：它们是否创造了新的元素(抽象)。

提交IE 盒模型与W3C 盒模型的区别 在于width的范围
IE:width = border + padding + content
W3C: width = content
使用 box-sizing 修改盒模型

提交盒子宽高
clientWidth = width+左右padding
offsetWidth = width + 左右padding + 左右boder
scrollWidth：获取指定标签内容层的真实宽度（可视区域宽度+被隐藏区域宽度）

提交margin 合并
解决方法：
为父盒子设置border，为外层添加border后父子盒子就不是真正意义上的贴合 （可以设置成透明：border: 1px solid transparent）
为父盒子添加overflow: hidden;
为父盒子设定padding值；
为父盒子添加position：fixed；
display: flow-root

提交定位：position：sticky

提交使用 display:inline-block 会产生什么问题？两个inline-block元素放到一起会产生一段空白
原因：元素被当成行内元素放置的时候，元素之间的空白符（空格，回车换行等）都会被浏览器处理，根据CSS中空白属性的处理方式（否则是正常，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，在字体不为0的情况下，空白符较长一定长度，所以inline-block的元素之间就出现了空隙。
解决：
将子元素标签的结束符和下一个标签的开始符写在同一行或把所有子标签写在同一行
父元素中设置字体大小：0，在子元素上重置正确的字体大小
为子元素设置float：left

提交文本单行溢出：
white-space: nowrap; /*首先，强制文本不换行；*/
overflow: hidden; /*其次，隐藏溢出；*/
text-overflow: ellipsis; /*最后，对溢出的文本用 ellipsis 省略号代替。*/

提交Css 浏览器兼容性
-moz代表firefox浏览器私有属性
-ms代表IE浏览器私有属性
-webkit代表chrome、safari私有属性
-o代表opera私有属性

提交css 优化与性能提升
将css文件放在页面最上面，多个css可合并，并尽量减少http请求
避免过渡约束，避免使用后代选择符，链式选择符，多种类型选择符
避免不必要的命名空间，避免不必要的重复样式，移除空的css规则
使用具有语义的名字，使用紧凑的语法
避免使用 !important
尽可能地精简规则，尽可能合并不同类的重复规则，修复解析错误
正确使用display属性
inline后不应该使用width、height、margin、padding以及float
inline-block后不应该使用float；block后不应该使用vertical-align
不滥用浮动，遵守盒模型规则
不滥用web字体，不声明过多font-size，不重复定义h1-h6，不给h1-h6定义过多样式
值为0时不需要任何单位
标准化各种浏览器前缀

提交CSS 变量 与函数
CSS变量对JS交互组件开发带来的提升与变革：<https://www.zhangxinxu.com/wordpress/2020/07/css-var-improve-components/>
收藏！常用的CSS函数~：<https://juejin.im/post/5f12f4845188252e8c30a203?utm_source=gold_browser_extension>
巧用CSS cross-fade()实现背景图像半透明效果： <https://www.zhangxinxu.com/wordpress/2020/07/css-cross-fade-background-image-opacity/>  移动端兼容极佳

env( )
暗黑模式

提交column 实现两端对齐
CSS columns轻松实现两端对齐布局效果：  <https://www.zhangxinxu.com/wordpress/2020/05/css-columns-justify-content/>
column 指定栏数；column-gap 指定间隔

已发布文章：
提交css宽高与堆叠上下文 <https://zhuanlan.zhihu.com/p/47230930>
提交CSS大法（二）
提交css 大法（一）
提交Html css 续 <https://zhuanlan.zhihu.com/p/58675679>
提交animation-play-state失效方案 <https://zhuanlan.zhihu.com/p/86019205>
提交模糊效果的四种方案 <https://zhuanlan.zhihu.com/p/85998526>
提交sass 常用用法 <https://zhuanlan.zhihu.com/p/56930242>
提交Flex <https://zhuanlan.zhihu.com/p/48614218>
提交移动端适配方案 <https://zhuanlan.zhihu.com/p/48652245>

一文梳理CSS必会知识点：<https://juejin.im/post/5f1566ace51d45348d3a1770#comment>
