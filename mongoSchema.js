import mongoose from "mongoose"
import { maxLength, minLength } from "zod";

mongoose.connect("");

const titleSchmea = {
    type: String,
    trim: true,
    minLength: [1, `Title cannot be empty`],
    maxLength: [50, `Title cannot exceed 20 characters`],
    required: true
}

const descriptionSchema = {
    type: String,
    trim: true,
    maxLength: [200, `Description cannot exceed 200 characters`]
}

const isCompletedSchema = {
    type: Boolean,
    default: false
}

const todoSchema = new mongoose.Schema(
    {   
        title: titleSchmea,
        description: descriptionSchema,
        isCompleted: isCompletedSchema
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model("Todo", todoSchema)

export {Todo}
