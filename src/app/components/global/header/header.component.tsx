import Link from "next/link"

import "./header.styles.scss"

export const Header = () => {

  return (
    <>
      <header>
        <h1>
          <Link href="/">
            <img src="/images/logo.png" alt="Vybe: Powered by Spotify" />
          </Link>
        </h1>
      </header>
    </>
  )
}