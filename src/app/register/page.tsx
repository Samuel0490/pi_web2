"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) throw new Error("Registro fallido");
            alert("Registro exitoso");
            router.push("/login");
        } catch (err) {
            console.error(err); 
            alert("Error al registrar usuario");
        }

    };

    return (
        <form className="form-container" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="title">Registrarse</h2>
            <label htmlFor="register-email">Correo electrónico</label>
            <input
                id="register-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@correo.com"
                autoFocus
                autoComplete="username"
                required
            />
            <label htmlFor="register-password">Contraseña</label>
            <input
                id="register-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="******"
                autoComplete="new-password"
                required
            />
            <label htmlFor="register-confirm">Confirmar contraseña</label>
            <input
                id="register-confirm"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="******"
                autoComplete="new-password"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
            </button>
        </form>
    );
}
