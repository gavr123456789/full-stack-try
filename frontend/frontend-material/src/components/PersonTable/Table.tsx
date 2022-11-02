import React, {FC, useCallback, useMemo, useState} from 'react';
import MaterialReactTable, {MRT_ColumnDef} from 'material-react-table';
import {Button} from '@mui/material';
import {FormDialog} from "./FormDialog";
import {Person} from "./types";

//nested data is ok, see accessorKeys in ColumnDef below
const data2: Person[] = [
  { age: 1, name: { firstName: "first sas", lastName: "second sas" } },
  { age: 2, name: { firstName: "first sas", lastName: "second sas" } },
  { age: 3, name: { firstName: "first sas", lastName: "second sas" } },
  { age: 4, name: { firstName: "first sas", lastName: "second sas" } },
  { age: 5, name: { firstName: "first sas", lastName: "second sas" } },
]




const PersonTable: FC = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
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

  const addNewPerson = useCallback((person: Person) => {
    console.log("added person: ", person)
  }, [])


  return (
    <div>

      <MaterialReactTable
        columns={columns}
        data={data2}

        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => {

          const handleActivate = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              console.log(row.original.age);
            });
          };

          const handleContact = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              alert('contact ' + row.original.age);
            });
          };

          return (

            <div style={{ display: 'flex', gap: '0.5rem' }}>


              <FormDialog submitNewPerson={addNewPerson} />

              <Button
                color="success"
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
              <Button
                color="info"
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button>

            </div>
          );
        }}

        renderDetailPanel={({ row }) => (
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
