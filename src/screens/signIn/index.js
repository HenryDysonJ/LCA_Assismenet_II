import {
  Grid,
  Paper,
  Link,
  Button,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { InputBox } from "../../components/inputBox";
import { useTheme } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DraftsIcon from "@mui/icons-material/Drafts";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const PaperStyles = styled(Paper)({
  padding: "26px 5px",
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
  [theme.breakpoints.down('sm','md')]: {
    padding: "0px 28px 5px 24px",
  }
}));

const SignIn = (props) => {
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [signData, setSignData] = useState({
    email: "",
    password: "",
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
  const onChange = (e) => {
    setSignData({ ...signData, [e.target.name]: e.target.value });
    console.log({ ...signData, [e.target.name]: e.target.value });
  };
  const handleClick = (newState) => () => {
    if (signData.email === "" && signData.password === "") {
      setState({ error: true, ...newState });
    }
  };
  console.log(signData);

  const handleSubmit = () => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let regexPsw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,14}$/;

    if (signData.email === "" && signData.password === "") {
      console.log("Pleace Enter Email id and password");
      setError1(true);
      setError2(true);
    } else if (signData.email && signData.password === "") {
      if (signData.email && regexEmail.test(signData.email) === true) {
        alert("Pleace be Uper, Lower, symbls,numbers set your password");
        setError1(false);
        setError2(true);
      } else {
        alert("Pleace be fill abc@gmail.com format");
        setError1(true);
      }
    } else if (signData.email === "" && signData.password) {
      if (signData.password && regexPsw.test(signData.password) === false) {
        alert("Enter Email id");
        setError1(false);
        setError2(false);
      } else {
        alert("Pleace be Uper, Lower, symbls,numbers set your password");
        setError1(true);
      }
    } else if (
      regexEmail.test(signData.email) === false &&
      regexPsw.test(signData.password) === false
    ) {
      alert("Your Email Id and Password Incorrectly");
      setError1(true);
      setError2(true);
    } else if (
      regexEmail.test(signData.email) === true &&
      regexPsw.test(signData.password) === false
    ) {
      console.log("success your efort dyson");
      setError1(false);
      setError2(false);
      navigate("/list");
    }
  };

  const theme = useTheme(props);

  return (
    <Body>
      <PaperStyles>
        <Grid container spacing={1} direction={"column"} ml={1}>
          <Typography align="center" component={"h2"} color="secondary.light">
            Sign In
          </Typography>
          <Grid item container direction={"column"} rowSpacing={2}>
            <Grid item xs={8} md={12} lg={10}>
              <Grid item p={1}>
                <InputBox
                  error={error1}
                  type="text"
                  placeholder="Enter Email Id"
                  name="email"
                  helperText={error1 ? "Email should abc@gmail.com" : ""}
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
                  onChange={(e) => onChange(e)}
                />
              </Grid>
            </Grid>
            <Grid item xs={8} md={12} lg={10}>
              <Grid item p={1}>
                <InputBox
                  error={error2}
                  type="password"
                  placeholder="Enter password"
                  name="password"
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
                  onChange={(e) => onChange(e)}
                />
              </Grid>
            </Grid>
            <ButnStyle item xs={12} md={6} lg={6} sx={{ padding: "0 45px 5px 25px" }}>
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
      {/* Pleace Fill Your Pas sword... and Password..!!*/}
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
          Pleace Fill Your Password... and Password..!!
        </Alert>
      </Snackbar>
    </Body>
  );
};

export default SignIn;
