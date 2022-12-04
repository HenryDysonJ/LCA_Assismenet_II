// import { Grid, Paper, Link, Button, Typography } from "@mui/material";
// import React, { useState } from "react";
// import { InputBox } from "../../components/inputBox";
// import { useTheme } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import LockIcon from "@mui/icons-material/Lock";
// import { useNavigate } from "react-router-dom";
// import Snackbar from "@mui/material/Snackbar";
// import { Alert } from "@mui/material";

// const SignIn = (props) => {
//   const [error1, setError1] = useState(false);
//   const [error2, setError2] = useState(false);
//   const [signData, setSignData] = useState({
//     email: "",
//     password: "",
//   });
//   let navigate = useNavigate();

//   const [state, setState] = useState({
//     error: false,
//     vertical: "top",
//     horizontal: "center",
//   });
//   const handleClose = () => {
//     setState({ ...state, error: false });
//   };
//   const onChange = (e) => {
//     setSignData({ ...signData, [e.target.name]: e.target.value });
//   };
//   const { vertical, horizontal, error } = state;
//   const handleClick = (newState) => () => {
//     if (signData.email === "" && signData.password === "") {
//       setState({ error: true, ...newState });
//     }
//   };
//   const handleSubmit = () => {
//     let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     let regexPsw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,14}$/;

//     if (signData.email === "" && signData.password === "") {
//       console.log("Pleace Enter Email id and password");
//       setError1(true);
//       setError2(true);
//     } else if (signData.email && signData.password === "") {
//       if (signData.email && regexEmail.test(signData.email) === true) {
//         alert("Pleace be Uper, Lower, symbls,numbers set your password");
//         setError1(false);
//         setError2(true);
//       } else {
//         alert("Pleace be fill abc@gmail.com format");
//         setError1(true);
//       }
//     } else if (signData.email === "" && signData.password) {
//       if (signData.password && regexPsw.test(signData.password) === false) {
//         alert("Enter Email id");
//         setError1(false);
//         setError2(false);
//       } else {
//         alert("Pleace be Uper, Lower, symbls,numbers set your password");
//         setError1(true);
//       }
//     } else if (
//       regexEmail.test(signData.email) === false &&
//       regexPsw.test(signData.password) === false
//     ) {
//       alert("Your Email Id and Password Incorrectly");
//       setError1(true);
//       setError2(true);
//     } else if (
//       regexEmail.test(signData.email) === true &&
//       regexPsw.test(signData.password) === false
//     ) {
//       console.log("success your efort dyson");
//       setError1(false);
//       setError2(false);
//       navigate("/list");
//     }
//   };

//   const theme = useTheme(props);
//   const paperStyles = {
//     padding: 50,
//     height: "40vh",
//     width: 470,
//     margin: "100px auto",
//     color: "#004d40",
//   };
//   return (
//     <>
//       <Paper elevation={3} style={paperStyles}>
//         <Grid
//           container
//           spacing={1}
//           direction={"column"}
//           justify={"center"}
//           alignItems={"center"}
//           p={1}
//         >
//           <Typography
//             align="center"
//             variant=""
//             component={"h2"}
//             color="secondary.light"
//           >
//             Sign In
//           </Typography>
//           <Grid item container spacing={0} direction={"column"} rowSpacing={2}>
//             <Grid item xs={8} md={12} lg={10}>
//               <Grid item p={1}>
//                 <InputBox
//                   error={error1}
//                   type="text"
//                   placeholder="Enter Email Id"
//                   name="email"
//                   helperText={error1 ? "Email should abc@gmail.com" : ""}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment
//                         position="start"
//                         sx={{ backgroundColor: " #D3DADD", padding:"22px 18px" }}
//                       >
//                         <DraftsIcon sx={{fontSize:'1rem'}}/>
//                       </InputAdornment>
//                     ),
//                   }}
//                   onChange={onChange}
//                 />
//               </Grid>
//             </Grid>
//             <Grid item xs={8} md={12} lg={10}>
//               <Grid item p={1}>
//                 <InputBox
//                   error={error2}
//                   type="password"
//                   placeholder="Enter password"
//                   name="password"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment
//                       position="start"
//                         sx={{ backgroundColor: " #D3DADD", padding:"22px 18px", }}
                       
//                       >
//                         <LockIcon sx={{fontSize:"1rem"}}/>
//                       </InputAdornment>
//                     ),
//                   }}
//                   onChange={onChange}
//                 />
//               </Grid>
//             </Grid>

//             <Grid item container direction="row" justifyContent="space-between">
//               <Grid item xs={5} ml={3}>
//                 <Link href="/reset">Forgot Password?</Link>
//               </Grid>
//               <Grid
//                 item
//                 xs={3}
//                 mr={5}
//                 align="right"
//                 onClick={handleClick({
//                   vertical: "top",
//                   horizontal: "center",
//                 })}
//               >
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   onClick={handleSubmit}
//                   sx={{ fontSize: "12px" }}
//                 >
//                   SIGN IN
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Pleace Fill Your Password... and Password..!!*/}
//       <Snackbar
//         open={error}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical, horizontal }}
//       >
//         <Alert
//           onClose={handleClose}
//           severity="error"
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           Pleace Fill Your Password... and Password..!!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default SignIn;