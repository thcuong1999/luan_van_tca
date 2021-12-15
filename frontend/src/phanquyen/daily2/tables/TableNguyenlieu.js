import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import img_placeholder from "../../../assets/images/img_placeholder.png";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { getComparator } from "../../../utils";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsNguyenlieu, headCellsNguyenlieuHuloi } from "./headCells";
import TableButton from "../../../components/TableButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { InputSoluong } from "../styledComponents";
import { Link } from "react-router-dom";

const EnhancedTableToolbar = ({ numSelected, rowsSelected, onClickBaoloi }) => {
  return numSelected > 0 ? (
    <>
      <Toolbar
        sx={{
          pl: { sm: 7 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            <div className="d-flex align-items-center">
              {rowsSelected.length && (
                <TableButton onClick={onClickBaoloi}>Báo lỗi</TableButton>
              )}
            </div>
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
      </Toolbar>
    </>
  ) : null;
};

const TableCongcu = ({
  dsNguyenlieu = [],
  readOnly,
  setOpen,
  setDsNguyenlieuHuloi,
  nguyenlieuhuloithem,
  dsnguyenlieuhuloi,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangeKLHuloi = (e, id) => {
    setDsNguyenlieuHuloi((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              khoiluongloi: e.target.value,
            }
          : item
      )
    );
  };

  const getObjectsNGL = () => {
    return dsNguyenlieu
      .filter((ngl) => selected.includes(ngl._id))
      .map((ngl) => ({ ...ngl, khoiluongloi: 1 }));
  };

  const onClickBaoloi = () => {
    setDsNguyenlieuHuloi(getObjectsNGL);
    setOpen(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsNguyenlieu?.map((item) => item._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id, row) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsNguyenlieu?.length) : 0;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {dsnguyenlieuhuloi || nguyenlieuhuloithem || readOnly ? null : (
            <EnhancedTableToolbar
              numSelected={selected.length}
              rowsSelected={selected}
              onClickBaoloi={onClickBaoloi}
            />
          )}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
              id="tableMaterial"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={dsNguyenlieu?.length}
                headCells={
                  nguyenlieuhuloithem || dsnguyenlieuhuloi
                    ? headCellsNguyenlieuHuloi
                    : headCellsNguyenlieu
                }
              />
              <TableBody>
                {dsNguyenlieu
                  ?.slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {readOnly ? (
                            row?.donhang.ma
                          ) : (
                            <Link
                              to={`/daily2/donhang/chitiet/${row?.donhang._id}`}
                            >
                              {row?.donhang.ma}
                            </Link>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {readOnly ? (
                            row?.ten
                          ) : (
                            <Link
                              to={`/daily2/nguyenlieu/chitiet/${row?.nguyenlieu._id}`}
                            >
                              {row?.ten}
                            </Link>
                          )}
                        </TableCell>
                        <TableCell>
                          <img
                            src={
                              row?.hinhanh
                                ? `/uploads/${row?.hinhanh}`
                                : img_placeholder
                            }
                            alt="anhcongcu"
                            style={{ width: "30px" }}
                            className={!row?.hinhanh && "noImage"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {nguyenlieuhuloithem ? (
                            <InputSoluong
                              type="number"
                              value={row?.khoiluongloi}
                              onChange={(e) => handleChangeKLHuloi(e, row?._id)}
                            />
                          ) : dsnguyenlieuhuloi ? (
                            `${row?.loi.khoiluongloi} kg`
                          ) : (
                            `${row?.khoiluong} kg`
                          )}
                        </TableCell>
                        <TableCell align="right">{row?.congdung}</TableCell>
                        <TableCell align="right">
                          {dsnguyenlieuhuloi
                            ? row?.loi.ngaybaoloi
                            : row?.ngaytao}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={dsNguyenlieu?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "số dòng trên trang",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            component="div"
          />
        </Paper>
      </Box>
    </>
  );
};

export default TableCongcu;
