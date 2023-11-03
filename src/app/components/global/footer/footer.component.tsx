import Link from "next/link"
import "./footer.styles.scss"

export const Footer = () => {

  return (
    <>
      <footer>
        <div className="logo">
          <Link href="/">
            <img src="/images/logo-footer.png" alt="Logo: Vybe: Powered by Spotify" />
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