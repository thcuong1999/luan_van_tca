import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const MaterialCard = ({ style, children }) => {
  return (
    <Card sx={{ minWidth: 275 }} style={style}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MaterialCard;
