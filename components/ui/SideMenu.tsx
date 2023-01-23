import { useContext, useState } from "react"
import { useRouter } from "next/router"
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import { clientMenu, icons, adminMenu } from "./"
import { AuthContext, UIContext } from "../../context"
import ListItemButton from "@mui/material/ListItemButton"

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
  const { isLoggedIn, user, logout } = useContext(AuthContext)
  const { push, asPath } = useRouter()

  const [searchTerm, setSearchTerm] = useState("")

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return

    navigateTo(`/search/${searchTerm}`)
  }

  const navigateTo = (url: string) => {
    toggleSideMenu()
    push(url)
  }

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}>
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              type="search"
              placeholder="Search"
              sx={{ paddingX: 1 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            />
          </ListItem>

          {clientMenu.map(({ label, icon, properties, href, auth, notLogged }) => {
            const Icon = icons[icon]

            if (auth && !isLoggedIn) return null

            if (notLogged && isLoggedIn) return null

            return (
              <ListItemButton
                key={label}
                onClick={() =>
                  href
                    ? navigateTo(label === "Login" ? `${href}?p=${asPath}` : href)
                    : label === "Logout"
                    ? logout()
                    : null
                }
                {...properties}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            )
          })}

          {/* Admin */}
          <Divider />
          {user?.role === "admin" && (
            <>
              <ListSubheader>Admin Panel</ListSubheader>

              {adminMenu.map(({ label, icon, url }) => {
                const Icon = icons[icon]
                return (
                  <ListItemButton key={label} onClick={() => navigateTo(url)}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                )
              })}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  )
}
