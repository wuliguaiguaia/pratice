#!/usr/bin/env ts-node

class Personx {
  child: Personx[] = []
  constructor(public name: string) {
    this.name = name;
  }
  addChild(person: Personx) {
    this.child.push(person);
  }
  sayName(n = 0) {
    console.log('----'.repeat(n), this.name);
    if (this.child.length) {
      this.child.forEach((person: Personx) => {
        person.sayName(n+1);
      })
    }
  }
}
let grandpa = new Personx("grandpa");
let son1 = new Personx("son1");
let son2 = new Personx("son2");
grandpa.addChild(son1);
grandpa.addChild(son2);
let ton11 = new Personx('ton11')
let ton12 = new Personx('ton12')
son1.addChild(ton11)
son1.addChild(ton12)
grandpa.sayName();