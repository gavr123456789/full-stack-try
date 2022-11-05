// for no, no pagination supported
import {convertFlatToPerson, Person, PersonFlat} from "../components/PersonTable/types";
import axios from "axios";


type PersonResponse = {
  name: string,
  nick: string,
  id: number,
  age: number
}

type PersonRequest = Omit<PersonResponse, "id">

function convertResponseToPerson(person: PersonResponse): Person {
  const {age, id, name, nick} = person

  const splitted = name.split(" ")
  if (splitted.length !== 2) {
    alert("Error inside DTO, name must contain first name and last name, but ${name}")
    throw new Error(`Error inside DTO, name must contain first name and last name, but ${name}`)
  }

  return {
    age,
    name: {
      firstName: splitted[0],
      lastName: splitted[1]
    },
    id,
    nick
  }
}
function convertPersonToRequest(person: Person): PersonRequest {
  const {age, id, name: {firstName, lastName}, nick} = person
  return {
    age,
    name: firstName + " " + lastName,
    nick
  }
}

export async function getAllPersons(): Promise<Person[]> {
  try {
    const data = (await axios.get<PersonResponse[]>('/getAllPersons')).data
    return data.map(x => convertResponseToPerson(x))
  } catch (e) {
    alert(e)
  }
  return []
}

export async function addNewPersons(person: Person): Promise<number> {
  const requestBody =convertPersonToRequest(person)
  try {
    const data = (await axios.post<undefined, number, PersonRequest>('/person/add', requestBody))
    return data
  } catch (e) {
    alert(e)
  }
  return 0
}

