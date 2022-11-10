import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'

interface Props {
  currentValue: number
  maxValue: number
  handleQuantity: (quantity: number) => void
}

export const ItemCounter: FC<Props> = ({ currentValue, handleQuantity, maxValue }) => {

  const onClick = (value: number) => {
    if ( value === -1 ) {
      if ( currentValue === 1 ) return;

      return handleQuantity( currentValue - 1);
    }

    if ( currentValue >= maxValue ) return;

    handleQuantity( currentValue + 1 );
  }
  
  return (
    <Box display='flex' alignItems='center' >
      <IconButton onClick={ () => onClick(-1) }>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{ currentValue }</Typography>
      <IconButton onClick={ () => onClick(+1) }>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}