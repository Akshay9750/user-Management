import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// ✅ Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// ✅ Add new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// ✅ Edit user
export const editUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};

// ✅ Delete user
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
