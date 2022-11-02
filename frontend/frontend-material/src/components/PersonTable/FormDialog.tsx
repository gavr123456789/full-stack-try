import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {ChangeEvent, FC} from "react";
import {Person} from "./types";
import {Box} from '@mui/material';
import {nameOf} from "../../utils/typeUtils";


interface FormDialogProps {
  submitNewPerson: (person: Person) => void,
}





const defaultValues = {
  firstName: "",
  lastName: "",
  age: 0,
};
type DefaultValues = typeof defaultValues

export const FormDialog: FC<FormDialogProps> = ({submitNewPerson}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(defaultValues);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  function handleSubmit() {
    const {age, lastName, firstName} = formValues
    const newPerson: Person = {
      age,
      name: {
        firstName,
        lastName
      }
    }
    submitNewPerson(newPerson)
  }

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleClickOpen}>
        Add new Person
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new person
          </DialogContentText>
          <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap"}} >


            <TextField
              error={false}
              name={nameOf<DefaultValues>("firstName") }
              id="input-with-icon-textfield"
              label="First name"
              value={formValues.firstName}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              error={false}
              name={nameOf<DefaultValues>("lastName") }
              id="input-with-icon-textfield"
              label="Last name"
              value={formValues.lastName}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              error={false}
              name={nameOf<DefaultValues>("age") }
              id="input-with-icon-textfield"
              label="Age"
              type="number"
              value={formValues.age}
              onChange={handleInputChange}
              variant="standard"
            />

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
