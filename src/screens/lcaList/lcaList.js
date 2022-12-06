import React, { useEffect, useState } from "react";
import { Grid, Button, Select, MenuItem, Box } from "@mui/material";
import { AppBar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import usePagination from "@mui/material/usePagination";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Icon = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    left: "12%",
  },
  [theme.breakpoints.up('md')]: {
    left: "37%",
  }
}));
const LcaList = () => {
  let navigate = useNavigate();
  const [datas, setDatas] = useState("");
  const [myPage, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    console.log(newPage, "new");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(+event.target.value, "auto");
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    count: Math.ceil(datas?.length / rowsPerPage),
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
    console.log(mapData);
  }, []);
  const handleDelete = (id) => {
    let del = JSON.parse(localStorage.getItem("showList"));
    let deleteds = del.filter((items) => items.formValue.id != id);
    localStorage.setItem("showList", JSON.stringify(deleteds));
    setDatas(deleteds);
  };
  const handleEdit = (item, indexVal) => {
    navigate("/info", {
      state: { item: item, index: indexVal },
    });
  };
  const nextBtn = () => {
    if (myPage * rowsPerPage + rowsPerPage < datas.length) {
      setPage((pre) => pre + 1);
    }
  };

  const preBtn = () => {
    if (myPage * rowsPerPage > 0) {
      setPage((pre) => pre - 1);
    }
  };
  const TableBodyData = ({ item, index }) => {
    return (
      <>
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
            <IconButton
              aria-label="delete"
              color="primary"
              variant="outlined"
              onClick={() => handleEdit(item, index)}
            >
              <ModeRoundedIcon />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align="right">
            <IconButton
              color="primary"
              variant="outlined"
              onClick={() => handleDelete(item?.formValue?.id)}
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      </>
    );
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
          <Typography variant="p" color="primary" component="h5" mt={1} ml={1}>
            LCA REQUESTS
          </Typography>
          <Button variant="outlined" onClick={handleMove} sx={{ mr: 1 }}>
            NEW LcaList
          </Button>
        </Grid>
      </AppBar>
      <Grid item container p={3}>
        <Grid item container mt={0}>
          <TableContainer
            component={Paper}
            sx={{ height: 422, overflow: "auto" }}
          >
            <Table stickyHeader aria-label="sticky table">
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
              <TableBody sx={{ display: {} }}>
               { console.log(datas?.length,"ddddddd")}
                {datas?.length > 0 ? (
                  datas
                    .slice(
                      myPage * rowsPerPage,
                      myPage * rowsPerPage + rowsPerPage
                    )
                    .map((item, index) => (
                      <TableBodyData item={item} index={index} />
                    ))
                ) :""
                //  (
                //   <Icon sx={{ position: "absolute", top: "45%", left: "37%" }}>
                //     <Typography
                //       variant="subtitle-1"
                //       component="h1"
                //       color="secondary.contrastText"
                //       justifyItems={"center"}
                //       ml={8}
                //       align="center"
                //     >
                //       <WarningAmberIcon sx={{ fontSize: "6rem" }} />
                //     </Typography>
                //     <Typography
                //       align="center"
                //       sx={{ fontSize: 16, xs: 12 }}
                //       variant="subtitle-1"
                //       component={"h6"}
                //       color="secondary.contrastText"
                //       justifyContent={"center"}
                //       ml={8}
                //     >
                //       {" "}
                //       DATA NOT FOUND{" "}
                //     </Typography>
                //   </Icon>
                // )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          mt={3}
          rowGap={{ xs: 2, md: 2, lg: 2 }}
        >
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={3}>
                <Select
                  value={rowsPerPage}
                  sx={{ width: 65 }}
                  size="small"
                  onChange={handleChangeRowsPerPage}
                >
                  {count.map((c) => (
                    <MenuItem value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="p" component={"h5"} mt={2}>
                  Showing {myPage * rowsPerPage} to{" "}
                  {myPage * rowsPerPage + rowsPerPage} of {datas?.length}{" "}
                  Requests
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Grid container direction="row" justifyContent={"flex-end"}>
              <Grid item xs={12} sm={"auto"}>
                <List>
                  {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === "start-ellipsis" || type === "end-ellipsis") {
                      children = ".....";
                    } else if (type === "page") {
                      children = (
                        <Button
                          size="small"
                          variant={
                            myPage == index - 1 ? "contained" : "outlined"
                          }
                          type="button"
                          onClick={() => {
                            setPage(index + 1);
                          }}
                          style={{
                            fontWeight: selected ? "bold" : undefined,
                          }}
                        >
                          {page}
                        </Button>
                      );
                    } else {
                      children = (
                        <Button
                          variant="outlined"
                          type="button"
                          size="small"
                          onClick={() => {
                            type == "next" ? nextBtn() : preBtn();
                          }}
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
      </Grid>
    </>
  );
};

export default LcaList;
const count = [5, 10, 15, 20, 25, 30];