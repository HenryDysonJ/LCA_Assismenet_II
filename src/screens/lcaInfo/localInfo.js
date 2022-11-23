import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Button,
  FormControl,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Popover from "@mui/material/Popover";
import { useNavigate, useLocation } from "react-router-dom";
import nextId from "react-id-generator";
import { Alert, Snackbar } from "@mui/material";
import moment from "moment/moment";

const LocalInfo = () => {
  const [value, setValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState(null);

  const [error, setError] = useState({
    clasfition: !null,
    workLocation: !null,
    jobRole: !null,
    workLocation: !null,
    EName: !null,
    ENumber: !null,
    Email: !null,
    ECode: !null,
    destnation: !null,
    visaType: !null,
    AsstReqNo: !null,
    visaReq: !null,
    workPerNo: !null,
    StartDate: !null,
    EndDate: !null,
  });
  const [state, setState] = useState({
    openss: false,
    vertical: "top",
    horizontal: "center",
  });
  const [formValue, setFormValue] = useState({
    id: "",
    clasfition: "",
    jobRole: "",
    workLocation: "",
    ENumber: "",
    EName: "",
    ECode: "",
    Email: "",
    destnation: "",
    visaType: "",
    AsstReqNo: "",
    workPerNo: "",
    StartDate: "",
    EndDate: "",
    visaReq: "",
  });

  let navigate = useNavigate();
  let unicId = nextId();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { vertical, horizontal, openss } = state;
  let editData = useLocation();

  useEffect(() => {
    if (editData) {
      setFormValue(editData?.state?.item?.formValue);
    }
  }, [editData.length > 0]);

  const ComOnchangeVal = (e, val, type) => {
    setFormValue({
      ...formValue,
      [type]: val
    });
    setError({ ...formValue, [type]: val });
  };
  console.log(formValue, "dateChech");
  const handleClicksnak = (newState) => () => {
    setState({ openss: true, ...newState });
  };

  const handleClosed = () => {
    setState({ ...state, openss: false });
    navigate("/list");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    navigate("/list");
  };
  const handleSubmit = () => {
    let showList = [];
    const show = {
      formValue,
    };

    if (!formValue) {
      setError(undefined);
    } else if (formValue.id) {
      // edit Exist new list
      let editId = formValue.id;
      let list = JSON.parse(localStorage.getItem("showList") || "[]");
      list[list.findIndex((val) => val.formValue.id === editId)] = show;
      showList = list;
      localStorage.setItem("showList", JSON.stringify(showList));
      navigate("/list");
    } else if (formValue) {
      //  create new list
      formValue["id"] = unicId;
      showList.push(show);
      showList = showList.concat(
        JSON.parse(localStorage.getItem("showList") || "[]")
      );
      localStorage.setItem("showList", JSON.stringify(showList));
      navigate("/list");
    }
  };
  return (
    <div>
      <AppBar position="static" color="secondary">
        <Toolbar variant="dense">
          <Tabs
            value={value}
            onChange={() => handleChange()}
            aria-label="disabled tabs example"
          >
            <Tab value="1" label="LCA Info" />
            <Tab value="2" label="Location & Posting Info" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <FormControl>
        <Grid container rowGap={2} columnSpacing={0} padding={6} mt={0}>
          <Grid
            container
            columnSpacing={{ xs: 3, md: 2, lg: 2 }}
            rowGap={{ xs: 2, md: 2, lg: 2 }}
          >
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="space-between">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  LCA CLASIFICATION
                </Typography>
                <Typography
                  variant="subtitle1"
                  component={"subtitle1"}
                  style={{ fontSize: 10 }}
                  color="secondary.contrastText"
                >
                  <InfoOutlinedIcon
                    onClick={handleClick}
                    aria-describedby={id}
                  />
                </Typography>

                <Autocomplete
                  fullWidth
                  size="small"
                  id="combo-box-demo"
                  options={clasification}
                  onChange={(e, val) => ComOnchangeVal(e, val, "clasfition")}
                  value={formValue?.clasfition}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select"
                      error={error?.clasfition ? false : true}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="space-between">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  ROLE
                </Typography>
                <Typography
                  variant="subtitle1"
                  component={"subtitle1"}
                  style={{ fontSize: 10 }}
                  color="secondary.contrastText"
                >
                  <InfoOutlinedIcon
                    onClick={handleClick}
                    aria-describedby={id}
                  />
                </Typography>
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  id="combo-box-demo"
                  options={jobRole}
                  onChange={(e, val) => ComOnchangeVal(e, val, "jobRole")}
                  value={formValue?.jobRole}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select"
                      error={error?.jobRole ? false : true}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="space-between">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  NUMBER OF WORK LOCATION
                </Typography>
                <Typography
                  variant="subtitle1"
                  component={"subtitle1"}
                  style={{ fontSize: 10 }}
                  color="secondary.contrastText"
                  value=""
                >
                  <InfoOutlinedIcon
                    onClick={handleClick}
                    aria-describedby={id}
                  />
                </Typography>
                <Autocomplete
                  disablePortal
                  fullWidth
                  error
                  name="workLocation"
                  size="small"
                  id="combo-box-demo"
                  options={workLocation}
                  value={formValue?.workLocation}
                  onChange={(e, val) => ComOnchangeVal(e, val, "workLocation")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select"
                      error={error?.workLocation ? false : true}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" component="h6">
            EMPOYEE PORSONAL INFORMATION{" "}
          </Typography>
          <Grid
            container
            columnSpacing={{ xs: 3, md: 2, lg: 2 }}
            rowGap={{ xs: 2, md: 2, lg: 2 }}
          >
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  EMPLOYEE NUMBER
                </Typography>
                <TextField
                  fullWidth
                  error={error?.ENumber ? false : true}
                  size="small"
                  type="text"
                  value={formValue?.ENumber}
                  fullwidth
                  InputProps={{ name: "ENumber" }}
                  placeholder="Enter Emploee Number"
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "ENumber")
                  }
                  id="fullWidth"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  EMPLOYEE NAME
                </Typography>
                <Typography color="secondary.dark" variant="">
                  {" "}
                  *
                </Typography>
                <TextField
                  error={error?.EName ? false : true}
                  size="small"
                  type="text"
                  fullwidth
                  value={formValue?.EName}
                  InputProps={{ name: "EName" }}
                  placeholder="Enter Emploee Full Name"
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "EName")
                  }
                  fullWidth
                  id="fullWidth"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  EMPLOYEE CODE
                </Typography>
                <Typography color="secondary.dark" variant="">
                  {" "}
                  *
                </Typography>
                <TextField
                  fullWidth
                  id="fullWidth"
                  error={error?.ECode ? false : true}
                  size="small"
                  fullwidth
                  value={formValue?.ECode}
                  InputProps={{ name: "ECode" }}
                  placeholder="Enter the ECode "
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "ECode")
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              {" "}
              {/* Email id */}
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  OFFICIAL EMAIL ID
                </Typography>
                <Typography color="secondary.dark" variant="">
                  {" "}
                  *
                </Typography>
                <TextField
                  fullWidth
                  id="fullWidth"
                  error={error?.Email ? false : true}
                  size="small"
                  fullwidth
                  value={formValue?.Email}
                  InputProps={{ name: "Email" }}
                  placeholder="Enter the Email "
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "Email")
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" component="h6">
            ASSIGNMENT INFORMATION{" "}
          </Typography>
          <Grid
            container
            columnSpacing={{ xs: 3, md: 2, lg: 2 }}
            rowGap={{ xs: 2, md: 2, lg: 2 }}
          >
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  DESTINATION COUNTRY
                </Typography>
                <Typography color="secondary.dark" variant="subtitle">
                  {" "}
                  *
                </Typography>
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  id="combo-box-demo"
                  options={destnation}
                  value={formValue?.destnation}
                  onChange={(e, val) => ComOnchangeVal(e, val, "destnation")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select"
                      error={error?.destnation ? false : true}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  VISA TYPE
                </Typography>
                <Typography color="secondary.dark" variant="">
                  {" "}
                  *
                </Typography>
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  id="combo-box-demo"
                  options={visaType}
                  value={formValue?.visaType}
                  onChange={(e, val) => ComOnchangeVal(e, val, "visaType")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select"
                      error={error?.visaType ? false : true}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  ASSIGNMENT REQUEST NO
                </Typography>
                <TextField
                  fullWidth
                  error={error?.AsstReqNo ? false : true}
                  size="small"
                  fullwidth
                  value={formValue?.AsstReqNo}
                  placeholder="Enter Assignment Request No"
                  InputProps={{ name: "AsstReqNo" }}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "AsstReqNo")
                  }
                  id="fullWidth"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  WORK PERMIT REQUEST NO
                </Typography>
                <TextField
                  fullWidth
                  error={error?.workPerNo ? false : true}
                  size="small"
                  type="text"
                  value={formValue?.workPerNo}
                  fullwidth
                  placeholder="Enter Work Permit Request No"
                  InputProps={{ name: "workPerNo" }}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "workPerNo")
                  }
                  id="fullWidth"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            columnSpacing={{ xs: 3, md: 2, lg: 2 }}
            rowGap={{ xs: 1, md: 2, lg: 1 }}
            mt={2}
          >
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  WORK PERMIT START DATE
                </Typography>
                <Typography color="secondary.dark" variant="">
                  {" "}
                  *
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disablePast
                    inputFormat="DD/MM/YYYY"
                    value={formValue?.StartDate}
                    minDate={formValue?.StartDate}
                    // minDate={dayjs("2022/11/10")}
                    onChange={(newValue) => {
                      setFormValue({
                        ...formValue,
                        StartDate: newValue,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        error={error?.StartDate ? false : true}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  WORK PERMIT END DATE
                </Typography>
                <Typography color="secondary.dark" variant="">
                  {" "}
                  *
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  disablePast
                    value={formValue?.EndDate}
                    maxDate={formValue?.EndDate}
                    // maxDate={dayjs("2022/12/20")}
                    onChange={(newValue) => {
                      setFormValue({
                        ...formValue,
                        EndDate: newValue,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        error={error?.EndDate ? false : true}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="flex-start">
                <Typography
                  variant="h6"
                  component={"h6"}
                  style={{ fontSize: 13 }}
                  color="secondary.contrastText"
                >
                  VISA REQUEST NUMBER
                </Typography>
                <Typography color="secondary.dark" variant="">
                  {" "}
                  *
                </Typography>
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  value={formValue?.visaReq}
                  onChange={(e, val) => ComOnchangeVal(e, val, "visaReq")}
                  id="combo-box-demo"
                  options={visaReq}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select"
                      error={error?.visaReq ? false : true}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={12}
          p={2}
          direction="row"
          style={{ backgroundColor: "#bcc8ce" }}
          justifyContent="flex-end"
          padding={2}
          columnGap={3}
        >
          <Grid item sx={2}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "primary.contrastText",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid
            item
            sx={2}
            // onClick={handleClicksnak({
            //   vertical: "top",
            //   horizontal: "right",
            // })}
          >
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              {" "}
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "left",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 1 }}>This is LCA Info Pleace note </Typography>
      </Popover>
      <Snackbar
        open={openss}
        autoHideDuration={6000}
        onClose={handleClosed}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClosed}
          variant="filled"
          severity="info"
          sx={{ width: "100%" }}
        >
          Your Form has Successfuly Submitted
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LocalInfo;

const clasification = [
  {
    label: "LCA-DEC-20_111122",
  },
  {
    label: "LCA-DEC-20_1121223",
    value: "LCA-DEC-20_11212",
  },
  {
    label: "LCA-DEC-20_1132241",
    value: "LCA-DEC-20_113",
  },
  {
    label: "LCA-DEC-20_1145468",
    value: "LCA-DEC-20_114",
  },
];
const jobRole = [
  {
    label: "Assosiate",
    value: "Assosiate",
  },
  {
    label: "Process",
    value: "Process",
  },
  {
    label: "Senior Associate",
    value: "Senior Associate",
  },
  {
    label: "Team Lead",
    value: "Team Lead",
  },
  {
    label: "Human Resource",
    value: "Human Resource",
  },
  {
    label: "Manage",
    value: "Manage",
  },
];
const workLocation = [
  {
    label: "Chennai",
    value: "Chennai",
  },
  {
    label: "Cuddalore",
    value: "Cuddalore",
  },
  {
    label: "Bangalore",
    value: "Bangalore",
  },
  {
    label: "Thanjavur",
    value: "Thanjavur",
  },
  {
    label: "Madurai",
    value: "Madurai",
  },
  {
    label: "Theni",
    value: "Theni",
  },
];
const visaReq = [
  {
    label: "AFH1334",
    value: "AFH1334",
  },
  {
    label: "UYI673",
    value: "UYI673",
  },
  {
    label: "UIAS6812",
    value: "UIAS6812",
  },
  {
    label: "JHSF8622",
    value: "JHSF8622",
  },
  {
    label: "visaReq",
    value: "JASL339",
  },
];
const visaType = [
  {
    label: "Tourist",
    value: "e-Tourist",
  },
  {
    label: "Business",
    value: "e-Business",
  },
  {
    label: "MedicaL",
    value: "e-MedicaL",
  },
  {
    label: "Medical Attendant",
    value: "e-Medical Attendant",
  },
  {
    label: "Confrenece",
    value: "e-Confrenece",
  },
];
const destnation = [
  {
    label: "Tokiyo",
    value: "Tokiyo",
  },
  {
    label: "London",
    value: "London",
  },
  {
    label: "USA",
    value: "USA",
  },
  {
    label: "Italy",
    value: "Italy",
  },
  {
    label: "destnation",
    value: "China",
  },
  {
    label: "India",
    value: "India",
  },
];
