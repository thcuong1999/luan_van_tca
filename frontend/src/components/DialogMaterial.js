import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@mui/material/Button";

const DialogMaterial = ({
  onClick1,
  onClick2,
  title,
  content,
  text1,
  text2,
  onClose,
  open,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent style={{ minWidth: 380 }}>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClick1} color="primary" style={{ outline: "none" }}>
          {text1}
        </Button>
        <Button
          onClick={onClick2}
          color="primary"
          autoFocus
          style={{ outline: "none" }}
        >
          {text2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMaterial;
