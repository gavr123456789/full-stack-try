import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import MaterialReactTable, {MRT_ColumnDef} from 'material-react-table';
import {Button} from '@mui/material';
import {FormDialog} from "./FormDialog";
import {EMPTY_PERSON, Person} from "./types";
import {addNewPersons, getAllPersons} from "../../services/personService";



console.log("sasss", process.env.REACT_APP_BASE_URL)

const PersonTable: FC = () => {

  const [data, setData] = useState<Person[]>([])


  useEffect(() => {
    reload().then(_ => {
      console.log("Person table data reloaded")
    })
  }, [])

  const reload = async () => {
    const persons = await getAllPersons()
    setData(persons)
  }

  // should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'nick',
        header: 'Nick name',
      },
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: "age",
        header: "Age"
      }
    ],
    [],
  );


  const addNewPerson = useCallback(async (person: Person) => {
    const id = await addNewPersons(person)
    await reload()
    return id
  }, [])

  const editPerson = useCallback((person: Person) => {
    console.log("added person: ", person)
    const realTempId = 222
    person.id = realTempId
    setData([...data, person])
  }, [])

  const deletePerson = useCallback((person?: Person) => {
    if (!person) return;

    console.log("added person: ", person)

    // get new data from server
    setData([...data, person])
  }, [])

  return (
    <div>

      <MaterialReactTable
        columns={columns}
        data={data}

        enableRowSelection
        renderTopToolbarCustomActions={({table}) => {


          const currentRow = table.getSelectedRowModel().rows.at(0)?.original
          return (

            <div style={{display: 'flex', gap: '0.5rem'}}>

              <FormDialog submitNewPerson={addNewPerson} kind={"add"} text={"Add new person"}/>

              <FormDialog
                submitNewPerson={addNewPerson}
                kind={"edit"}
                text={"Edit person"}
                disabled={table.getSelectedRowModel().flatRows.length !== 1}
                person={currentRow ?? EMPTY_PERSON}
              />



              <Button
                color="error"
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={() => {deletePerson(currentRow)}}
                variant="outlined"
              >
                Delete
              </Button>

            </div>
          );
        }}

        renderDetailPanel={({row}) => (
          <Button>Sas</Button>
        )}
        // enableColumnResizing
        // defaultColumn={{
        //   maxSize: 100,
        //   minSize: 40,
        //   size: 40, //default size is usually 180
        // }}
        // columnResizeMode="onChange"
      />
    </div>
  );
};

export default PersonTable;
