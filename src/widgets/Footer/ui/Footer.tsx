import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <img className="divider" src="/divider.svg"></img>
            <div className="footer">

                <div className="row align-items-center mb-3">
                    <div className="col-auto">
                        <a href="https://koddit.ru/leto.html" className="text-decoration-none text-dark">
                            На главную
                        </a>
                    </div>
                    <div className="col-auto">
                        <a href="tel:+79923466545" className="contacts text-decoration-none text-dark ">
                            +7 992 346-65-45
                        </a>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-auto">
                        <div className="text-muted">
                            ОГРН 318665800008347
                            <br />© 2018 – 2026 Коддит
                        </div>
                    </div>
                    <div className="col-auto">
                        <a 
                            href="https://t.me/kontinuumadmin" target="_blank" 
                            className="me-3" 
                            rel="noopener noreferrer"
                        >
                            <img src="/tg.svg" alt="Telegram" style={{ width: '30px', height: '30px' }} />
                        </a>
                        <a 
                            href="https://vk.me/vk.koddit" target="_blank" 
                            className="me-3" 
                            rel="noopener noreferrer"
                        >
                            <img src="/vk.svg" alt="VK" style={{ width: '30px', height: '30px' }} />
                        </a>
                        <a 
                            href="https://max.ru/u/f9LHodD0cOI21LXRbIRfETt8k27m_sn_KaiY6x-sGJIGVH-g6qJXvflE62g" target="_blank" 
                            className="max"
                            rel="noopener noreferrer"
                        >
                            <img src="/maxwhite.svg" alt="Max" style={{ width: '24px', height: '24px' }} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}