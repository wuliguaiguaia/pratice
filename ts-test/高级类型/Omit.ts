// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// type Exclude<T, U> = T extends U ? never : T;

type Omit2<T, K extends keyof any> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

interface PersoneP {
  id: number;
  name: string;
  age: number
}

const god2: Omit2<PersoneP, 'name' | 'id'> = {
  age: 1,
}

// const god3: Pick2<PersoneP, 'name' | 'id'> = {
//   name: '123',
//   id: 1
// }

console.log(god2);

// type

