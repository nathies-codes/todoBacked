import express from "express";
import { createZodSchema, updateZodSchema } from "./zodSchema.js";
import { Todo } from "./mongoSchema.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/todos", async function(req, res) {
    const createTodoPayload = req.body;

    const createValidation = createZodSchema.safeParse(createTodoPayload);

    if(!createValidation.success) {
        return res.status(400).json({
            msg: `Invalid Inputs`,
            errors: createValidation.error.errors
        })
    }

    const validCreateInput = createValidation.data;

    await Todo.create({
        title: validCreateInput.title,
        description: validCreateInput.description
    })

    return res.status(201).json({
        msg: `Todo created Successfully`
    })
})

app.get("/todos", async function(req, res){
    const displayTodos = await Todo.find({});

    return res.status(200).json({
        displayTodos: displayTodos
    })
})

app.put("/todos", async function(req, res){
    const updatePayload = req.body;

    const updateValidationResult = updateZodSchema.safeParse(updatePayload);

    if(!updateValidationResult.success) {
        return res.status(400).json({
            msg: `Invalid Update Inputs`,
            errors: updateValidationResult.error.errors
        })
    }

    const updateValidInput = updateValidationResult.data;

    await Todo.updateOne(
        {
            _id: updateValidInput.id
        },
        {
            isCompleted: true
        }
    )

    return res.status(200).json({
        msg: `The Todo ${updateValidInput.id} is completed`
    })
})
 
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
})