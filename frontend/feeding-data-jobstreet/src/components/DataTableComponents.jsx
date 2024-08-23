import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DataTableComponents = ({ data, columns, onPageChange, onRowsPerPageChange, page, rowsPerPage, count, handleOpenDetail,handleOpenUpdate,handleDeleteById }) => {

  const handleEdit = (id) => {
    handleOpenUpdate(id);
  }

  const handleDelete = (id) => {
    handleDeleteById(id);
  }

  const handleShowDetail = (id) => {
    handleOpenDetail(id);
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden',boxShadow:3 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'no' ? (
                          index + 1 + page * rowsPerPage 
                        ) : column.id === 'action' ? (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            color="info"
                            size="small"
                            onClick={() => handleShowDetail(row.id)}
                            sx={{ minWidth: '30px', padding: '4px 8px', fontSize: '12px' }} // Gaya khusus
                          >
                            <VisibilityIcon sx={{ fontSize: '25px' }} /> {/* Ubah ukuran ikon */}
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleEdit(row.id)}
                            sx={{ minWidth: '30px', padding: '4px 8px', fontSize: '12px' }}
                          >
                            <EditIcon sx={{ fontSize: '25px' }} />
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(row.id)}
                            sx={{ minWidth: '30px', padding: '4px 8px', fontSize: '12px' }}
                          >
                            <DeleteForeverIcon sx={{ fontSize: '25px' }} />
                          </Button>
                        </Box>
                        
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default DataTableComponents;
