import React from "react";
import TextField from "@mui/material/TextField";

const InputText = ({
  name,
  value,
  onChange,
  label,
  disabled,
  multiline,
  rows,
  size = "medium",
}) => {
  return (
    <TextField
      id="outlined-password-input"
      label={label}
      type="text"
      autoComplete="current-password"
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      size={size}
    />
  );
};

export default InputText;
