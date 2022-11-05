import { Grid, Typography } from '@mui/material'

interface IOrderSummaryItems {
  label: string
  value: string
  variant?: 'body1' | 'body2' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2' | 'button' | undefined
}

const orderSummaryItems: IOrderSummaryItems[] = [
  { label: 'N° Products', value: '3 items' },
  { label: 'Subtotal', value: '$ 155.81' },
  { label: 'Tax', value: '$ 25.21' },
  { label: 'Total', value: '$ 180.12', variant: 'subtitle1' },
]

export const OrderSummary = () => {
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
