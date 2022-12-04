import { TextField } from "@mui/material";

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
    value,
  } = props;

  return (
    <>
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            padding: "0 !important",
            fontSize: "14px",
            width: "88%",
            alignContent: "center",
            ml: 2,
          },
        }}
        error={error}
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        startAdornment={startAdornment}
        InputProps={InputProps}
        name={name}
        size={"small"}
      ></TextField>
    </>
  );
};
