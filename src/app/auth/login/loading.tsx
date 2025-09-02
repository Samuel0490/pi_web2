// src/app/auth/login/loading.tsx
export default function Loading() {
    return (
        <div style={{
            minHeight: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
        }}>
            <div style={{ textAlign: "center" }}>
                <svg width="48" height="48" viewBox="0 0 50 50" aria-hidden="true" style={{ display: "block", margin: "0 auto" }}>
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#e6e6e6" strokeWidth="6" />
                    <path d="M45 25a20 20 0 0 1-20 20" stroke="#6d28d9" strokeWidth="6" strokeLinecap="round" fill="none">
                        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                    </path>
                </svg>
                <p style={{ marginTop: 10, color: "#374151" }}>Cargando...</p>
            </div>
        </div>
    );
}
