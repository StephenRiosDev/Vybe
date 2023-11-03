import "./contentWrapper.styles.scss";

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {


  return (
    <>
      <section className="content-wrapper">{children}</section>
    </>
  )
}