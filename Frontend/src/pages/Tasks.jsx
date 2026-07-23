import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import api from "../api/axiosApi";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response = await api.get("/tasks", {
                params: {
                    search,
                    status,
                    priority,
                },
            });

            setTasks(response.data.tasks);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [status, priority]);

    const handleCreateTask = async (taskData) => {
        try {
            await api.post(
                "/tasks",
                taskData
            );

            setShowModal(false);

            fetchTasks();

        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            await api.put(
                `/tasks/${selectedTask._id}`,
                taskData
            );

            setShowModal(false);
            setSelectedTask(null);

            fetchTasks();

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `/tasks/${id}`
            );

            fetchTasks();

        } catch (error) {
            console.log(error);
        }
    };

    const handleToggle = async (id) => {
        try {
            await api.patch(
                `/tasks/${id}/toggle`
            );

            fetchTasks();

        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTasks();
    };

    return (
        <>
            <Navbar />

            <main className="tasks-page">

                <div className="page-header">

                    <div>
                        <h1>
                            My Tasks
                        </h1>

                        <p>
                            Manage all your tasks in one place.
                        </p>
                    </div>

                    <button
                        className="primary-button"
                        onClick={() => {
                            setSelectedTask(null);
                            setShowModal(true);
                        }}
                    >
                        + Create Task
                    </button>

                </div>

                <div className="filters">

                    <form onSubmit={handleSearch}>

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <button type="submit">
                            Search
                        </button>

                    </form>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="TO-DO">
                            To Do
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Done">
                            Done
                        </option>
                    </select>

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option value="">
                            All Priority
                        </option>

                        <option value="low">
                            Low
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>

                    </select>

                </div>

                {loading ? (

                    <h2>
                        Loading tasks...
                    </h2>

                ) : tasks.length === 0 ? (

                    <div className="empty-state">

                        <h2>
                            No tasks found
                        </h2>

                        <p>
                            Create your first task.
                        </p>

                    </div>

                ) : (

                    <div className="task-grid">

                        {tasks.map((task) => (

                            <div
                                className="task-card"
                                key={task._id}
                            >

                                <div className="task-top">

                                    <h3>
                                        {task.title}
                                    </h3>

                                    <span
                                        className={`priority ${task.priority}`}
                                    >
                                        {task.priority}
                                    </span>

                                </div>

                                <p>
                                    {task.description}
                                </p>

                                <div className="task-info">

                                    <span>
                                        {task.category}
                                    </span>

                                    <span>
                                        {task.status}
                                    </span>

                                </div>

                                <div className="task-actions">

                                    <button
                                        onClick={() =>
                                            handleToggle(task._id)
                                        }
                                    >
                                        Toggle
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(task._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

            {showModal && (

                <TaskModal
                    task={selectedTask}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedTask(null);
                    }}
                    onSave={
                        selectedTask
                            ? handleUpdateTask
                            : handleCreateTask
                    }
                />

            )}

        </>
    );
}

export default Tasks;