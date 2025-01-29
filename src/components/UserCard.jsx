import React from "react";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 max-w-xs transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
      <p className="text-sm text-gray-600 mb-2">{user.phone}</p>

      {/* Company Name */}
      <p className="text-sm text-gray-600 mb-1">
        <strong>Company:</strong> {user.company.name}
      </p>

      {/* Address */}
      <p className="text-sm text-gray-600 mb-4">
        <strong>Address:</strong> {user.address.street}, {user.address.city}
      </p>

      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={() => onEdit(user)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
