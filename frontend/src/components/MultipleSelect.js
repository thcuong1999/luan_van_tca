import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({ children, label, value, onChange }) => {
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a the stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          id="demo-multiple-name-label"
          shrink={false}
          style={{ fontSize: 15 }}
        >
          {value?.length ? "" : label}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="" />}
          MenuProps={MenuProps}
          style={{ color: "#333", fontSize: 15 }}
        >
          {/* {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))} */}
          {children}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;

// import * as React from "react";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const MultipleSelectCheckmarks = ({ label, value, onChange, renderData }) => {
//   // const [personName, setPersonName] = React.useState([]);

//   //   const handleChange = (event) => {
//   //     const {
//   //       target: { value },
//   //     } = event;
//   //     setPersonName(
//   //       // On autofill we get a the stringified value.
//   //       typeof value === "string" ? value.split(",") : value
//   //     );
//   //   };

//   return (
//     <div>
//       <FormControl sx={{ width: "100%" }}>
//         <InputLabel id="demo-multiple-checkbox-label" shrink={false}>
//           {value.length ? "" : label}
//         </InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={value}
//           onChange={onChange}
//           input={<OutlinedInput label="" />}
//           renderValue={(selected) => selected.join(", ")}
//           MenuProps={MenuProps}
//         >
//           {renderData &&
//             renderData.length &&
//             renderData.map((name) => (
//               <MenuItem key={name} value={name}>
//                 <Checkbox checked={value.indexOf(name) > -1} />
//                 <ListItemText primary={name} />
//               </MenuItem>
//             ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default MultipleSelectCheckmarks;
