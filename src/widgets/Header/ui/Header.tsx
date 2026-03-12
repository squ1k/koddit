import "./Header.css"

export default function Header() {
  return (
    <header className="header d-flex justify-content-between mb-4">

      <img
          src="/logo.svg" alt="Logo"
          className="logo">
      </img>

        <div>
          <a href="tel:+7 992 346-65-45" className="contacts">+7 992 346-65-45</a>
          <p className="text-muted">на связи 14–21 : 00</p>
        </div>
        
    </header>
  )
}