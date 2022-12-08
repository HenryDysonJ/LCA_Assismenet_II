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
import PropTypes from "prop-types";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
const headLabe = [
  {
    id: "AsstReqNo",
    label: "LCA NUMBER",
  },
  {
    id: "EName",
    label: "ETA NAME",
  },
  {
    id: "ECode",
    label: "JOB ROLE",
  },
  {
    id: "workPerNo",
    label: "CITY",
  },
  {
    id: "ENumber",
    label: "COUNTRY",
  },
  {
    id: "id",
    label: "VISATYPE",
  },
  {
    id: "Email",
    label: "Email ID",
  },
  {
    id: "EDIT",
    label: "EDIT",
  },
  {
    id: "DELETE",
    label: "DELETE",
  },
];
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
const getComparator = (order, orderBy) => {
  return order === "asc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
const stableSort = (array, comparator) => {
  const removeFormValuesKey = array.map((it) => it.formValue);
  const stabilizedThis = removeFormValuesKey.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headLabe?.map((headCell) => (
          <TableCell sortDirection={orderBy === headCell?.id ? order : false}  align="center">
            <TableSortLabel
              active={orderBy === headCell?.id}
              direction={orderBy === headCell?.id ? order : "desc"}
              onClick={createSortHandler(headCell?.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" mt={1}>
                  {order === "asc" ? "." : "."}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const LcaList = () => {
  let navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [myPage, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Email");

  const handleRequestSort = (event, property) => {
    console.log(event, property,"reqestClick");
    const isAsc = orderBy === property && order === "desc";
    setOrder(isAsc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
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
    siblingCount: 10,
    boundaryCount: 0,
  });
  const handleMove = () => {
    navigate("/info");
  };
  const handleDelete = (id) => {
    console.log(id);
    let del = JSON.parse(localStorage.getItem("showList"));
    let deleteds = del.filter((items) => items?.formValue?.id != id);
    localStorage.setItem("showList", JSON.stringify(deleteds));
    setDatas(deleteds);
  };
  const handleEdit = (item, indexVal) => {
    navigate("/info", {
      state: { item: { formValue: item }, index: indexVal },
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
  useEffect(() => {
    let listData = localStorage.getItem("showList");
    let mapData = JSON.parse(listData);
    setDatas(mapData);
  }, []);
  console.log(datas,"datas");
  const TableBodyData = ({ item, index }) => {
    return (
      <>
        <StyledTableRow>
          <StyledTableCell align="center">
            {item?.clasfition?.label}
          </StyledTableCell>
          <StyledTableCell align="center">{item?.EName}</StyledTableCell>
          <StyledTableCell align="center">
            {item?.jobRole?.label}
          </StyledTableCell>
          <StyledTableCell align="center">
            {item?.workLocation?.label}
          </StyledTableCell>
          <StyledTableCell align="center">
            {item?.destnation?.label}
          </StyledTableCell>
          <StyledTableCell align="center">
            {item?.visaType?.label}
          </StyledTableCell>
          <StyledTableCell align="center">
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
            {item?.Email}
          </StyledTableCell>
          <StyledTableCell align="center">
            <IconButton
              aria-label="delete"
              color="primary"
              variant="outlined"
              onClick={() => handleEdit(item, index)}
            >
              <ModeRoundedIcon />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align="center">
            <IconButton
              color="primary"
              variant="outlined"
              onClick={() => handleDelete(item?.id)}
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
            sx={{ height: "70vh", overflow: "auto" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />

              <TableBody sx={{ display: {} }}>
                {datas?.length > 0
                  ? stableSort(datas, getComparator(order, orderBy))
                      .slice(
                        myPage * rowsPerPage,
                        myPage * rowsPerPage + rowsPerPage
                      )

                      .map((item, index) => (
                        <TableBodyData item={item} index={index} />
                      ))
                  : ""}
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
                            myPage == page - 1 ? "contained" : "outlined"
                          }
                          type="button"
                          onClick={() => {
                            setPage(page - 1);
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
