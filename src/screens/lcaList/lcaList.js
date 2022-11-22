import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { AppBar, Typography, Toolbar } from "@mui/material";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import usePagination from "@mui/material/usePagination";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

const LcaList = () => {
  let navigate = useNavigate();
  const [datas, setDatas] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.black,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    size: "small",
  });
  const { items } = usePagination({
    count: 20,
    siblingCount: 0,
    boundaryCount: 0,
  });
  const handleMove = () => {
    navigate("/info");
  };

  useEffect(() => {
    let listData = localStorage.getItem("showList");
    let mapData = JSON.parse(listData);
    setDatas(mapData);
    console.log(mapData, "u");
  }, []);
  const handleDelete = (id) => {
    let del = JSON.parse(localStorage.getItem("showList"));
    const deleteds = del.filter((item) => item.id != id);
    localStorage.setItem("showList", JSON.stringify(deleteds));
    setDatas(deleteds);
  };
  const handleEdit = (item, indexVal) => {
    console.log(indexVal);
    navigate("/info", {
      state: { item: item, index: indexVal },
    });
  };
  return (
    <>
      <AppBar position="static" color="secondary">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          padding={2}
        >
          <Typography variant="p" color="primary" component="h5">
            LCA REQUESTS
          </Typography>
          <Button variant="outlined" onClick={handleMove}>
            NEW LcaList
          </Button>
        </Grid>
      </AppBar>
      <Grid item container p={3}>
        <Grid item container mt={0}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">
                      LCA NUMBER&uarr;&darr;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      ETA NAME&uarr;&darr;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      JOB ROLE&uarr;&darr;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      CITY&uarr;&darr;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      COUNTRY&uarr;&darr;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      VISATYPE&uarr;&darr;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Email&uarr;&darr;
                    </StyledTableCell>

                    <StyledTableCell align="right">Edit</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas &&
                    datas.map((item, index) => (
                      <StyledTableRow key={item.name}>
                        <StyledTableCell align="right">
                          {item?.formValue?.clasfition?.label}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item?.formValue?.EName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item?.formValue?.jobRole?.label}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item?.formValue?.workLocation?.label}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item?.formValue?.destnation?.label}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item?.formValue?.visaType?.label}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Badge
                            badgeContent={2}
                            color="primary"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <MailIcon color="action" />
                          </Badge>
                          {item?.formValue?.Email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button
                            variant="outlined"
                            onClick={() => handleEdit(item, index)}
                          >
                            <ModeRoundedIcon />
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button
                            variant="outlined"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteForeverRoundedIcon />
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          mt={3}
          rowGap={{ xs: 2, md: 2, lg: 2 }}
        >
          <Grid container spacing={6} xs={12} md={5} lg={3}>
            <Grid item xs={3}>
              <Autocomplete
                id="disable-clearable"
                disableClearable
                options={count}
                sx={{ width: 50 }}
                size="small"
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="p" component={"h5"} mt={2}>
                Showing 1 to 10 of 23 Requests
              </Typography>
            </Grid>
          </Grid>
          <Grid spacing={3} xs={12} md={6} lg={3}>
            <Grid container direction="row" justifyContent="flex-end">
              <List>
                {items.map(({ page, type, selected, ...item }, index) => {
                  let children = null;

                  if (type === "start-ellipsis" || type === "end-ellipsis") {
                    children = ".....";
                  } else if (type === "page") {
                    children = (
                      <Button
                        size="small"
                        variant={selected ? "contained" : "outlined"}
                        type="button"
                        style={{
                          fontWeight: selected ? "bold" : undefined,
                        }}
                        {...item}
                      >
                        {page}
                      </Button>
                    );
                  } else {
                    children = (
                      <Button
                        variant="outlined"
                        type="button"
                        {...item}
                        size="small"
                      >
                        {type}
                      </Button>
                    );
                  }

                  return (
                    <Typography variant="subtitle1" key={index}>
                      {" "}
                      {children}
                    </Typography>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LcaList;
const count = [1, 2, 3, 4, 5, 6];
