import {  TextField } from "@mui/material";

export const InputBox = (props) => {
  const {
    label,
    type,
    placeholder,
    onChange,
    startAdornment,
    InputProps,
    size,
    name,
    error,
    value
  } = props;

  return (
    <>
      <TextField
        sx={{ "& .MuiInputBase-root": { padding: "0 !important" } }}
        error={error}
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        startAdornment={startAdornment}
        InputProps={InputProps}
        size={size}
        name={name}
      ></TextField>
    </>
  );
};


