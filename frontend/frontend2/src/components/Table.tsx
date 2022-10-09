import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Button } from '@mui/material';

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

const Example: FC = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  return (
    <div style={{
      // display: "grid",
      // gridTemplateColums: "1fr",
      // gridTemplateRows: "auto 1fr auto",
      // height: "100vh"
    }}>
      <MaterialReactTable
        columns={columns}
        data={data}

        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => {

          const handleDeactivate = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              alert('deactivating ' + row.original.city);
            });
          };
  
          const handleActivate = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              console.log(row.original.city);
              
              // alert('activating ' + row// .getValue('name'));
            });
          };
  
          const handleContact = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              alert('contact ' + row.original.city);
            });
          };
  
          return (
  
            <div style={{ display: 'flex', gap: '0.5rem' }}>
  
              <Button
                color="error"
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button>
  
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
        enableColumnResizing
        // defaultColumn={{
        //   maxSize: 100,
        //   minSize: 40,
        //   size: 40, //default size is usually 180
        // }}
        columnResizeMode="onChange"
      />
      {/* sds */}
    </div>
  );
};

export default Example;