import { SnackbarOrigin } from "@mui/material"

interface MatSnackBarConfig {
  duration?: number
  anchorOrigin?: SnackbarOrigin
  autoHideDuration?: number
}

export const snackbarConfig: MatSnackBarConfig = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration: 2000,
}