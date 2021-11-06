const template = `<div id="app">
   <h1>{{msg}}</h1>
   <input type="text" v-model="msg">
   <button @click="changeMsg">click me!</button>
   <span v-for="item in sz">item</span>
   <div v-if="isShow">if</div>
   <div :dd="dd">ff</div>
</div>`

/* 正则 */
const startTag = /^\s*<([a-z][\w-_]*)([^\/>]*)(\/*)>/i
const endTag = /^\s*<\/([a-z][\w-_]*)>/i

/* 定义常量 */
const noModifierKeys = ['on', 'bind', 'class', 'style', 'for', 'if']; /* 没有修饰符 */
const elSpecialAttr = ['key']; /* 挂载在 element */
const forExpr = /(.*)\s+(?:in|of)\s+(.*)/;
const textRE = /\{\{([^}]+)\}\}/g;
const autoCloseTag = ['input', 'br'] /* 自闭合标签 */ 

/* 1、parse */
function parse(html) {
  let root = null
  const stack = []
  while (html) {
    let matches = []
    if(matches = html.match(startTag)) {    // 匹配起始标签
      const [matchText, tag, attrStr, isClose] = matches
      html = html.slice(matchText.length)
      const element = parseStartTag(tag, attrStr)
      if(!root) {
        root = element
      } else {
        const curElement = stack[stack.length - 1]
        curElement.children.push(element)
      }
      if(!isClose && !autoCloseTag.includes(tag)) { // 不是闭合标签
         stack.push(element) // 入栈
      }
    } else if(matches = html.match(endTag)){ // 匹配终止标签
      const [matchText, tag] = matches
      html = html.slice(matchText.length + 1)
      parseEndTag(stack, tag) // 这里出栈
    } else {                                // 匹配文本
      const curElement = stack[stack.length - 1] // 找到栈的最后一个元素
      const index = html.indexOf('<')
      const text = html.slice(0, index)
      const textNode = parseText(text)
      curElement.children.push(textNode)
      html = html.slice(index)
    }
  }
  return root || {}
}
function parseStartTag(tag, attrStr) {
  const element = {
    tag,
    children: [],
    attrsMap: {},
    type: 1
  }
  const attrsMap = parseAttr(attrStr)
  element.attrsMap = attrsMap
  parseSpecialAttrs(element, attrsMap)
  return element
}
function parseAttr(str) {
  const attrRE = /\s*([^'"=\(\)\s]+)\s*=?\s*(['"]?([^'"]+)['"]?)?/g
  const attrs = {}
  str.replace(attrRE, (matchTxt, key, _, value) => { // _： 不需要的分组
    if(matchTxt.includes('=')) { // 区分有无等号
      attrs[key] = value
    } else {
      attrs[key] = true
    } 
  })
  return attrs
}

const parseDirectivesUtils = {
  model (element, attrs, val, expr) {
    attrs.events.change = {
      value: `${expr}=$event.target.value`
    };
  },

  on (element, attrs,val, expr, modifiers) {
    const name = `${val}`;
    attrs.events[name] = {
      value: expr,
      modifiers
    };
  },

  bind (element, attrs, val, expr, modifiers) {
    if (elSpecialAttr.includes(val)) {
      element[val] = expr;
    }
    if (modifiers?.sync) {
      const name = `update:${val}`;
      attrs.events[name] = {
        value: `${expr}=$event`
      };
    }
  },

  if (element, attrs,_, expr) {
    element.if = expr;
    element.ifCondition = {
      exp: expr,
      block: element
    };
  },

  for(element, attrs, _, expr) {
    const forExpr = /(.*)\s+(?:in|of)\s+(.*)/;
    if (forExpr.exec(expr)) {
      element.forCondition = RegExp.$1;
      element.for = RegExp.$2;
      const [alias, iterator] = RegExp.$1.split(',');
      element.alias = alias.trim().replace('(', '');
      element.iterator = iterator?.trim().replace(')', '');
    }
  }
  // once
};

function parseDirectives(element, keyStr, argStr, expr) {
  const {attrs} = element
  const [dire, ...dirModifiers] = keyStr.split('.');
  const [arg, ...argMofifiers] = argStr?.split('.') ?? [];
  const modifiers = [...dirModifiers, ...argMofifiers].reduce((res, item) => {
    res[item] = true;
    return res;
  }, {}); // 合并修饰符

  if (!attrs.directives) { // 初始化
    attrs.directives = [];
  }
  if (!attrs.events) { // 初始化
    attrs.events = {};
  }

  const direItem = {
    name: dire,
    value: expr,
    modifiers
  };
  // 使用 parseDirectivesUtils 统一处理
  if (Object.keys(parseDirectivesUtils).includes(dire)) {
    parseDirectivesUtils[dire](element, attrs, arg, expr, modifiers);
  }

  if (!noModifierKeys.includes(dire)) {
    attrs.directives.push(direItem);
  }
  element.hasBindings = true; // 动态绑定
};
function parseSpecialAttrs(element, attrsMap) {
  const attrs = {}
  element.attrs = attrs
  Object.keys(attrsMap).forEach(key => {
    let val = attrsMap[key]
    if (key.startsWith('v-')) {
      key = key.slice(2).split(':'); //
      parseDirectives(element, key[0], key[1], val); // model.lazy, undefined,
    } else if (key.startsWith('@')) {
      parseDirectives(element, 'on', key.slice(1), val); // on, click.passive, change
    } else if (key.startsWith(':')) {
      parseDirectives(element, 'bind', key.slice(1), val); // bind, data.sync,
      attrs[key] = val
    } else {
      if (elSpecialAttr.includes(key)) {
        element[key] = val;
      } else {
        attrs[key] = val
      }
    }
  });
}
function parseEndTag(stack, tag) {
  while(stack.length) {
    let cur = stack.pop()
    if(cur.tag === tag) {
    	break
    }
  }
}
function parseText(str) {
  const textNode = {
    type: 3,
    expression: '',
    text: str
  }
  if(textRE.test(str)) {
    textNode.type = 2
  	textNode.expression = '"' + str.replace(textRE, (_, $1) => {
      return `"+_s(${$1})+"`;
    }) + '"';
  } 
  return textNode
}

/* 2、optimize */
const optimize = root => {
  if (!root) return;
  makeStatic(root);
  makeRootStatic(root);
  return root;
};
function makeStatic (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    node.children.forEach(child => {
      makeStatic(child);
      if (!child.static) { // 如果某个child为false父元素则为false
        node.static = false;
      }
    });
  }
};
function isStatic (node) {
  if (node.type === 2) { // 具有expression 的文本节点
    return false;
  }
  if (node.type === 3) { // 静态文本节点
    return true;
  }
  return !node.if // 没有 if for 或者绑定会导致节点变化的属性
        && !node.for
        && !node.hasBindings;
};
function makeRootStatic (node) {
  if (node.type === 1) {
    if (node.static && node.children.length && !( 
    // 静态的，有子节点，不能子节点只有一个而且第一个还是文本节点
      node.children.length === 1
            && node.children[0].type === 3
    )) {
      node.staticRoot = true; // 具体有什么优化有待考量
      return;
    } else {
      node.staticRoot = false;
    }
    node.children.forEach(child => {
      makeRootStatic(child);
    });
  }
};


/* 3、generate */
const genUtil = {
  element (el, state) {
    if (el.staticRoot && !el.staticProcessed) { // 静态根节点
      return this.static(el, state);
    } else if (el.for && !el.forProcessed) { // for 在 if 前，优先级
      return this.for(el, state);
    } else if (el.if && !el.ifProcessed) { // if
      return this.if(el, state);
    } else {
      const data = this._data(el, state);
      const children = this.children(el, state);
      return `_c('${el.tag}', ${data}, ${children})`;
    }
  },
  static (el, state) {
    el.staticProcessed = true;
    state.staticRenderFns.push(`with(this){return ${this.element(el, state)}}`);
    return `_m(${state.staticRenderFns.length - 1})`;
  },

  for (el, state) {
    el.forProcessed = true;
    const { alias, iterator } = el;
    return `_l(${el.for}, function(${alias}, ${iterator}) {
            return ${this.element(el, state)};
        })`;
  },

  if (el, state) {
    el.ifProcessed = true;
    const { exp, block } = el.ifCondition;
    return `${exp} ? ${this.element(block, state)} : _e()`;
  },

  children (el, state) {
    const { children } = el;
    if (children?.length) {
      return `[${children.map(c => this.vnode(c, state)).join(',')}]`;
    }
  },

  vnode (node, state) {
    if (node.type === 1) {
      return this.element(node, state);
    } else {
      return this.text(node);
    }
  },

  text (node) {
    const { type, text } = node;
    return `_v(${type === 2 ? node.expression : JSON.stringify(text)})`; // JSON.stringify 防止意外
  },

  _data (el, state) {
    const {attrsMap, attrs:{directives, events, ...other}, key } = el;
    let code = '';
    if (Object.keys(attrsMap).length) {
      let attrCode = ''; let domProps = '';
      Object.keys(attrsMap).forEach(name => {
        const val = attrsMap[name];
        if (name.startsWith(':')) { // 处理v-bind
          if (!elSpecialAttr.includes(name.slice(1))) {
            domProps += `${name.slice(1)}:${val}`;
          }
        } else if (name === 'v-model') {
          domProps += `value:(${val})`;
        } else if (!/v-|@/.test(name) && !elSpecialAttr.includes(name)) { // 其他，不完整
          attrCode += `${name}:"${val}",`;
        }
      });
      if (attrCode) {
        code += `attrs: {${attrCode}},`;
      }
      if (domProps) {
        code += `domProps: {${domProps}},`; // 传递的参数
      }
    }

    if (directives?.length) {
      code += `directives:${JSON.stringify(directives)},`;
    }

    if (events) {
      let eventCode = '';
      Object.keys(events).forEach(name => {
        const event = events[name];
        const { value } = event;
        // 暂不判断 modifiers
        if (/^[a-z_$][\w]+$/i.test(value)) { // in methods
          eventCode += `${name}:${value},`;
        } else {
          eventCode += `${name}:function($event){${value}},`;
        }
      });
      code += eventCode ? `on:{${eventCode}},` : '';
    }

    if (key) {
      code += `key:${key}`;
    }

    return `{${code}}`;
  }
  // component() {},

  // once() {}
};

function createElement (context, tag, data, children) {
  // 一些判断确认输出
  if(){
    return createEmptyVNode() // 创建一个空的vnode
  } else if(){
    return createComponent() // 创建组件
  } else {  // 创建 vnode
    vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
    )
    return vnode
  }
}
class CodegenState {
  constructor () {
    this.staticRenderFns = [];
  }
}

const generate = ast => {
  const state = new CodegenState();
  const code = ast ? genUtil.element(ast, state) : '_c("div")';
  return { // with 改变作用域
    render: `with(this){ return ${code}}`
  };
};


/* 编译 */
const compile = (template) => {
  const ast = parse(template);
  console.log(`1、parse`, ast);
  const astHaveStaicTag = optimize(ast);
  console.log(`2、optimize`, astHaveStaicTag);
  const {render} = generate(astHaveStaicTag);
  console.log(`3、rende 函数`, render);
  return {
    render
  };
};

const { render } = compile(template)
console.log(render);
// 使用eval将调用 _c,_m,_l等生成完整的vnode
eval(`function render1() {  ${render} };console.log(render1())`)



/* 我生成的 */
function render1 () {
  with (this) {
    return _c(
      'div',
      { attrs: { id: "app", }, },
      [
        _c('h1', {}, [_v("" + _s(msg) + "")]),
        _c('input', {
          attrs: { type: "text", }, domProps: { value: (msg) },
          directives: [{ "name": "model", "value": "msg", "modifiers": {} }],
          on: { change: function ($event) { msg = $event.target.value }, },
        }, undefined),
        _c('button', { on: { click: changeMsg, }, }, [_v("click me!")]),
        _l(sz, function (item, undefined) {
            return _c('span', {}, [_v("item")]);
        }),
        isShow ? _c('div', {}, [_v("if")]) : _e(),
        _c('div', { domProps: { dd: dd }, }, [_v("ff")])
      ]
    )
  }
}

/* vue源码生成的 */
function render2() {
  with (this) {
    return _c(
      'div',
      { attrs: { "id": "app" } },
      [
        _c('h1', [_v(_s(msg))]),
        _v(" "),
        _c('input',
          {
            directives: [{ name: "model", rawName: "v-model", value: (msg), expression: "msg" }],
            attrs: { "type": "text" }, domProps: { "value": (msg) },
            on: { "input": function ($event) { if ($event.target.composing) return; msg = $event.target.value } }
          }),
        _v(" "),
        _c('button', { on: { "click": changeMsg } }, [_v("click me!")]),
        _v(" "),
        _l((sz), function (item) { return _c('span', [_v("item")]) }),
        _v(" "),
        (isShow) ? _c('div', [_v("if")]) : _e(),
        _v(" "),
        _c('div', { attrs: { "dd": dd } }, [_v("ff")])
      ],
      2
    )
  }
}

