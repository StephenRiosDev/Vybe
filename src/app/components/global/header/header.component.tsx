import Link from "next/link"
import Image from "next/image"

import "./header.styles.scss"

export const Header = () => {

  return (
    <>
      <header>
        <h1>
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo: Vybe: Powered by Spotify" width={150} height={62} />
          </Link>
        </h1>
      </header>
    </>
  )
}