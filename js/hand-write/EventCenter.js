class EventCenter {
    constructor() {
        this.events = {};
    }
    on(name, fn) {
        let evs = this.events[name] || [];
        if (evs.includes(fn)) { return; }
        evs.push(fn);
        this.events[name] = evs;
    }
    once(name, fn) {
        let that = this;
        function fn2(...arg) {
            fn(...arg);
            that.off(name, fn2);
        }
        this.on(name, fn2);
    }
    off(name, fn) {
        let evs = this.events[name] || [];
        if (fn) {
            let index = evs.indexOf(fn);
            if (index === -1) { return; }
            evs.splice(index, 1);
            this.events[name] = evs;
        } else {
            delete this.events[name];
        }
    }

    emit(name, ...rest) {
        let evs = this.events[name] || [];
        evs.forEach(fn => {
            fn(...rest);
        });
    }
}

let v = new EventCenter();
function fn() {
    console.log(1);
}
v.once('a', fn);
v.emit('a');
v.emit('a');
v.emit('a');