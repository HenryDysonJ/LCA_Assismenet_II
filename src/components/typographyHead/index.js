import { Typography } from "@mui/material";

export const HeadingInfo = ({ lable = "" }) => {
  return (
    <Typography variant="subtitle-1" component="h6" sx={{ fontSize: 14 }}>
      {lable}
    </Typography>
  );
};
