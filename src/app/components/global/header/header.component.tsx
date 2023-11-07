import Link from "next/link"
import Image from "next/image"

import { Typography } from "@mui/material"

import "./header.styles.scss"

export const Header = () => {

  return (
    <>
      <header>
        <Typography mt="5px">
          <Link href="/">
            <Image priority src="/images/logo.png" alt="Logo: Vybe: Powered by Spotify" width={175} height={52.5} />
          </Link>
        </Typography>
      </header>
    </>
  )
}