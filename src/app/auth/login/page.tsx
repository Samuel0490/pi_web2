import Link from "next/link";
import "./login.css"; // importa tu CSS de la misma carpeta

export const metadata = {
  title: "Iniciar Sesión",
};

export default function LoginPage() {
  return (
    <div className="login-box">
      <h1>Iniciar Sesión</h1>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link href="/auth/register">Regístrate</Link>
      </p>
    </div>
  );
}
