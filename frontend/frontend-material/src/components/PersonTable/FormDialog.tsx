import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, {ChangeEvent, FC, useEffect} from "react";
import {convertPersonToRow, convertFlatToPerson, EMPTY_PERSON_ROW, Person, PersonFlat} from "./types";
import {Box} from '@mui/material';
import {nameOf} from "../../utils/typeUtils";

type SubmitPersonFunc = (person: Person) => Promise<number>
type FormDialogProps =
  {
    kind: "add"
    submitNewPerson: SubmitPersonFunc,
    text: "Add new person"

  } |
  {
    kind: "edit"
    disabled: boolean, // only edit can be disabled
    submitNewPerson: SubmitPersonFunc,
    text: "Edit person"
    person: Person
  }


type Event = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>


function fieldIsEmpty(text: string) {
  return text.length < 1
}

export const FormDialog: FC<FormDialogProps> = (props) => {
  const {submitNewPerson,  text} = props
  const [isOpen, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(EMPTY_PERSON_ROW);

  useEffect(() => {
    if (props.kind === "edit") {
      setFormValues(convertPersonToRow(props.person))
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetModel = () => {
    setFormValues(EMPTY_PERSON_ROW)
  }
  const handleClose = () => {
    resetModel()
    setOpen(false);
  };

  const handleInputChange = (e: Event) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  function handleSubmit() {
    submitNewPerson(convertFlatToPerson(formValues))
    handleClose()
  }

  return (
    <div>
      <Button variant="outlined" color={props.kind === "add"? "success": "info"} onClick={handleClickOpen}>
        {text}
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>

          <Box sx={{display: "flex", gap: "1em", flexWrap: "wrap"}}>


            <TextField
              error={fieldIsEmpty(formValues.firstName)}
              name={nameOf<PersonFlat>("firstName")}
              id="input-with-icon-textfield"
              label="First name"
              value={formValues.firstName}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              error={fieldIsEmpty(formValues.lastName)}

              name={nameOf<PersonFlat>("lastName")}
              id="input-with-icon-textfield"
              label="Last name"
              value={formValues.lastName}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              error={fieldIsEmpty(formValues.lastName)}

              name={nameOf<PersonFlat>("nick")}
              id="input-with-icon-textfield"
              label="Nick name"
              value={formValues.nick}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              error={formValues.age < 1}
              name={nameOf<PersonFlat>("age")}
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
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
