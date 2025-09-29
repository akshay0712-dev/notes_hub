import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: "",
    email: "",
    password: "",
    role: "admin",
};

const roles = ["admin"];

function Register() {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        if (!roles.includes(form.role)) newErrors.role = "Invalid role";
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE}/admin/register`,
                form
            );
            setMessage("Registration successful!");
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {message && (
                <div className="mb-4 text-center text-sm text-green-600">{message}</div>
            )}
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Name:</label>
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password:</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && (
                        <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Role:</label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                    {errors.role && (
                        <div className="text-red-500 text-xs mt-1">{errors.role}</div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        } text-white py-2 rounded transition mt-4`}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;
