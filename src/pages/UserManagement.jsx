import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, addUser, editUser } from "../api/api";
import UserCard from "../components/UserCard";
import Modal from "../components/Modal";
import AddEditUserForm from "../components/AddEditUserForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  // State to store users
  const [users, setUsers] = useState([]);
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store the selected user for editing
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from API
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  // Function to open modal for editing an existing user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to open modal for adding a new user
  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // Function to delete a user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      // Update the UI by removing the deleted user
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again.");
    }
  };

  // Function to handle saving a user (add or edit)
  const handleUserSaved = (savedUser) => {
    console.log("User saved:", savedUser);
    if (selectedUser) {
      // Update existing user
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
      // Add new user
      const newUser = { ...savedUser, id: users.length + 1 }; // Generate fake ID for frontend
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

    // Close the modal after saving
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

      {/* User Cards Display */}
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

      {/* Modal for Adding/Editing Users */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">
            {selectedUser ? "Edit User" : "Add User"}
          </h2>
          <AddEditUserForm
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onUserSaved={handleUserSaved}
          />
        </Modal>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
