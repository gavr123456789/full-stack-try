import {Flatten} from "../../utils/typeUtils";

export type Person = {
  id: number,
  name: {
    firstName: string;
    lastName: string;
  };
  age: number
};

export const EMPTY_PERSON: Readonly<Person> = {
  age: 0,
  id: 0,
  name: {
    firstName: "",
    lastName: ""
  }
}

export type PersonRow = Flatten<Person>

export const EMPTY_PERSON_ROW: Readonly<PersonRow> = {
  id: 0,
  firstName: "",
  lastName: "",
  age: 1,
}
