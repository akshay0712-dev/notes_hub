// import admin from "firebase-admin";
// import path from "path";
// import { fileURLToPath } from "url";

// // Fix __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Path to your service account key
// const serviceAccount = path.join(__dirname, "../config/firebase-key.json");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "notes-5748b.appspot.com", // Replace with your Firebase bucket
//   });
// }

// const bucket = admin.storage().bucket();

// export const uploadFileToFirebase = async (filePath, destination) => {
//   try {
//     const [uploadedFile] = await bucket.upload(filePath, {
//       destination,
//       metadata: {
//         contentType: destination.endsWith(".pdf")
//           ? "application/pdf"
//           : "image/jpeg",
//       },
//     });
//     // Make file public
//     await uploadedFile.makePublic();
//     return `https://storage.googleapis.com/${bucket.name}/${uploadedFile.name}`;
//   } catch (error) {
//     console.error("Firebase upload error:", error);
//     throw new Error("File upload failed");
//   }
// };
