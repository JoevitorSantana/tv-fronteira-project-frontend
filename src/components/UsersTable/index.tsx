import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import api from '../../service/api';

const columns: GridColDef[] = [  
  { field: 'name', headerName: 'Nome', width: 150 },
  { field: 'email', headerName: 'Email', width: 300},    
  { field: 'role', headerName: 'Categoria', width: 100 },  
];


export default function UsersTable() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/users')
        .then(response => {
            setUsers(response.data);
        })
    }, []);

    return (
        <div style={{ height: 400, width: '100%', color: '#fff' }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={row => row._id}
                style={{color: '#fff', font: 'Poppins, sans-serif', marginTop: '10px'}}
                disableSelectionOnClick={true}
                checkboxSelection={false}
            />
        </div>
    );
}
