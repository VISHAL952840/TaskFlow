import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user } = useAuth();

    return (
        <>
            <Navbar />

            <main className="profile-page">

                <div className="profile-card">

                    <h1>
                        My Profile 👤
                    </h1>

                    <div className="profile-info">

                        <div>
                            <span>
                                Name
                            </span>

                            <strong>
                                {user?.name}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Email
                            </span>

                            <strong>
                                {user?.email}
                            </strong>
                        </div>

                        <div>
                            <span>
                                User ID
                            </span>

                            <strong>
                                {user?._id}
                            </strong>
                        </div>

                    </div>

                </div>

            </main>
        </>
    );
}

export default Profile;