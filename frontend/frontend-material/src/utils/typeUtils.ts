
// default keyof returns string | number | symbol, so we need to exclude all except string
// import {Person} from "../components/PersonTable/types";

export const nameOf = <T,>(name: Extract<keyof T, string>): string => name;



// experiment
type Person = {
  name: {
    firstName: string;
    lastName: string;
    x: {wtf: string, x: {is_this: string}}
  };
  age: number
};

type Primitive = string | number | boolean
type FlattenPairs<T> =
  {
    [K in keyof T]: T[K] extends Primitive // если ключ является одним из примитивов
    ? [K, T[K]] // создаем пару название ключа: тип ключа
    : FlattenPairs<T[K]> // иначе рекурсируем это дело
  } [keyof T] & [PropertyKey, Primitive]
type Flatten<T> = {[P in FlattenPairs<T> as P[0]]: P[1]} // тип с ключами[0] и типами ключей[1], то есть объектом
type eee = Flatten<Person>

// const a: eee = {
//   firstName: "",

// }

// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
// type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;
// // берем 2 поля из name: {firstName: string, lastName: string}
// type namePart = PickAndFlatten<Person, "name">
// // {age: number}
// type agePart = Pick<Person, "age">
// // соединяем их в один тип
// type eee = namePart & agePart


