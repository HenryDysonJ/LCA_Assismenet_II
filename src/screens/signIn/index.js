import { Grid, Paper, Link, Button, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { InputBox } from "../../components/inputBox";
import InputAdornment from "@mui/material/InputAdornment";
import DraftsIcon from "@mui/icons-material/Drafts";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const PaperStyles = styled(Paper)({
  padding: "25px 1px",
  width: 460,
  color: "#004d40",
  minHeight: "32vh",
  marginTop: "20vh",
  elevation: "4",
});

const Body = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  margin: 21,
});
const ButnStyle = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm", "md")]: {
    padding: "0px 28px 5px 24px",
  },
}));

const SignIn = (props) => {
  const [signData, setSignData] = useState({
    email: "",
    password: "",
    error: {
      email: "",
      password: "",
    },
  });
  let navigate = useNavigate();
  const [state, setState] = useState({
    error: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, error } = state;
  const handleClose = () => {
    setState({ ...state, error: false });
  };
  const handleClick = (newState) => () => {
    if (signData.email === "" && signData.password === "") {
      setState({ error: true, ...newState });
    }
  };
  const onChange = (key, val) => {
    const error = signData?.error;
    error[key] = "";
    setSignData({ ...signData, [key]: val, error });
  };
  const validation = () => {
    console.log("validation");
    let isError = true;
    let error = signData?.error;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (signData?.email.length === 0) {
      isError = false;
      error.email = "Invalid email";
    }
    if (signData?.password.length === 0) {
      isError = false;
      error.password = "Invalid password";
    }
    if (
      signData?.email &&
      regexEmail.test(signData?.email) === false &&
      signData?.password
    ) {
      isError = false;
      error.email = "Invalid email";
    }
    if (
      signData?.email &&
      regexEmail.test(signData?.email) === true &&
      signData?.password
    ) {
      navigate("/list");
    }
    setSignData({ ...signData, error });
    return isError;
  };
  const handleSubmit = () => {
    if (validation()) {
    }
  };
  return (
    <Body>
      <PaperStyles>
        <Grid container spacing={1} direction={"column"}>
          <Typography align="center" component={"h2"} color="secondary.light">
            Sign In
          </Typography>
          <Grid item container direction={"column"} rowSpacing={2} ml={1.3}>
            <Grid item xs={8} md={12} lg={10}>
              <Grid item p={1}>
                <InputBox
                  error={signData?.error?.email ? true : false}
                  type="text"
                  placeholder="Enter Email Id"
                  onChange={(e) => onChange("email", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          backgroundColor: " #D3DADD",
                          padding: "22px 18px",
                        }}
                      >
                        <DraftsIcon sx={{ fontSize: "1rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={8} md={12} lg={10}>
              <Grid item p={1}>
                <InputBox
                  error={signData?.error?.password ? true : false}
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => onChange("password", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          backgroundColor: " #D3DADD",
                          padding: "22px 18px",
                        }}
                      >
                        <LockIcon sx={{ fontSize: "1rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <ButnStyle
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: "0 45px 5px 25px" }}
            >
              <Grid
                container
                display="flex"
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Grid item xs={12} sm={12} md={7} lg={7}>
                  <Link href="/reset">Forgot Password?</Link>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  onClick={handleClick({
                    vertical: "top",
                    horizontal: "center",
                  })}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    sx={{ fontSize: "12px" }}
                  >
                    SIGN IN
                  </Button>
                </Grid>
              </Grid>
            </ButnStyle>
          </Grid>
        </Grid>
      </PaperStyles>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Pleace Fill Your Email..!! and Password..!!
        </Alert>
      </Snackbar>
    </Body>
  );
};

export default SignIn;
