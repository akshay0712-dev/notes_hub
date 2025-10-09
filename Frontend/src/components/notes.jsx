import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, Download, CalendarDays, StickyNote, Search } from "lucide-react";
import PDFModal from "./PDFModal";
import axios from "axios";

const categories = [
  "Maths",
  "Python",
  "Web Development",
  "English",
  "Chemistry",
  "Physics",
  "Basic Electronics",
  "Basic Electrical",
  "EGD",
];

const branches = [
  "All",
  "CSE",
  "CSE AI/ML",
  "Civil",
  "Mechanical",
  "Electrical",
  "ECE",
];

function isImageFile(url) {
  return /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(url);
}

export default function Notes() {
  // filters
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [fileFilter, setFileFilter] = useState("all");

  // modal
  const [isOpen, setIsOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [isImage, setIsImage] = useState(false);

  // data
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/notes`);
        setNotes(res.data.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // ✅ Filtering
  const filtered = useMemo(() => {
    return notes
      .filter((n) =>
        selectedBranch === "All" ? true : n.branch === selectedBranch
      )
      .filter((n) =>
        selectedCategory === "All" ? true : n.subject === selectedCategory
      )
      .filter((n) => {
        if (fileFilter === "all") return true;
        return n.fileType === fileFilter;
      })
      .filter((n) => {
        if (!searchQ.trim()) return true;
        const q = searchQ.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          (n.description || "").toLowerCase().includes(q) ||
          (n.subject || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [notes, selectedBranch, selectedCategory, fileFilter, searchQ]);

  const handleView = (url, type) => {
    // console.log(url);
    
    setFileUrl(url);
    setIsImage(type === "image" || isImageFile(url));
    setIsOpen(true);
  };

  const clearFilters = () => {
    setSelectedBranch("All");
    setSelectedCategory("All");
    setSearchQ("");
    setFileFilter("all");
  };

  if (loading) return <div className="p-10 text-center">Loading notes...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="px-2 sm:px-4 md:px-10 lg:px-20 py-6 sm:py-8">
      {/* 🔍 Filters + Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">📚 Notes Library</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse notes by branch, subject or search by title.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <div className="flex items-center bg-white rounded-full shadow-sm px-3 py-2 gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search notes..."
              className="outline-none text-sm w-full sm:w-80"
            />
          </div>
          <select
            value={fileFilter}
            onChange={(e) => setFileFilter(e.target.value)}
            className="glass px-3 py-2 rounded-full text-sm"
          >
            <option value="all">All types</option>
            <option value="pdf">PDF</option>
            <option value="image">Image</option>
          </select>
          <button
            onClick={clearFilters}
            className="text-sm px-3 py-2 rounded-full bg-slate-50 hover:bg-slate-100"
          >
            Clear
          </button>
        </div>
      </div>

      {/* 🌟 Branch + Category Filters */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex gap-2 flex-wrap">
          {branches.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1.5 rounded-full text-sm ${selectedBranch === b
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 hover:bg-blue-50"
                }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-full text-sm ${selectedCategory === c
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 hover:bg-indigo-50"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 📝 Notes Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center p-6 bg-gray-50 rounded-xl">
            No notes found. Try clearing filters.
          </div>
        ) : (
          filtered.map((note, index) => (
            <motion.article
              key={note._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group bg-white border rounded-2xl shadow-sm hover:shadow-lg transition p-4"
            >
              <div className="mb-3">
                <h3 className="font-semibold text-lg flex gap-2 items-center">
                  <StickyNote className="text-blue-500" />
                  {note.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(note.createdAt).toLocaleDateString()} • {note.branch}
                </p>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{note.description}</p>
              <span className="text-xs text-indigo-600">Subject: {note.subject}</span>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleView(note.fileUrl, note.fileType)}
                  className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <Eye className="inline w-4 h-4 mr-1" /> View
                </button>
                <a
                  href={note.fileUrl}
                  download
                  className="px-3 py-1.5 text-xs bg-green-500 text-white rounded-full hover:bg-green-600"
                >
                  <Download className="inline w-4 h-4 mr-1" /> Download
                </a>
              </div>
            </motion.article>
          ))
        )}
      </div>

      <PDFModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fileUrl={fileUrl}
        isImage={isImage}
      />
    </div>
  );
}
