import Link from "next/link"
import Image from "next/image"

import "./footer.styles.scss"

export const Footer = () => {

  return (
    <>
      <footer>
        <div className="logo">
          <Link href="/">
            <Image src="/images/logo-footer.png" alt="Logo: Vybe: Powered by Spotify" width={125} height={38} />
          </Link>
        </div>

        <menu>
          <Link href="/privacy">Privacy Statement</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/licensing">Licensing</Link>
        </menu>
      </footer>
    </>
  )
}