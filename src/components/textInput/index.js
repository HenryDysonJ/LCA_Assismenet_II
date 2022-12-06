import { TextField, Typography, Grid } from "@mui/material";

export const InputLable = ({
  lable = "",
  isError,
  value = "",
  placeholder,
  onChange = () => false,
  helperText = "",
}) => {
  return (
    <Grid container justifyContent="flex-start">
      <Typography
        sx={{ fontSize: 12 }}
        variant="subtitle-1"
        component={"h6"}
        color="secondary.contrastText"
      >
        {lable}
      </Typography>
      <Typography color="secondary.dark" variant="">
        {" "}
        *
      </Typography>
      <TextField
        sx={{ mt: 1 }}
        fullWidth
        error={isError}
        size="small"
        type="text"
        value={value}
        fullwidth
        placeholder={placeholder}
        onChange={onChange}
        id="fullWidth"
        helperText={helperText}
      />
    </Grid>
  );
};
