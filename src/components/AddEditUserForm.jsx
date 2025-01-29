import React, { useState, useEffect } from "react";
import { addUser, editUser } from "../api/api.jsx";

const AddEditUserForm = ({ user, onClose, onUserSaved }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "", // New field for company name
    addressStreet: "", // New field for address street
    addressCity: "", // New field for address city
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        companyName: user.company.name || "", // Set company name
        addressStreet: user.address.street || "", // Set address street
        addressCity: user.address.city || "", // Set address city
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      const userData = {
        ...formData,
        company: { name: formData.companyName }, // Structure company object
        address: { street: formData.addressStreet, city: formData.addressCity }, // Structure address object
      };

      if (user) {
        response = await editUser(user.id, userData);
      } else {
        response = await addUser(userData);
      }

      onUserSaved(response); // Call to update state in UserManagement
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Phone (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Address Street */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Street
        </label>
        <input
          type="text"
          name="addressStreet"
          value={formData.addressStreet}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Address City */}
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="addressCity"
          value={formData.addressCity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {user ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default AddEditUserForm;
