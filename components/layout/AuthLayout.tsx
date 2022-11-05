import { Box } from '@mui/material'
import Head from 'next/head'
import { FC } from 'react'

interface Props {
  children: React.ReactNode
  title: string
  description: string
}

export const AuthLayout: FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name='description' content={ description } />
      </Head>

      <main>
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          {
            children
          }
        </Box>
      </main>
    </>
  )
}