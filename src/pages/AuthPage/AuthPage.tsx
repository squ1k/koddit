import "./AuthPage.css";

export default function AuthPage() {
  return (
    <div className="auth">
      <div className="auth__container">

        <header className="auth__header">
          <div className="logo">КОДДИТ</div>

          <div className="contacts">
            <div className="phone">+7 992 346-65-45</div>
            <div className="time">пн-пт 9:00</div>
          </div>
        </header>

        <section className="hero">
          <div className="hero__content">
            <h2>Образовательный центр<br />в твоем телефоне!</h2>

            <p>
              Вход по номеру телефона безопасен и удобен.<br />
              Для детей и родителей
            </p>

            <ul>
              <li>Курсы</li>
              <li>Расписание</li>
              <li>Оплата</li>
            </ul>
          </div>

          <div className="hero__image">
            <img src="/smile.png" alt="" />
          </div>
        </section>

        <div className="tabs">
          <button className="active">Вход</button>
          <button>Регистрация</button>
        </div>

        <form className="form">
          <input placeholder="Телефон" />
          <input type="password" placeholder="Пароль" />

          <button className="submit">Вход</button>
        </form>

        <footer className="footer">
          <div className="footer__nav">
            <span>Курсы</span>
            <span>Отзывы</span>
          </div>

          <div className="footer__phone">+7 992 346-65-45</div>

          <div className="copyright">
            ОГРН 318665800008347<br />
            © 2018–2026 Коддит
          </div>
        </footer>

      </div>
    </div>
  );
}