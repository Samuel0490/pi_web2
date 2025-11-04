"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskInput, setTaskInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);
    const router = useRouter();

    // Solo permite acceso si el usuario está logueado
    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            router.push("/login");
            return;
        }
        const user = JSON.parse(userStr);
        setUserId(user.id);
        fetch(`http://localhost:8080/api/tasks/${user.id}`)
            .then((res) => res.json())
            .then(setTasks)
            .finally(() => setLoading(false));
    }, [router]);

    const refreshTasks = () => {
        if (!userId) return;
        fetch(`http://localhost:8080/api/tasks/${userId}`)
            .then((res) => res.json())
            .then(setTasks);
    };

    const handleAddTask = async () => {
        if (taskInput.trim() === "" || !userId) return;
        await fetch("http://localhost:8080/api/tasks/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: taskInput,
                completed: false,
                user: { id: userId },
            }),
        });
        setTaskInput("");
        refreshTasks();
    };

    const handleToggleTask = async (id: number, current: boolean, title: string) => {
        if (!userId) return;
        await fetch(`http://localhost:8080/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, completed: !current, user: { id: userId } }),
        });
        refreshTasks();
    };

    const handleEditTask = async (
        id: number,
        title: string,
        completed: boolean
    ) => {
        const newTitle = prompt("Editar tarea:", title);
        if (newTitle && newTitle.trim() !== "" && newTitle !== title && userId) {
            await fetch(`http://localhost:8080/api/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle, completed, user: { id: userId } }),
            });
            refreshTasks();
        }
    };

    const handleDeleteTask = async (id: number) => {
        await fetch(`http://localhost:8080/api/tasks/${id}`, { method: "DELETE" });
        refreshTasks();
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (loading) return <div className="main-container">Cargando tareas...</div>;

    return (
        <div className="main-container">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <h1 className="title">Tus tareas</h1>
                <button
                    onClick={handleLogout}
                    style={{ background: "#666", borderRadius: 8, marginLeft: 8 }}
                >
                    Cerrar sesión
                </button>
            </div>
            <div style={{ display: "flex", marginBottom: 16 }}>
                <input
                    type="text"
                    placeholder="Nueva tarea"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    style={{ flex: 1, marginRight: 8 }}
                />
                <button type="button" onClick={handleAddTask}>
                    Agregar
                </button>
            </div>
            <ul className="task-list">
                {tasks.length === 0 && <div>No tienes tareas registradas.</div>}
                {tasks.map((task: Task) => (
                    <li key={task.id} className="task-item">
                        <span
                            className={`task-title${task.completed ? " completed" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggleTask(task.id, task.completed, task.title)}
                        >
                            {task.title}
                        </span>
                        <div>
                            <button
                                type="button"
                                onClick={() => handleEditTask(task.id, task.title, task.completed)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="danger"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
