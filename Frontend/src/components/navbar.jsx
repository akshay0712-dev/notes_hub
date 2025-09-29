import React, { useState, useEffect } from "react";
import { RiGraduationCapFill, RiAdminFill } from "react-icons/ri";
import { MdNoteAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddNotesModal from "./AddNotesModal";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const navigate = useNavigate();

    // ✅ Check login status
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsAdminLoggedIn(!!token);

        if (token) {
            console.log("✅ Access Token found:", token);
        } else {
            console.log("❌ No Access Token found");
        }
    }, []);

    const toggleModal = () => setIsModalOpen((prev) => !prev);

    // ✅ Logout or Login
    const handleAdminClick = async () => {
        if (isAdminLoggedIn) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_BASE}/admin/logout`,
                    {},
                    { withCredentials: true }
                );
                // Clear stored tokens
                ["accessToken", "refreshToken", "user"].forEach((key) =>
                    localStorage.removeItem(key)
                );
                setIsAdminLoggedIn(false);
                navigate("/");
            } catch (err) {
                console.error("Logout failed:", err);
            }
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <nav
                    className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 p-4 md:px-10"
                    role="navigation"
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-4 w-full md:w-auto">
                        <div className="bg-blue-600 text-white text-3xl p-2 rounded-xl">
                            <RiGraduationCapFill aria-hidden="true" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                ClassNotes
                            </h1>
                            <p className="text-sm md:text-base text-gray-500">
                                Classroom Notes Sharing
                            </p>
                        </div>
                    </a>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto justify-center md:justify-end">
                        {isAdminLoggedIn && (
                            <button
                                onClick={toggleModal}
                                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                                aria-label="Add a new note"
                            >
                                <MdNoteAdd className="text-xl" />
                                Add Note
                            </button>
                        )}

                        <button
                            onClick={handleAdminClick}
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label={isAdminLoggedIn ? "Admin logout" : "Admin login"}
                        >
                            <RiAdminFill className="text-lg border-[1.5px] rounded-full" />
                            {isAdminLoggedIn ? "Admin Logout" : "Admin Login"}
                        </button>
                    </div>
                </nav>
            </header>

            <AddNotesModal isOpen={isModalOpen} onClose={toggleModal} />
        </>
    );
};

export default Navbar;
