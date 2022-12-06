import { Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";




export const DateCalendar = ({
  lable = "",
  value = "",
  minDate = "",
  onChange = () => false,
  renderInput
}) => {
  return (
    <Grid container direction="row" justifyContent="flex-start">
      <Typography
        sx={{ fontSize: 12 }}
        variant="subtitle-1"
        component={"h6"}
        color="secondary.contrastText"
      >
        {lable}
      </Typography>
      <Typography color="secondary.dark" variant="subtitle-1"> *</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
          value={value}
          minDate={minDate}
          inputFormat="DD-MM-YYYY"
          onChange={onChange}
          renderInput={renderInput}
        />
      </LocalizationProvider>
    </Grid>
  );
};


