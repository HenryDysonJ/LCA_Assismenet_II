// import * as React from "react";
// import dayjs from "dayjs";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// import DateRangePicker from "@mui/x-date-pickers-pro/DateRangePicker";
// import { DatePicker } from "@mui/x-date-pickers";

// export default function Test() {
//   //   const [sdate, setSdate] = React.useState(dayjs("2022-11-23"));
//   const [date, setDate] = React.useState({
//     Sdate: "",
//     Edate: "",
//   });
// //   const disabledDays = (date) => {
// //     return !myDates.map((myDate) => new Date(myDate).getTime()).includes(date.getTime());
// //   };
//   const handleStatrDate = (val) => {
//     let StartDate = val.$d;
//     setDate((start) => (start.Sdate = StartDate));
//   };
//   const handleEndDate = (val) => {
//     let Date = val.$d;
//     setDate((par) => (par.Edate = Date));
//   };
//   console.log(date, "poda");
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Stack spacing={5}>
//         <DateRangePicker
//           inputFormat="DD/MM/YYYY"
//           value={date.Sdate}
//           minDate={dayjs("2022-11-01")}
//           onChange={(val) => handleStatrDate(val)}
//           renderInput={(params) => (
//             <TextField {...params} size="small" name="Sdate" />
//           )}
//         />
//         <DateRangePicker
//           inputFormat="DD/MM/YYYY"
//           value={date.Edate}
//           maxDate={dayjs("2022-12-10")}
//           onChange={(val) => handleEndDate(val)}
//           renderInput={(params) => (
//             <TextField {...params} size="small" name="Edate" />
//           )}
//         />

//         <DatePicker
//           shouldDisableDate={(date) =>
//             date.getTime() === new Date("2021-05-03T00:00").getTime() ||
//             new Date("2021-05-04T00:00").getTime() ||
//             new Date("2021-05-05T00:00").getTime()
//           }
//         />
//       </Stack>
//     </LocalizationProvider>
//   );
// }
