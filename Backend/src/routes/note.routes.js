import {
  uploadNotes,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

// Notes Routes

router.route("/upload").post(
  verifyAdminJWT,
  upload.fields([
    {
      name: "noteFile",
      maxCount: 1,
    },
  ]),
  uploadNotes
); // POST /api/notes

router.route("/").get(getNotes); // GET /api/notes?branch=CSE&subject=Math
router.route("/:id").get(getNoteById);  // GET /api/notes/:id

router.route("/:id").put(
  verifyAdminJWT,
  upload.fields([{ name: "noteFile", maxCount: 1 }]),
  updateNote
)// PUT /api/notes/:id


router.route("/:id").delete(
  verifyAdminJWT,
  deleteNote
); // DELETE /api/notes/:id

export default router;
