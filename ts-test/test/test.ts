interface Animal {
  head: object
  body: object
  move(step: number):void
}
class Human implements Animal {
  head: object
  body: object
  constructor(public name:string){
    this.name = name;
  }
  move(step){}
  say(){console.log(this.name)}
}

let alias: Human = new Human('alias')
alias.say()