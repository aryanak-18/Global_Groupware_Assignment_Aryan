import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Edit2,
  Trash2,
  UserCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { showAlert } from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const entriesPerPage = 6;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response1 = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users?page=1`
      );
      const response2 = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users?page=2`
      );

      // console.log(response1);
      const data1 = response1.data;
      const data2 = response2.data;
      const data = [...data1.data, ...data2.data];
      // console.log("Data: ", data);
      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery) ||
      user.last_name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
  );

  const handleOpenModal = (user) => {
    setCurrentUser(user);
    setFormValues({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const { first_name, last_name, email } = formValues;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!first_name.trim()) {
      setError("First Name is required");
      return false;
    }
    if (!last_name.trim()) {
      setError("Last Name is required");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const data = { ...formValues };
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/${currentUser.id}`;

      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      showAlert("success", "User updated successfully");

      // fetchUsers();
      // console.log("form-values: ",formValues);
      const arr = users;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === currentUser.id) {
          arr[i].first_name = formValues.first_name;
          arr[i].last_name = formValues.last_name;
          arr[i].email = formValues.email;
        }
      }
      // console.log("User data after updating: ",arr);
      setUsers(arr);
      handleCloseModal();
    } catch (error) {
      setError("Error saving user. Please try again.");
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`
        );

        if (response.status !== 204) {
          throw new Error("Network response was not ok");
        }

        // fetchUsers();

        const arr = users.filter((user) => user.id !== id);
        setUsers(arr);
        showAlert("success", "User deleted successfully");
      } catch (error) {
        setError("Error deleting user. Please try again.");
        console.error("Error deleting user:", error);
      }
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("error", "Logged Out successfully");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div
        className="ml-auto w-fit bg-red-500 text-white px-4 py-2 rounded-md font-bold hover:bg-red-700 hover:cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </div>
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
          <User className="w-8 h-8" />
          Users List
        </h1>

        <div className="flex items-center border rounded">
          <Search className="w-5 h-5 ml-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 rounded w-64"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">
                <div className="flex">
                  <UserCircle2 /> Avatar
                </div>
              </th>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">
                <div className="flex">
                  <Mail /> Email
                </div>
              </th>
              <th className="p-3 text-right pr-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    className="w-20 text-gray-500 rounded-full"
                    alt="user-avatar"
                  />
                </td>
                <td className="p-3 items-center gap-3">
                  <span>{user.first_name}</span>
                </td>
                <td className="p-3 items-center gap-3">
                  <span>{user.last_name}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    {user.email}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:bg-red-100 p-2 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
              <User className="w-6 h-6" />
              {"Edit User"}
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <div className="flex items-center border rounded">
                  <User className="w-5 h-5 ml-2 text-gray-500" />
                  <input
                    type="text"
                    name="first_name"
                    value={formValues.first_name}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-1 rounded"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <div className="flex items-center border rounded">
                  <User className="w-5 h-5 ml-2 text-gray-500" />
                  <input
                    type="text"
                    name="last_name"
                    value={formValues.last_name}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-1 rounded"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <div className="flex items-center border rounded">
                  <Mail className="w-5 h-5 ml-2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-1 rounded"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save User
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
