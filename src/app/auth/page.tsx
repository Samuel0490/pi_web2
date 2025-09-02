import Link from "next/link";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/login.css" />
      </Head>
      <div className="login-container">
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
    </>
  );
}
