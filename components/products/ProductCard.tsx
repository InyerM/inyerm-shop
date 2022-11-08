import { FC, useMemo, useState } from "react"
import Link from 'next/link'
import { Card, CardActionArea, CardMedia, Typography, Grid, Box } from "@mui/material"
import { IProduct } from "../../interfaces"

interface Props {
  product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered 
      ? `/products/${ product.images[1] }`
      : `/products/${ product.images[0] }`
  }, [isHovered, product.images])

  return (
    <Grid 
      item 
      xs={12} 
      sm={6} 
      md={4}
      onMouseEnter={ () => setIsHovered(true) }
      onMouseLeave={ () => setIsHovered(false) }
    >
      <Card>
        <Link href={ `/product/${ product.slug }` } prefetch={ false }>
          <CardActionArea>
            <CardMedia
              component="img"
              image={ productImage }
              alt={ product.title }
              className='fadeIn'
              onLoad={ () => setIsImageLoaded(true) }
            />
          </CardActionArea>
        </Link>
      </Card>
      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{ product.title }</Typography>
        <Typography fontWeight={500}>${ product.price }</Typography>
      </Box>
    </Grid>
  )
}
