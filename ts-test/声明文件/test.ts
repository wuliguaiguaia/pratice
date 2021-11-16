import fnnn from './1'

export interface WWW {
  name: string;
  age: number
}

function genPerson(user: WWW) {
  console.log(user);
  return user.age + 'ds'
}

genPerson({ name: 'w', age: 12 })

const asw = fnnn({ name: 'ew', age: 12 })
console.log(asw);
