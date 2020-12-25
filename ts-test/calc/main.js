function $g(id) {
    return document.getElementById(id);
}
function $c(tag, text, cName, id, container) {
    if (container === void 0) { container = document.body; }
    var el = document.createElement(tag);
    el.innerText = text;
    el.className = cName;
    if (id)
        el.id = id;
    container.appendChild(el);
    return el;
}
var Calc = /** @class */ (function () {
    function Calc() {
        this.keys = [['clear', '+'], ['7', '8', '9', '-'], ['4', '5', '6', '*'], ['1', '2', '3', '÷'], ['0', '.', '=']];
        this.type = 0; // 0 normal 1 连缀 2 infinite
        this.createContainer();
        this.bindEvent();
    }
    Calc.prototype.createContainer = function () {
        var app = $c('div', '', '', 'app');
        var box = $c('div', '', 'box', '', app);
        var span = $c('span', '', '', '', box);
        this.keys.forEach(function (itemList) {
            var div = $c('div', '', 'row', '', app);
            itemList.forEach(function (item) {
                $c('button', item, 'btn btn-' + item, '', div);
            });
        });
        this.container = app;
        this.span = span;
    };
    Calc.prototype.updateNumber = function (data) {
        if (!this.operator) {
            if (this.n1 && !this.type) { // 等号之后继续写数字
                if (this.n1.indexOf('.') >= 0 && data === '.')
                    return;
                this.n1 = this.n1 + data;
            }
            else {
                if (data === '.')
                    return;
                this.n1 = data;
                this.type = 0;
            }
        }
        else {
            if (this.n2) {
                if (this.n2.indexOf('.') >= 0 && data === '.')
                    return;
                this.n2 = this.n2 + data;
            }
            else {
                if (data === '.')
                    return;
                this.n2 = data;
            }
        }
    };
    Calc.prototype.updateOperator = function (data) {
        if (!this.n1)
            return;
        this.n1 = this.formatNumber(this.n1).toString();
        this.operator = data;
    };
    Calc.prototype.updateResult = function () {
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
            this.result = '不是数字';
            this.updateSpanText(this.result);
            this.reset(2);
        }
        else {
            this.updateSpanText(this.result);
            this.reset(1);
        }
    };
    Calc.prototype.updateSpanText = function (data) {
        this.span.textContent = data;
    };
    Calc.prototype.bindEvent = function () {
        var _this = this;
        this.container.addEventListener('click', function (e) {
            if (!(e.target instanceof HTMLButtonElement))
                return;
            var data = e.target.textContent;
            if ('1234567890.'.indexOf(data) >= 0) {
                _this.updateNumber(data);
            }
            else if ('+-*÷'.indexOf(data) >= 0) {
                _this.updateOperator(data);
            }
            else if (data == '=') {
                _this.updateResult();
                return;
            }
            else if (data === 'clear') {
                _this.reset(0);
            }
            console.log(_this.n1, _this.operator, _this.n2);
            _this.result = _this.n1;
            if (_this.operator) {
                _this.result += _this.operator;
            }
            if (_this.n2) {
                _this.result += _this.n2;
            }
            _this.updateSpanText(_this.result);
        });
    };
    Calc.prototype.reset = function (number) {
        this.n1 = number === 1 ? this.result : '';
        this.n2 = '';
        this.result = '';
        this.operator = '';
        this.type = number;
    };
    Calc.prototype.formatNumber = function (n) {
        if (n.slice(-1) === '.') {
            n = parseFloat(n.toString().slice(0, -1));
        }
        return parseFloat(n);
    };
    return Calc;
}());
new Calc();
