import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminUsers.css";

function AdminUsers() {
    const navigate = useNavigate();

    const [users] = useState(() => {
        const savedUsers = localStorage.getItem("users");
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [roleFilter, setRoleFilter] = useState("all");

    const filteredUsers = users.filter((user) => {

        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);

        const matchesRole =
            roleFilter === "all" ||
            user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const handleToggleStatus = (userId) => {

        const updatedUsers = users.map((user) => {

            if (user.id === userId) {
                return {
                    ...user,
                    status: (user.status || "active") === "active"
                        ? "inactive"
                        : "active"
                };
            }

            return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        window.location.reload();
    };

    return (
        <div className="admin-users-page">

            <div className="admin-users-header">
                <h1>User Management</h1>
                <p>View registered users and their account information.</p>
            

                <div className="users-search">

                    <input 
                    type="text"
                    placeholder="Search users by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="user">Users</option>
                        <option value="admin">Admins</option>
                    </select>

                </div>
            </div>

            <div className="users-list">

                {users.length === 0 ? (

                    <div className="users-empty">
                        <h2>No Users Found</h2>
                        <p>There are no registered users yet.</p>
                    </div>

                ) : filteredUsers.length === 0 ? (

                    <div className="users-empty">
                        <h2>No Matching Users</h2>
                        <p>No users match your search.</p>
                    </div>

                ) : (
                    filteredUsers.map((user) => (

                        <div className="user-card" key={user.id}>

                            <h2
                                className="user-name-link"
                                onClick={() => navigate(`/admin/users/${user.id}`)}
                            >
                                {user.name}
                            </h2>

                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>

                            <p>
                                <strong>Phone:</strong> {user.phone}
                            </p>

                            <p>
                                <strong>Role:</strong> {user.role}
                            </p>

                            <p>
                                <strong>Status:</strong> {user.status || "active"}
                            </p>

                            <p>
                                <strong>User ID:</strong> {user.id}
                            </p>

                            <button
                                className="user-status-button"
                                onClick={() => handleToggleStatus(user.id)}
                            >
                                {(user.status || "active") === "active"
                                    ? "Deactivate"
                                    : "Activate"}
                            </button>

                        </div>

                ))

                )}

            </div>

        </div>
    );
}

export default AdminUsers;