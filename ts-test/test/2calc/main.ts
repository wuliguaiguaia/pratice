function $g(id: string) {
  return document.getElementById(id);
}
function $c(tag: string, text: string, cName: string, id: string, container: HTMLElement = document.body): HTMLElement {
  let el = document.createElement(tag);
  el.innerText = text;
  el.className = cName;
  if (id) el.id = id;
  container.appendChild(el)
  return el;
}

class Calc {
  private container: HTMLElement;
  private span: HTMLSpanElement;
  private keys: Array<Array<string>> = [['clear', '+'], ['7', '8', '9', '-'], ['4', '5', '6', '*'], ['1', '2', '3', '÷'], ['0', '.', '=']];

  public n1: string;
  public n2: string;
  public operator: string;
  public result: string;
  public type: number = 0; // 0 normal 1 连缀 2 infinite
  constructor() {
    this.createContainer();
    this.bindEvent();
  }
  createContainer() {
    let app = $c('div', '', '', 'app');
    let box = $c('div', '', 'box', '', app);
    let span = $c('span', '', '', '', box);
    this.keys.forEach((itemList: string[]) => {
      let div = $c('div', '', 'row', '', app);
      itemList.forEach((item: string) => {
        $c('button', item, 'btn btn-' + item, '', div)
      })
    })
    this.container = app;
    this.span = span;
  }
  updateNumber(data: string): void {
    if (!this.operator) {
      if (this.n1 && !this.type) { // 等号之后继续写数字
        if (this.n1.indexOf('.') >= 0 && data === '.') return;
        this.n1 = this.n1 + data;
      } else {
        if (data === '.') return;
        this.n1 = data;
        this.type = 0;
      }
    } else {
      if (this.n2) {
        if (this.n2.indexOf('.') >= 0 && data === '.') return;
        this.n2 = this.n2 + data;
      } else {
        if (data === '.') return;
        this.n2 = data;
      }
    }
  }

  updateOperator(data: string): void {
    if (!this.n1) return;
    this.n1 = this.formatNumber(this.n1).toString();
    this.operator = data;
  }

  updateResult(): void {
    switch (this.operator) {
      case '+':
        this.result = String(this.formatNumber(this.n1) + this.formatNumber(this.n2));
        break;
      case '-':
        this.result = String(this.formatNumber(this.n1) - this.formatNumber(this.n2));
        break;
      case '*':
        this.result = String(this.formatNumber(this.n1) * this.formatNumber(this.n2));
        break;
      case '÷':
        this.result = String(this.formatNumber(this.n1) / this.formatNumber(this.n2));
        break;
    }

    if (!Number.isFinite(Number(this.result))) {
      this.result = '不是数字'
      this.updateSpanText(this.result);
      this.reset(2);
    } else {
      this.updateSpanText(this.result);
      this.reset(1);
    }
    
  }
  updateSpanText(data: string) {
    this.span.textContent = data;
  }
  bindEvent() {
    this.container.addEventListener('click', e => {
      if (!(e.target instanceof HTMLButtonElement)) return;
      let data = e.target.textContent;
      if ('1234567890.'.indexOf(data) >= 0) {
        this.updateNumber(data);
      } else if ('+-*÷'.indexOf(data) >= 0) {
        this.updateOperator(data);
      } else if (data == '=') {
        this.updateResult();
        return
      } else if (data === 'clear') {
        this.reset(0);
      }
      console.log(this.n1, this.operator, this.n2);
      this.result = this.n1;
      if (this.operator) {
        this.result += this.operator;
      }
      if (this.n2) {
        this.result += this.n2;
      }
      this.updateSpanText(this.result);
    })
  }
  reset(number) {
    this.n1 = number === 1 ? this.result : ''
    this.n2 = ''
    this.result = ''
    this.operator = ''
    this.type = number;
  }
  private formatNumber(n) {
    if (n.slice(-1) === '.') {
      n = parseFloat(n.toString().slice(0, -1))
    }
    return parseFloat(n);
  }
}

new Calc()


