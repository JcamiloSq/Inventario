//import { CssBaseline, Box, Toolbar, Typography } from '@mui/material';
//import AppBar from '.pages/dashboard/NavNavigation';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import useApi from '../../../components/UseApi';


const valoresIniciales = {
    data: []
}

export default function StickyHeadTable() {

    const [page, setPage] = React.useState(0);
    const [state, setState] = React.useState(valoresIniciales);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { doGet } = useApi();

    React.useEffect(() => {
        const init = async () => {
            try {
                const respuestaRol = await doGet('controladorRol');
                setState({data:respuestaRol})

            } catch (error) {
                console.log(error);
            }
        }
        init();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const {data}=state;
    const rows = data;

    const columns = [
        { id: 'IdRol', label: 'Codigo del Rol', minWidth: 170 },
        { id: 'NombreRol', label: 'Nombre Rol', minWidth: 100 },
        { id: 'actions', label: 'Editar', minWidth: 10, align: 'right' },
     
    ];
    return (

        <Paper sx={{ width: '75%', overflow: 'hidden', margin: 'auto' }}>
       
            <br></br>   <br></br>   <br></br>   <br></br>   <br></br>

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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>


    );
}
