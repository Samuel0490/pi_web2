"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) throw new Error("Login fallido");
            const user = await res.json();
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/tasks");
        } catch (err) {
            console.error(err);
            alert("Correo o contraseña incorrectos");
        }

    };

    return (
        <form className="form-container" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="title">Iniciar Sesión</h2>
            <label htmlFor="login-email">Correo electrónico</label>
            <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Tu correo"
                autoFocus
                autoComplete="username"
                required
            />
            <label htmlFor="login-password">Contraseña</label>
            <input
                id="login-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Iniciar sesión"}
            </button>
        </form>
    );
}
