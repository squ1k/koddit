import "./AuthHero.css"

export default function AuthHero() {
  return (
    <div className="auth-hero card bg-primary text-white mb-4">
      <div className="hero-grid row align-items-center">

        <div className="col-md-8">

          <h2 className="fw-bold">
            Образовательный центр
            <br/>
            в твоем телефоне!
          </h2>

          <p className="mb-2">
            Курсы, расписание и оплата
            в одном приложении
          </p>

          <ul className="mb-0 hero-ul">
            <li>Курсы</li>
            <li>Расписание</li>
            <li>Оплата</li>
          </ul>

        </div>

        <div className="col-md-4 text-center">

          <img
            src="/smile.svg"
          />

        </div>

      </div>
        
    </div>
  )
}