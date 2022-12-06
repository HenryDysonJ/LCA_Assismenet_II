import Autocomplete from "@mui/material/Autocomplete";
import { Typography, Grid, TextField } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

export const Select = ({
  label = "",
  onChange = () => false,
  value = "",
  options = [],
  errorMsg = "",
  isError = false,
  IconTitle,
}) => {
  return (
    <Grid container direction="row" justifyContent="space-between">
      <Typography
        sx={{ fontSize: 12 }}
        variant="subtitle-1"
        component={"h6"}
        color="secondary.contrastText"
      >
        {label}
      </Typography>
      <Typography
        variant="subtitle1"
        component={"subtitle1"}
        style={{ fontSize: 10 }}
        color="secondary.contrastText"
        value=""
      >
        <Tooltip title={IconTitle} placement="top-start">
          <InfoOutlinedIcon sx={{ fontSize: "20px" }} />
        </Tooltip>
      </Typography>
      <Autocomplete
        disablePortal
        fullWidth
        size="small"
        id="combo-box-demo"
        options={options}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Select" error={isError} />
        )}
      />
    </Grid>
  );
};


