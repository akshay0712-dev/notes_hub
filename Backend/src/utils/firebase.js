import fs from "fs";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// Handle ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase once
if (!admin.apps.length) {
  const serviceAccountPath = path.join(__dirname, "../config/firebase-key.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    storageBucket: process.env.FIREBASE_BUCKET_URL, // e.g. "notes2.appspot.com"
  });
}

const bucket = admin.storage().bucket();

export const uploadOnFirebase = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Generate unique filename in bucket
    const destination = `uploads/${Date.now()}-${path.basename(localFilePath)}`;

    // Upload to Firebase
    const [file] = await bucket.upload(localFilePath, {
      destination,
      metadata: {
        contentType: path.extname(localFilePath) === ".pdf"
          ? "application/pdf"
          : "image/jpeg", // Simple check; can expand
      },
    });

    // Make file public
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    // Remove local file
    fs.unlinkSync(localFilePath);

    return { url: publicUrl };
  } catch (error) {
    console.error("Firebase upload error:", error);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};
