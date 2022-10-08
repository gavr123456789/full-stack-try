import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ListChildComponentProps } from "react-window";

export function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

