import { useEffect, useState } from "react"
import useSWR from "swr"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Grid, Select, MenuItem } from "@mui/material"
import PeopleOutline from "@mui/icons-material/PeopleOutline"

import { AdminLayout } from "../../components/layout"
import { IUser } from "../../interfaces"
import { shopApi } from "../../api"
import { useSnackbar } from "notistack"
import { snackbarConfig } from "../../config"

const UsersPage = () => {
  const { data, error, mutate } = useSWR<IUser[]>("/api/admin/users")
  const { enqueueSnackbar } = useSnackbar()
  const [users, setUsers] = useState<IUser[]>([])

  if (!data && !error) return <></>

  useEffect(() => {
    if (data) setUsers(data)
  }, [data])

  const onRoleUpdate = async (userId: string, newRole: string) => {
    const prevUsers = [...users]
    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? newRole : user.role,
    }))
    setUsers(updatedUsers)
    try {
      await shopApi.put("admin/users", { userId, role: newRole })
      enqueueSnackbar("User role updated", { variant: "success", ...snackbarConfig })
    } catch (error) {
      setUsers(prevUsers)
      enqueueSnackbar("Error updating user role", { variant: "error", ...snackbarConfig })
    }
  }

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Full name", width: 300 },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Role"
            sx={{ width: "300px" }}
            onChange={({ target }) => onRoleUpdate(row.id, target.value)}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super-user">Superuser</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        )
      },
    },
  ]

  const rows = users.map(({ _id, email, role, name }) => ({
    id: _id,
    email,
    name,
    role,
  }))

  return (
    <AdminLayout title="Users" subtitle="User maintenance" icon={<PeopleOutline />}>
      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default UsersPage
