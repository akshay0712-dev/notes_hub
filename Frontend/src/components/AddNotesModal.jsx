import React, { useState } from 'react';
import { MdNoteAdd, MdClose, MdUploadFile } from 'react-icons/md';
import axios from 'axios';


// Categories and Branches
const categories = [
    "Maths",
    "Python",
    "Web Development",
    "English",
    "Chemistry",
];

const branches = [
    "CSE", "CSE AI/ML", "Civil", "Mechanical", "Electrical", "ECE"
];

const AddNotesModal = ({ isOpen, onClose }) => {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        branch: '',
        description: '',
        noteFile: null,
    });

    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("subject", formData.subject);
        data.append("branch", formData.branch);
        data.append("description", formData.description);
        data.append("noteFile", formData.noteFile);

        for (let [key, val] of data.entries()) {
            console.log(`${key}:`, val);
        }



        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE}/notes/upload`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // If token is in localStorage
                    },
                    withCredentials: true, // If you're using cookies for JWT
                }
            );
            setMessage("Upload successful!");
            console.log("Response:", response.data);
        } catch (error) {
            setMessage(error.response?.data?.message || "Upload failed!");
        } finally {
            setLoading(false);
        }
        setFormData({
            title: '',
            subject: '',
            branch: '',
            description: '',
            noteFile: null,
        });
        onClose();
    };


    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-6">
            <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                    aria-label="Close modal"
                >
                    <MdClose className="text-2xl" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-3 mb-6">
                    <MdNoteAdd className="text-green-600 text-3xl" />
                    <h2 className="text-2xl font-semibold text-gray-800">Add New Note</h2>
                </div>

                {message && (
                    <p className="text-center text-sm text-red-500">{message}</p>
                )}
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter note title"
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                    </div>

                    {/* Subject Dropdown */}
                    <div className="flex flex-col">
                        <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        >
                            <option value="" disabled>Select subject</option>
                            {categories.map((subject) => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>

                    {/* Branch Dropdown */}
                    <div className="flex flex-col">
                        <label htmlFor="branch" className="text-sm font-medium text-gray-700 mb-1">Branch</label>
                        <select
                            id="branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        >
                            <option value="" disabled>Select branch</option>
                            {branches.map((branch) => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Brief note description"
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
                        />
                    </div>

                    {/* File Upload */}
                    <div className="flex flex-col">
                        <label htmlFor="file" className="text-sm font-medium text-gray-700 mb-1">Upload File</label>
                        <label
                            htmlFor="noteFile"
                            className="flex items-center gap-2 bg-green-100 text-green-700 border border-dashed border-green-300 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-200 transition"
                        >
                            <MdUploadFile className="text-xl" />
                            {formData.noteFile ? formData.noteFile.name : 'Choose file'}
                        </label>
                        <input
                            id="noteFile"
                            name="noteFile"
                            type="file"
                            accept=".jpg,.png,.pdf,.doc,.docx,.txt"
                            onChange={handleChange}
                            required
                            className="hidden"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition"
                        >
                            {loading ? "Uploading..." : "Upload Notes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNotesModal;
