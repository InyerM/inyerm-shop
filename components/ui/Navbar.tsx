import NextLink from 'next/link'
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#000'
        }}>
            <Typography variant="h6">InyerM</Typography>
            <Typography>|</Typography>
            <Typography>Shop</Typography>
        </NextLink>

        <Box flex={ 1 } />

        <Box sx={{
          display: { xs: 'none', sm: 'block' }
        }}>
          <NextLink href="/category/men" style={{
            textDecoration: 'none',
          }}>
            <Button>Men</Button>
          </NextLink>
          <NextLink href="/category/women" style={{
            textDecoration: 'none',
          }}>
            <Button>Women</Button>
          </NextLink>
          <NextLink href="/category/kid"style={{
            textDecoration: 'none',
          }}>
            <Button>Kid</Button>
          </NextLink>
        </Box>

        <Box flex={ 1 } />

        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>

        <NextLink href="/cart">
          <IconButton>
            <Badge badgeContent={ 2 } color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </NextLink>

        <IconButton>
          <MenuOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
