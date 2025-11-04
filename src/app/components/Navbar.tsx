"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<{ id: number; email?: string } | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) setUser(JSON.parse(userStr));
        else setUser(null);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    return (
        <nav className="navbar alt-navbar">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span className="logo-alt">📝 TaskMaster</span>
            </div>
            <div className="navbar-links-alt">
                <Link href="/tasks" className={pathname === "/tasks" ? "active" : ""}>
                    Tareas
                </Link>
                {!user && (
                    <>
                        <Link href="/login" className={pathname === "/login" ? "active" : ""}>Entrar</Link>
                        <Link href="/register" className={pathname === "/register" ? "active special" : "special"}>Registro</Link>
                    </>
                )}
                {user && (
                    <>
                        <span style={{
                            background: "#f4fafd",
                            borderRadius: "40px",
                            padding: "7px 16px",
                            color: "#2b395b",
                            fontWeight: 700,
                            margin: "0 7px"
                        }}>
                            {user.email}
                        </span>
                        <button onClick={handleLogout} className="logout-btn">
                            Salir
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
