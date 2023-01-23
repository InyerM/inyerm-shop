import { useContext } from "react"
import NextLink from "next/link"
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { UIContext } from "../../context"

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UIContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#000",
          }}>
          <Typography variant="h6">InyerM</Typography>
          <Typography>|</Typography>
          <Typography>Shop</Typography>
        </NextLink>

        <Box flex={1} />

        <IconButton onClick={toggleSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
