

import { useState } from "react";

export default function A02CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Reset form
  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
  };

  // Handle change for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when typing
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.username.trim() || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/A02CreateUser/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`User created successfully! User ID: ${data.user_id}`);
        resetForm();
      } else {
        setError(data.message || "Error creating user");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create New User</h2>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            autoComplete="off"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            autoComplete="new-password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            autoComplete="new-password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 active:scale-[.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}