import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Note } from "../models/note.model.js";
// import { uploadOnFirebase } from "../utils/firebase.js";

const uploadNotes = asyncHandler(async (req, res) => {

  //get notes data from frontend
  // validate - data fields not empty
  // upload on cloudnary
  // save in db
  // check for note creation success
  // return response

  const { title, subject, branch, description } = req.body

  if (
    [title, subject, branch, description].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.files?.noteFile?.[0]);



  // Check file
  const noteFile = req.files?.noteFile?.[0];
  if (!noteFile?.path) {
    throw new ApiError(400, "NoteFile is required");
  }

  // Upload to Cloudinary
  const uploadedFile = await uploadOnCloudinary(noteFile.path);
  if (!uploadedFile) {
    throw new ApiError(400, "File upload failed");
  }
  const fileType = uploadedFile.resource_type === "image" ? "image" : "pdf"

  const newNote = await Note.create({
    title,
    subject,
    branch,
    description,
    fileUrl: uploadedFile.secure_url,
    fileType
  })

  const createdNote = await Note.findById(newNote._id)

  if (!createdNote) {
    throw new ApiError(500, "Something went wrong while creating notes")
  }

  return res.status(201).json(
    new ApiResponse(200, createdNote, "Notes created Successfully")
  )
})


// 📄 Get Single Note
const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Note ID");

  const note = await Note.findById(id);
  if (!note) throw new ApiError(404, "Note not found");

  res.status(200).json(new ApiResponse(200, note, "Note fetched successfully"));
});

// ✏️ Update Note
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, subject, branch, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Note ID");

  const note = await Note.findById(id);
  if (!note) { throw new ApiError(404, "Note not found") }
  else {
    console.log("Note found:", note);
  }

  // Update file if new file uploaded
  let fileUrl = note.fileUrl;
  let fileType = note.fileType;
  if (req.files?.noteFile?.[0]?.path) {
    const uploadedFile = await uploadOnCloudinary(req.files.noteFile[0].path);
    fileUrl = uploadedFile.secure_url;
    fileType = uploadedFile.resource_type === "image" ? "image" : "pdf";
  }

  note.title = title || note.title;
  note.subject = subject || note.subject;
  note.branch = branch || note.branch;
  note.description = description || note.description;
  note.fileUrl = fileUrl;
  note.fileType = fileType;

  await note.save();
  res.status(200).json(new ApiResponse(200, note, "Note updated successfully"));
});

// 🗑️ Delete Note
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Note ID");

  const note = await Note.findByIdAndDelete(id);
  if (!note) throw new ApiError(404, "Note not found");

  res.status(200).json(new ApiResponse(200, {}, "Note deleted successfully"));
});

const getNotes = asyncHandler(async (req, res) => {
  const { branch, subject, search } = req.query;

  const filter = {};
  if (branch) filter.branch = branch;
  if (subject) filter.subject = subject;
  if (search) filter.title = { $regex: search, $options: "i" };

  const notes = await Note.find(filter).sort({ createdAt: -1 });

  if (!notes.length) {
    throw new ApiError(404, "No notes found for the given criteria");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

export {
  uploadNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNotes
};


// /api/notes?branch=CSE → Filters by branch
// /api/notes?subject=Maths → Filters by subject
// /api/notes?branch=CSE&subject=Maths → Filters by both
// /api/notes → Returns all notes (no filter applied)