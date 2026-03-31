export function CertificatesStats() {
    return (
        <div className="certificates-grid">
            <div className="certificate-card">
                <div className="certificate-image">
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="10"
                            y="10"
                            width="80"
                            height="80"
                            stroke="#ddd"
                            strokeWidth="2"
                        />
                        <line
                            x1="10"
                            y1="10"
                            x2="90"
                            y2="90"
                            stroke="#ddd"
                            strokeWidth="2"
                        />
                        <line
                            x1="90"
                            y1="10"
                            x2="10"
                            y2="90"
                            stroke="#ddd"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
                <p className="certificate-title">Разработка на Python</p>
            </div>
        </div>
    );
}
