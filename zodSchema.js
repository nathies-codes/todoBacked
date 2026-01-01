import {z} from "zod";

const titleZodSchema = z
    .string()
    .trim()
    .min(1, `Title cannot be empty`)
    .max(50, `Title cannot exceed 20 characters`)

const descriptionZodSchema = z
    .string()
    .trim()
    .max(200, `Description cannot exceed 200 characters`)

const isCompletedZodSchema = z
    .boolean()
    .default(false)

const todoIdZodSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, `Invalid Todo Id`);

const createZodSchema = z.object({
    title: titleZodSchema,
    description: descriptionZodSchema.optional()
}).strict(); 

const updateZodSchema = z.object({
    id: todoIdZodSchema,
    title: titleZodSchema.optional(),
    description: descriptionZodSchema.optional(),
    isCompleted: isCompletedZodSchema.optional()
}).strict();

export {
    createZodSchema,
    updateZodSchema
}