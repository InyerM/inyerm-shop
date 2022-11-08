import { Box, Typography, CircularProgress } from '@mui/material';

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      flexDirection='column'
      gap={2}
    >
      <Typography variant='h2'>Loading...</Typography>
      <CircularProgress thickness={ 2 }/>
    </Box>
  )
}
