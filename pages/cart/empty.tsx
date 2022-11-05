import RemoveShoppingCartOutlined from "@mui/icons-material/RemoveShoppingCartOutlined"
import { Box, Typography } from "@mui/material"
import Link from "next/link"

import { ShopLayout } from "../../components/layout"

const EmptyPage = () => {
  return (
    <ShopLayout title='Empty Cart' description='There is no articles in your cart'>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 80 }}/>
        <Box display='flex' flexDirection='column' alignItems='center' marginLeft={2}>
          <Typography>Your cart is empty</Typography>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <Typography variant="h4" color='secondary'>Go back</Typography>
          </Link>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage