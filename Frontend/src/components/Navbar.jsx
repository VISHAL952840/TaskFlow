import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link to="/dashboard" className="logo">
                TaskFlow
            </Link>

            <div className="nav-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/tasks">
                    Tasks
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                {user && (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}

            </div>

        </nav>
    );
}

export default Navbar;