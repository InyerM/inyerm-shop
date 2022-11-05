import Link from 'next/link'
import { Typography, Grid, Chip } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ShopLayout } from "../../components/layout"

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full name', width: 700 },
  { 
    field: 'paid', 
    headerName: 'Paid', 
    description: 'It shows info if its paid', 
    width: 200, 
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid 
          ? <Chip color='success' label='Paid' variant='outlined'/>
          : <Chip color='error' label='Not paid' variant='outlined'/>
      )
    }   
  },
  {
    field: 'order',
    headerName: 'Check order',
    sortable: false,
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link href={`/orders/${ params.row.id }`} style={{ textDecoration: 'none' }}>
          Check order
        </Link>
      )
    }
  }
]

const rows = [
  { id: 1, paid: true, fullname: 'Inyer Marin' },
  { id: 2, paid: false, fullname: 'Juan' },
  { id: 3, paid: true, fullname: 'Inyer Marin' },
  { id: 4, paid: true, fullname: 'Inyer Marin' },
  { id: 5, paid: false, fullname: 'Inyer Marin' },
  { id: 6, paid: false, fullname: 'Inyer Marin' },
  { id: 7, paid: true, fullname: 'Inyer Marin' },
  { id: 8, paid: true, fullname: 'Inyer Marin' },
  { id: 9, paid: true, fullname: 'Inyer Marin' },
  { id: 10, paid: true, fullname: 'Inyer Marin' },
  { id: 11, paid: true, fullname: 'Inyer Marin' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Order History' description='Client order history'>
      <Typography variant='h1' component='h1'>Order history</Typography>

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={ 12 } sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={[ 10 ]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage