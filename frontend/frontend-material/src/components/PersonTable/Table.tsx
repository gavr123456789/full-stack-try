import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import MaterialReactTable, {MRT_ColumnDef, MRT_Row} from 'material-react-table';
import {Button} from '@mui/material';
import {FormDialog} from "./FormDialog";
import {EMPTY_PERSON, Person} from "./types";
import {addNewPersons, deletePersons, getAllPersons} from "./personService";


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


  const addNewPersonCb = useCallback(async (person: Person) => {
    const id = await addNewPersons(person)
    await reload()
    return id
  }, [])

  const editPersonCb = useCallback((person: Person) => {
    console.log("added person: ", person)
    const realTempId = 222
    person.id = realTempId
    setData([...data, person])
  }, [])

  const deletePersonCb = useCallback(async (selectedRows: MRT_Row<Person>[]) => {
    if (selectedRows.length === 0) return;
    selectedRows.forEach(x => x.toggleSelected(false))
    const persons = selectedRows.map(x => x.original.id)
    await deletePersons(persons)
    await reload()
  }, [])

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}

        enableRowSelection
        renderTopToolbarCustomActions={({table}) => {


          const currentRow = table.getSelectedRowModel().rows.at(0)?.original
          const currentRows = table.getSelectedRowModel().rows
          return (

            <div style={{display: 'flex', gap: '0.5rem'}}>

              <FormDialog submitNewPerson={addNewPersonCb} kind={"add"} text={"Add new person"}/>

              <FormDialog
                submitNewPerson={addNewPersonCb}
                kind={"edit"}
                text={"Edit person"}
                disabled={table.getSelectedRowModel().flatRows.length !== 1}
                person={currentRow ?? EMPTY_PERSON}
              />


              <Button
                color="error"
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={() => {deletePersonCb(currentRows)}}
                variant="outlined"
              >
                Delete
              </Button>

            </div>
          );
        }}

      />
    </>
  );
};

export default PersonTable;
