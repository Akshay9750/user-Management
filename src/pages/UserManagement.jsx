import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, addUser, editUser } from "../api/api";
import UserCard from "../components/UserCard";
import Modal from "../components/Modal";
import AddEditUserForm from "../components/AddEditUserForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again.");
    }
  };

  const handleUserSaved = (savedUser) => {
    console.log("User saved:", savedUser);
    if (selectedUser) {
      // ✅ Update existing user
      editUser(selectedUser.id, savedUser)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === savedUser.id ? savedUser : user
            )
          );
          toast.success("User updated successfully!");
        })
        .catch((error) => {
          console.error("Error editing user:", error);
          toast.error("Error updating user. Please try again.");
        });
    } else {
      // ✅ Add new user (generate fake ID)
      const newUser = { ...savedUser, id: users.length + 1 };
      console.log("New user:", newUser);
      addUser(savedUser)
        .then(() => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
          toast.success("User added successfully!");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          toast.error("Error adding user. Please try again.");
        });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      {/* Add User Button */}
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
      >
        Add User
      </button>
      {/* User Cards */}
      <div className="flex flex-wrap gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">
            {selectedUser ? "Edit User" : "Add User"}
          </h2>
          <AddEditUserForm
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onUserSaved={handleUserSaved} //
          />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
