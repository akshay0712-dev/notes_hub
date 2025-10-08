import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// CORS configuration
// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://notes-hub-inky.vercel.app"
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import healthcheckRouter from "./routes/healthcheck.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import noteRoutes from "./routes/note.routes.js"

//routes declaration
app.use("/api/healthcheck", healthcheckRouter)
app.use("/api/admin", adminRoutes);
app.use("/api/notes", noteRoutes);

// http://localhost:8000/api/users/register

export { app }