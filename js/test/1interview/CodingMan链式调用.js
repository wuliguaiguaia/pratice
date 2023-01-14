/*
  CodingMan('Jack').sleep(10).eat('dinner')
  CodingMan('Jack').sleepFirst(10).eat('dinner')
  CodingMan('Jack').eat('orange').sleepFirst(10).eat('apple')
*/


function compose(fns) {
    return function () {
        return dispatch(0);
        function dispatch(i) {
            const fn = fns[i];
            if (!fn) { return; }
            return fn(dispatch.bind(null, i + 1));
        }
    };
}

class Person {
    constructor(person) {
        this.fnQueue = [];
        this.name = person;
        this.say(person);
        setTimeout(() => {
            let fn = compose(this.fnQueue);
            fn();
        });
    }
    say (text) {
        function fn(next) {
            console.log(`hello, I'm ${text}`);
            next();
        }
        this.fnQueue.push(fn.bind(this));
        return this;
    }
    sleep (t) {
        function fn(next) {
            console.log(`${this.name} wait ${t} ...`);
            setTimeout(() => {
                next();
            }, t * 1000);
        }
        this.fnQueue.push(fn.bind(this));
        return this;
    }
    sleepFirst(t) {
        function fn(next) {
            console.log(`${this.name} wait ${t} ...`);
            setTimeout(() => {
                next();
            }, t * 1000);
        }
        this.fnQueue.unshift(fn.bind(this));
        return this;
    }
    eat (text) {
        function fn(next) {
            console.log(`${this.name} eat ${text}`);
            next();
        }
        this.fnQueue.push(fn.bind(this));
        return this;
    }
}
function CodingMan(person) {
    return new Person(person);
}


CodingMan('Jack').sleepFirst(3).eat('dinner');
CodingMan('Kite').sleep(2).eat('dinner');