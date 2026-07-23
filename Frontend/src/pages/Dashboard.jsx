import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosApi";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { user } = useAuth();

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
        overdue: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await api.get(
                    "/tasks/stats"
                );

                setStats(response.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getStats();

    }, []);

    return (
        <>
            <Navbar />

            <main className="dashboard">

                <div className="welcome">

                    <div>
                        <h1>
                            Welcome back, {user?.name} 👋
                        </h1>

                        <p>
                            Here's what's happening with your tasks today.
                        </p>
                    </div>

                    <Link
                        to="/tasks"
                        className="primary-button"
                    >
                        + New Task
                    </Link>

                </div>

                {loading ? (
                    <h2>Loading...</h2>
                ) : (

                    <div className="stats-grid">

                        <div className="stat-card">
                            <h3>Total Tasks</h3>
                            <strong>
                                {stats.total}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <h3>Completed</h3>
                            <strong>
                                {stats.completed}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <h3>Pending</h3>
                            <strong>
                                {stats.pending}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <h3>Overdue</h3>
                            <strong>
                                {stats.overdue}
                            </strong>
                        </div>

                    </div>

                )}

                <div className="dashboard-card">

                    <h2>
                        Manage Your Tasks
                    </h2>

                    <p>
                        Create, update, delete, and organize your tasks.
                    </p>

                    <Link
                        to="/tasks"
                        className="primary-button"
                    >
                        View All Tasks
                    </Link>

                </div>

            </main>
        </>
    );
}

export default Dashboard;