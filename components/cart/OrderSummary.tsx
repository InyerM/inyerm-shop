import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { CartContext } from '../../context'
import { currency } from '../../utils'

interface IOrderSummaryItems {
  label: string
  value: string
  variant?: 'body1' | 'body2' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2' | 'button' | undefined
}

export const OrderSummary = () => {

  const { numberOfItems, subtotal, tax, total } = useContext(CartContext)

  const orderSummaryItems: IOrderSummaryItems[] = [
    { label: 'N° Products', value: `${ numberOfItems } ${ numberOfItems > 1 ? 'items' : 'item' }` },
    { label: 'Subtotal', value: currency.format(subtotal) },
    { label: 'Tax (15%)', value: currency.format(tax) },
    { label: 'Total', value: currency.format(total), variant: 'subtitle1' },
  ]

  return (
    <Grid container rowSpacing={1}>
      {
        orderSummaryItems.map((item, index) => (
          <Grid item xs={ 12 } container key={ index }>
            <Grid item xs={ 6 }>
              <Typography variant={ item.variant || 'body1' }>{ item.label }</Typography>
            </Grid>
            <Grid item xs={ 6 } display='flex' justifyContent='end'>
              <Typography variant={ item.variant || 'subtitle2' }>{ item.value }</Typography>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  )
}
