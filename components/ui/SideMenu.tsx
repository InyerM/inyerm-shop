import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import { clientMenu, icons, adminMenu } from "./"
import { UIContext } from '../../context'


export const SideMenu = () => {

  const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
  const { push } = useRouter()

  const [searchTerm, setSearchTerm] = useState('')

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return

    navigateTo(`/search/${ searchTerm }`)
  }

  const navigateTo = ( url: string ) => {
    push(url)
    toggleSideMenu()
  }

  return (
    <Drawer
      open={ isMenuOpen }
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={ toggleSideMenu }
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              type='search'
              placeholder="Search"
              sx={{ paddingX: 1 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={ onSearchTerm }
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
              value={ searchTerm }
              onChange={ ( e ) => setSearchTerm( e.target.value ) }
              onKeyUp={ ( e ) => e.key === 'Enter' ? onSearchTerm() : null }
            />
          </ListItem>

          {
            clientMenu.map(({ label, icon, properties, href }) => {
              const Icon = icons[icon];
              return (
                <ListItem button key={label} onClick={ () => href ? navigateTo(href) : null } {...properties}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              );
            })
          }

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          {
            adminMenu.map(({ label, icon }) => {
              const Icon = icons[icon];
              return (
                <ListItem button key={label}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              );
            })
          }

        </List>
      </Box>
    </Drawer>
  )
}