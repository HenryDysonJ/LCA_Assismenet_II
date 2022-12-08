import React, { useState } from "react";
import { Grid, Paper, Link, Button, Typography } from "@mui/material";
import { InputBox } from "../../components/inputBox";
import InputAdornment from "@mui/material/InputAdornment";
import DraftsIcon from "@mui/icons-material/Drafts";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });
  let navigate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };
  const paperStyles = {
    padding: 50,
    height: "40vh",
    width: 470,
    margin: "100px auto",
  };

  const handleClick = () => {
    console.log(email, "jhj");
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.email && regexEmail.test(email.email) === true) {
      console.log("Your Email id was correct");
      setOpen(true);
      setError(false);
    } else {
      console.log("Pleace be fill abc@gmail.com format");
      setError(true);
      setOpen(true);
      navigate("/");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper elevation={3} style={paperStyles}>
      <Grid
        container
        spacing={1}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
      >
        <Typography
          align="center"
          variant=""
          component={"h2"}
          color="secondary.light"
        >
          RESET YOUR PASSWORD ?
        </Typography>

        <Grid
          item
          container
          spacing={0}
          direction={"column"}
          rowSpacing={2}
          mt={0.5}
        >
          <Grid item sx={10}>
            <Typography
              variant="p"
              component={"h5"}
              color="secondary.contrastText"
            >
              Please provid the email eddress that you used when you signed up
              for your Immidart account.
            </Typography>
          </Grid>
          <Grid item sx={10}>
            <Typography
              variant="p"
              component={"h5"}
              color="secondary.contrastText"
            >
              We will send you an Email that will allow you to reset your
              password.
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <InputBox
              error={error}
              type="text"
              placeholder="Enter Email Id"
              name="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ backgroundColor: " #D3DADD", padding: "22px 18px" }}
                  >
                    <DraftsIcon />
                  </InputAdornment>
                ),
              }}
              onChangeFun={(e) => onChangeEmail(e)}
            />
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            rowGap={2}
          >
            <Grid item xs={3} ml={2}>
              <Link href="/">&#60; Back to Sign In</Link>
            </Grid>
            <Grid item xs={3} align="right" mr={5}>
              <Button variant="contained" onClick={handleClick}>
                SEND CODE
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="info"
          sx={{ width: "100%" }}
        >
          Successfuly send to code in your Email
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ResetPassword;
