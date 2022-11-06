// for no, no pagination supported
import {Person} from "./types";
import axios from "axios";


type PersonResponse = {
  name: string,
  nick: string,
  id: number,
  age: number
}
type PersonEditRequest = PersonResponse

type AddPersonRequest = Omit<PersonResponse, "id">

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

function convertPersonToEditRequest(person: Person): PersonEditRequest {
  const {age, name: {firstName, lastName}, nick, id} = person
  return {
    age,
    name: firstName + " " + lastName,
    nick,
    id
  }
}
function convertPersonToRequest(person: Person): AddPersonRequest {
  const {age, name: {firstName, lastName}, nick} = person
  return {
    age,
    name: firstName + " " + lastName,
    nick
  }
}

// gets
export async function getAllPersons(): Promise<Person[]> {
  try {
    const data = (await axios.get<PersonResponse[]>('/persons')).data
    return data.map(x => convertResponseToPerson(x))
  } catch (e) {
    alert(e)
  }
  return []
}

export async function deletePerson(id: number[]): Promise<void> {
  try {
    await axios.delete<PersonResponse[]>(`/persons/${id}`)
  } catch (e) {
    alert(e)
  }
}

interface DeletePersonsRequest {
  rowsIds: number[]
}

export async function deletePersons(rowsIds: number[]): Promise<void> {
  const requestBody: DeletePersonsRequest = {rowsIds}
  try {
    (await axios.post<undefined, void, DeletePersonsRequest>('/persons/deleteMany', requestBody))
  } catch (e) {
    alert(e)
  }
}


// posts
export async function addNewPersons(person: Person): Promise<number> {
  const requestBody = convertPersonToRequest(person)
  try {
    return (await axios.post<undefined, number, AddPersonRequest>('/persons/add', requestBody))
  } catch (e) {
    alert(e)
  }
  return 0
}

export async function editPersons(person: Person): Promise<void> {
  const requestBody = convertPersonToEditRequest(person)
  try {
    await axios.post<undefined, void, PersonResponse>('/persons/edit', requestBody)
  } catch (e) {
    alert(e)
  }
}

