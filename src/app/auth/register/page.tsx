import Link from "next/link";
import "./register.css"; // importa tu CSS de la misma carpeta

export const metadata = {
  title: "Registro",
};

export default function RegisterPage() {
  return (
    <div className="register-box">
      <h1>Registro</h1>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link href="/auth/login">Inicia sesión</Link>
      </p>
    </div>
  );
}
