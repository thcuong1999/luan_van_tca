import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropdownMaterial2 = ({ children, label, value, onChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          shrink={false}
          style={{ fontSize: 15 }}
        >
          {value ? "" : label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label=""
          onChange={onChange}
          style={{ color: "#333", fontSize: 15 }}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownMaterial2;
