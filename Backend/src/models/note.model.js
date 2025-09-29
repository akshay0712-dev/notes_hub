import e from "express";
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        // date: {
        //     type: Date,
        //     required: true
        // },
        subject: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            enum: ["CSE", "CSE AI/ML", "Civil", "Mechanical", "Electrical", "ECE"],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String, //cloudinary url
            required: true
        },
        fileType: {
           type: String, // "pdf" | "image"
            required: true
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(mongooseAggregatePaginate);

export const Note = mongoose.model("Note", noteSchema);



//   {
//     id: 1,
//     title: "Algebra Basics",
//     date: "2024-06-01",
//     subject: "Maths",
//     branch: "CSE",
//     desc: "Quick overview of algebra fundamentals and problem-solving patterns.",
//     fileUrl: "/series.pdf",
//     type: "pdf",
//   }, 
