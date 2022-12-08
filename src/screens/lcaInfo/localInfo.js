import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Grid, Button, FormControl } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import nextId from "react-id-generator";
import moment from "moment/moment";
import { Select } from "../../components/autoComplete";
import { InputLable } from "../../components/textInput";
import { DateCalendar } from "../../components/dateCalendar";
import { HeadingInfo } from "../../components/typographyHead";
import { ButnGrid } from "./styleInfo";

const LocalInfo = () => {
  const [value, setValue] = useState("1");
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
    hal:""
  });

  let navigate = useNavigate();
  let unicId = nextId();
  let editData = useLocation();
  useEffect(() => {
    if (editData) {
      setFormValue(editData?.state?.item?.formValue);
    }
  }, [editData.length > 0]);

  const ComOnchangeVal = (e, val, type) => {
    let error = formValue?.error;
    setFormValue({
      ...formValue,
      [type]: val,
    });
    setError({ ...formValue, [type]: val });
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    navigate("/list");
  };
  const validation = () => {
    let isValid = true;
    let error = formValue?.error;
    if (formValue?.Email?.length > 0) {
      isValid = false;
    }
    setFormValue({ ...formValue, error });
    return isValid;
  };
  const handleSubmit = () => {
    if (validation()) {
    }
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let showList = [];
    let newData = [];
    const show = {
      formValue,
    };
    if (!formValue) {
      setError(true);
    } else if (formValue.id) {
      // edit Exist new list
      let editId = formValue.id;
      let list = JSON.parse(localStorage.getItem("showList") || "[]");
      list[list.findIndex((val) => val.formValue.id === editId)] = show;
      showList = list;
      localStorage.setItem("showList", JSON.stringify(showList));
      if (
        formValue.Email &&
        regexEmail.test(formValue.Email) === true &&
        formValue.EName &&
        formValue.ENumber &&
        formValue.ECode &&
        formValue.Email &&
        formValue.AsstReqNo &&
        formValue.workPerNo
      ) {
        navigate("/list");
      }
    } else if (formValue) {
      //  create new list
      if (
        formValue.Email &&
        regexEmail.test(formValue.Email) === true &&
        formValue.EName &&
        formValue.ENumber &&
        formValue.ECode &&
        formValue.Email &&
        formValue.AsstReqNo &&
        formValue.workPerNo
      ) {
        formValue["id"] = unicId;
        showList.push(show);
        showList = showList.concat(
          JSON.parse(localStorage.getItem("showList") || "[]")
        );
        localStorage.setItem("showList", JSON.stringify(showList));
        navigate("/list");
      } else {
        setError(false);
      }
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
        <Grid container rowGap={2} columnSpacing={0} padding={3} mt={0}>
          <Grid
            container
            columnSpacing={{ xs: 3, md: 2, lg: 2 }}
            rowGap={{ xs: 2, md: 2, lg: 2 }}
          >
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="space-between">
                <Select
                  label="LCA CLASIFICATION"
                  IconTitle="Note this is LCA Information"
                  options={clasification}
                  onChange={(e, val) => ComOnchangeVal(e, val, "clasfition")}
                  value={formValue?.clasfition}
                  isError={error?.clasfition ? false : true}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="space-between">
                <Select
                  label=" ROLE"
                  IconTitle="Note this is ROLE Information"
                  options={jobRole}
                  onChange={(e, val) => ComOnchangeVal(e, val, "jobRole")}
                  value={formValue?.jobRole}
                  isError={error?.jobRole ? false : true}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="space-between">
                <Select
                  label=" NUMBER OF WORK LOCATION"
                  IconTitle="Note this is WORK LOCATION Information"
                  options={workLocation}
                  onChange={(e, val) => ComOnchangeVal(e, val, "workLocation")}
                  value={formValue?.workLocation}
                  isError={error?.workLocation ? false : true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            p={1}
            sx={{ borderBottom: "1px solid lightGray", sm: 12, sx: 12 }}
          >
            <HeadingInfo lable=" EMPOYEE PORSONAL INFORMATION" />
          </Grid>

          <Grid
            container
            columnSpacing={{ xs: 3, md: 2, lg: 2 }}
            rowGap={{ xs: 2, md: 2, lg: 2 }}
          >
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <InputLable
                  lable="EMPLOYEE NUMBER"
                  value={formValue?.ENumber}
                  placeholder="Enter Emploee Number"
                  isError={error?.ENumber ? false : true}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "ENumber")
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <InputLable
                  lable="  EMPLOYEE NAME"
                  value={formValue?.EName}
                  placeholder="Enter Emploee Name"
                  isError={error?.EName ? false : true}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "EName")
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <InputLable
                  lable="  EMPLOYEE CODE"
                  value={formValue?.ECode}
                  placeholder="Enter Emploee Code"
                  isError={error?.ECode ? false : true}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "ECode")
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              {" "}
              <Grid container justifyContent="flex-start">
                <InputLable
                  lable="OFFICIAL EMAIL ID"
                  value={formValue?.Email}
                  placeholder="Enter the Email"
                  isError={error?.Email ? false : true}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "Email")
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            p={1}
            sx={{ borderBottom: "1px solid lightGray", sm: 12, sx: 12 }}
            mt={0}
          >
            <HeadingInfo lable="ASSIGNMENT INFORMATION" />
          </Grid>
          <Grid
            container
            columnSpacing={{ xs: 3, md: 2, lg: 2 }}
            rowGap={{ xs: 2, md: 2, lg: 2 }}
          >
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Select
                  label="  DESTINATION COUNTRY"
                  options={destnation}
                  onChange={(e, val) => ComOnchangeVal(e, val, "destnation")}
                  value={formValue?.destnation}
                  isError={error?.destnation ? false : true}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <Select
                  label=" VISA TYPE"
                  options={visaType}
                  value={formValue?.visaType}
                  onChange={(e, val) => ComOnchangeVal(e, val, "visaType")}
                  isError={error?.visaType ? false : true}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <InputLable
                  lable=" ASSIGNMENT REQUEST NO"
                  value={formValue?.AsstReqNo}
                  placeholder="Enter Assignment Request No"
                  isError={error?.AsstReqNo ? false : true}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "AsstReqNo")
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Grid container justifyContent="flex-start">
                <InputLable
                  lable="WORK PERMIT REQUEST NO"
                  value={formValue?.workPerNo}
                  placeholder="Enter Work Permit Request No"
                  isError={error?.workPerNo ? false : true}
                  onChange={(e, val) =>
                    ComOnchangeVal(e, e.target.value, "workPerNo")
                  }
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
              <DateCalendar
                lable=" WORK PERMIT START DATE"
                value={formValue?.StartDate}
                onChange={(newValue) => {
                  let dateStart = newValue.$d;
                  let disableDate = moment(dateStart).add(1, "days");
                  setFormValue({
                    ...formValue,
                    StartDate: newValue,
                    minend: moment(disableDate),
                    EndDate: null,
                  });
                  setError({
                    ...formValue,
                    StartDate: newValue,
                    minend: moment(disableDate),
                    EndDate: null,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ mt: 1 }}
                    {...params}
                    size="small"
                    fullWidth
                    error={error?.StartDate ? false : true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DateCalendar
                lable=" WORK PERMIT END DATE"
                value={formValue?.EndDate}
                minDate={new Date(formValue?.minend)}
                onChange={(newValue) => {
                  setFormValue({ ...formValue, EndDate: newValue });
                  setError({ ...formValue, EndDate: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ mt: 1 }}
                    {...params}
                    size="small"
                    fullWidth
                    error={error?.EndDate ? false : true}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="row" justifyContent="flex-start">
                <Select
                  label=" VISA REQUEST NUMBER"
                  IconTitle="Note this is VISA REQUEST Information"
                  options={visaReq}
                  onChange={(e, val) => ComOnchangeVal(e, val, "visaReq")}
                  value={formValue?.visaReq}
                  isError={error?.visaReq ? false : true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormControl>
      <ButnGrid
        container
        sx={12}
        p={2}
        direction="row"
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
        <Grid item sx={2}>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            {" "}
            Submit
          </Button>
        </Grid>
      </ButnGrid>
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
