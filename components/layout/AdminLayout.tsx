import Box from "@mui/material/Box"
import { FC } from "react"
import { AdminNavbar } from "../admin"
import { SideMenu } from "../ui"
import { Typography } from "@mui/material"
import Head from "next/head"

interface Props {
  children: React.ReactNode
  title: string
  subtitle: string
  icon?: JSX.Element
}

export const AdminLayout: FC<Props> = ({ children, subtitle, title, icon }) => {
  return (
    <>
      <Head>
        <title>{title} | Admin</title>
      </Head>
      <nav>
        <AdminNavbar />
      </nav>

      <aside>
        <SideMenu />
      </aside>

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0 30px",
        }}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            <span style={{ marginRight: 10 }}>{icon}</span>
            {title}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  )
}
