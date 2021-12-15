import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Input = styled("input")({
  display: "none",
});

const UploadButton = ({ onChange, ref }) => {
  return (
    <label htmlFor="contained-button-file">
      <Input
        ref={ref}
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={onChange}
      />
      <Button variant="contained" component="span">
        <span>Upload</span>
        <i class="fas fa-upload" style={{ fontSize: 18, marginLeft: 10 }}></i>
      </Button>
    </label>
  );
};

export default UploadButton;
