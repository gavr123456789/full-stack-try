import {Flatten} from "../../utils/typeUtils";

export type Person = {
  id: number,
  name: {
    firstName: string;
    lastName: string;
  };
  nick: string
  age: number
};

export const EMPTY_PERSON: Readonly<Person> = {
  age: 0,
  id: 0,
  name: {
    firstName: "",
    lastName: ""
  },
  nick: ""
}

export type PersonFlat = Flatten<Person>

export const EMPTY_PERSON_ROW: Readonly<PersonFlat> = {
  id: 0,
  lastName: "",
  firstName: "",
  nick: "",
  age: 1,
}

export function convertPersonToRow(person: Person): PersonFlat {
  const {age, id, name: {firstName, lastName}, nick} = person
  return {
    age,
    firstName,
    lastName,
    id,
    nick
  }
}

export function convertFlatToPerson(person: PersonFlat): Person {
  const {age, id, firstName, lastName, nick} = person

  return {
    age,
    name: {
      firstName,
      lastName
    },
    id,
    nick
  }
}
