import { Grid, Typography } from "@mui/material"
import GroupOutlined from "@mui/icons-material/GroupOutlined"
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined"
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined"
import DashboardOutlined from "@mui/icons-material/DashboardOutlined"
import CategoryOutlined from "@mui/icons-material/CategoryOutlined"
import CancelPresentationOutlined from "@mui/icons-material/CancelPresentationOutlined"
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined"
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined"
import useSWR from "swr"

import { SummaryTile } from "../../components/admin"
import { AdminLayout } from "../../components/layout"
import { DashboardSummaryResponse } from "../../interfaces"
import { useEffect, useState } from "react"

const options: { id?: keyof DashboardSummaryResponse; subtitle: string; icon: JSX.Element }[] = [
  {
    id: "numberOfOrders",
    subtitle: "Total orders",
    icon: <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />,
  },
  {
    id: "paidOrders",
    subtitle: "Paid orders",
    icon: <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />,
  },
  {
    id: "notPaidOrders",
    subtitle: "Pending orders",
    icon: <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />,
  },
  {
    id: "numberOfClients",
    subtitle: "Clients",
    icon: <GroupOutlined color="primary" sx={{ fontSize: 40 }} />,
  },
  {
    id: "numberOfProducts",
    subtitle: "Products",
    icon: <CategoryOutlined color="warning" sx={{ fontSize: 40 }} />,
  },
  {
    id: "productsWithNoStock",
    subtitle: "Out of stock",
    icon: <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />,
  },
  {
    id: "productsWithLowStock",
    subtitle: "Low inventory",
    icon: <ProductionQuantityLimitsOutlined color="error" sx={{ fontSize: 40 }} />,
  },
  {
    subtitle: "Update in: ",
    icon: <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />,
  },
]

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  })

  const [refreshIn, setRefreshIn] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((prev) => (prev > 0 ? prev - 1 : 30))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!error && !data) return <></>

  if (error) return <Typography>Failed to load</Typography>
  return (
    <AdminLayout title="Dashboard" subtitle="General statistics" icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        {options.map((option, index) => (
          <SummaryTile
            key={index}
            {...option}
            title={option.id ? data![option.id] : `${refreshIn} seconds`}
          />
        ))}
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
