import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { UIContext } from '../../context'

export const Navbar = () => {

  const { asPath, push } = useRouter()
  const { toggleSideMenu } = useContext(UIContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return

    push(`/search/${ searchTerm }`)
  }


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

        <Box 
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' }
          }} 
          gap={ 2 }
          className='fadeIn'
        >
          <NextLink href="/category/men" style={{
            textDecoration: 'none',
          }}>
            <Button color={ asPath === '/category/men' ? 'primary' : 'info' }>Men</Button>
          </NextLink>
          <NextLink href="/category/women" style={{
            textDecoration: 'none',
          }}>
            <Button color={ asPath === '/category/women' ? 'primary' : 'info' }>Women</Button>
          </NextLink>
          <NextLink href="/category/kid" style={{
            textDecoration: 'none',
          }}>
            <Button color={ asPath === '/category/kid' ? 'primary' : 'info' }>Kid</Button>
          </NextLink>
        </Box>

        <Box flex={ 1 } />
        
        <IconButton
          sx={{
            display: { xs: 'flex', sm: 'none' }
          }}
          onClick={ toggleSideMenu }
        >
          <SearchOutlinedIcon />
        </IconButton>
        {
          isSearchVisible ? (
            <Input
              className='fadeIn'
              autoFocus
              type='search'
              placeholder="Search"
              sx={{ paddingX: 1, display: { xs: 'none', sm: 'flex' } }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={ () => setIsSearchVisible(false) }
                  >
                    <ClearOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
              value={ searchTerm }
              onChange={ ( e ) => setSearchTerm( e.target.value ) }
              onKeyUp={ ( e ) => e.key === 'Enter' ? onSearchTerm() : null }
            />
          )
          : ( <IconButton 
                onClick={ () => setIsSearchVisible(true) } 
                className='fadeIn'
                sx={{
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
              <SearchOutlinedIcon />
            </IconButton> )

        }
        

        <NextLink href="/cart">
          <IconButton>
            <Badge badgeContent={ 2 } color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </NextLink>

        <IconButton onClick={ toggleSideMenu }>
          <MenuOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
