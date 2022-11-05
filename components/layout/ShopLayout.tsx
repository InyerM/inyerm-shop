import Head from "next/head"
import { FC } from "react"
import { Navbar, SideMenu } from "../ui"

interface Props {
  children: React.ReactNode
  title: string
  description: string
  imageFullUrl?: string
}

export const ShopLayout: FC<Props> = ({ children, description, title, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description } />
        <meta property="og:title" content={ title } />
        <meta property="og:description" content={ description } />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.example.com/" />
        <meta property="og:image" content={ imageFullUrl } />
        <meta property="og:site_name" content="Example" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@site_account" />
        <meta name="twitter:creator" content="@individual_account" />
        <meta name="twitter:title" content={ title } />
        <meta name="twitter:description" content={ description } />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {
          imageFullUrl && <>
            <meta property="og:image" content={ imageFullUrl } />
            <meta name="twitter:image" content={ imageFullUrl } />
          </>
        }
      </Head>

      <nav>
        <Navbar />
      </nav>

      <aside>
        <SideMenu />
      </aside>

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0 30px'
      }}>
        { children }
      </main>

      <footer>

      </footer>
    </>
  )
}
