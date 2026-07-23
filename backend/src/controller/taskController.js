import Task from "../model/Task.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const findOwnedTask = async(taskId, userId, res) => {
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404)
            throw new Error("Task Not Found")
        }
        if (task.user.toString() !== userId) {
            res.satus(403)
            throw new Error("Not authenticated for edit the task")
        }
        return task;
    }
    // export const createTask = asyncHandler(async(req, res) => {
    //     const { title, description, dueDate, priority, category, status } = req.body

//     const taskCreated = await Task.create({
//         title,
//         description,
//         dueDate,
//         priority,
//         category,
//         status,
//         user: req.user.id
//     })
//     res.json(task);
// })

export const createTask = asyncHandler(async(req, res) => {
    const { title, description, dueDate, priority, category, status } = req.body;

    const taskCreated = await Task.create({
        title,
        description,
        dueDate,
        priority,
        category,
        status,
        user: req.user.id,
    });

    return res.status(201).json(taskCreated);
});
export const getTasks = asyncHandler(async(req, res) => {
    const { status, priority, search, sort } = req.query
    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $option: "i" }

    let sortBy = "-createdAt";
    if (sort === "oldest") sortBy = "createdAt";
    if (sorted === "dueDate") sortBy = "duedate";
    if (sort == "priority") sortBy = "priority";

    const tasks = await Task.find(query).sort(sortBy)
    res.status(200).json({
        tasks
    })

})
export const getTask = asyncHandler(async(req, res) => {
    const task = await findOwnedTask(req.params.id, req.user.id, res)
    res.status(200).json({
        task
    })

})
export const updateTask = asyncHandler(async(req, res) => {
    await findOwnedTask(req.params.id, req.user.id, res)
    const task = Task.findByIdAndUpdate(req.param.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        task
    })
})

export const deleteTask = asyncHandler(async(req, res) => {
    const task = await findOwnedTask(req.param.id, req.user.id, res)
    await task.deleteOne()
    res.status(200).json({
        message: "Task Deleted"
    })

})
export const toggleTask = asyncHandler(async(req, res) => {
    const task = await findOwnedTask(req.param.id, req.user.id, res)
    task.completed = !task.completed;
    task.status = task.completed ? "done" : "todo";

    res.status(200).json({
        message: "Task Toggled",
        task
    })

})
export const getStats = asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const total = await Task.countDocuments({ user: userId });
    const completed = await Task.countDocuments({ user: userId, completed: true })
    const pending = total - completed
    const overdue = await Task.countDocuments({
        user: userId,
        completed: false,
        dueDate: { $lt: new Date() }
    })

    res.status(200).json({
        total,
        completed,
        pending,
        overdue
    })

})

// import Task from "../model/Task.model.js";
// import asyncHandler from "../utils/asyncHandler.js";

// // Helper function
// export const findOwnedTask = async(taskId, userId, res) => {
//     const task = await Task.findById(taskId);

//     if (!task) {
//         res.status(404);
//         throw new Error("Task Not Found");
//     }

//     if (task.user.toString() !== userId.toString()) {
//         res.status(403);
//         throw new Error("Not authorized to access this task");
//     }

//     return task;
// };

// export const createTask = asyncHandler(async(req, res) => {
//     console.log("createTask started");

//     const { title, description, dueDate, priority, category, status } = req.body;

//     console.log(req.body);
//     console.log(req.user);

//     const task = await Task.create({
//         title,
//         description,
//         dueDate,
//         priority,
//         category,
//         status,
//         user: req.user._id,
//     });

//     console.log("Task created:", task);

//     return res.status(201).json(task);
// });
// // Get All Tasks
// export const getTasks = asyncHandler(async(req, res) => {
//     const { status, priority, search, sort } = req.query;

//     const query = {
//         user: req.user._id,
//     };

//     if (status) query.status = status;
//     if (priority) query.priority = priority;

//     if (search) {
//         query.title = {
//             $regex: search,
//             $options: "i",
//         };
//     }

//     let sortBy = "-createdAt";

//     if (sort === "oldest") sortBy = "createdAt";
//     if (sort === "dueDate") sortBy = "dueDate";
//     if (sort === "priority") sortBy = "priority";

//     const tasks = await Task.find(query).sort(sortBy);

//     res.status(200).json({
//         success: true,
//         count: tasks.length,
//         tasks,
//     });
// });

// // Get Single Task
// export const getTask = asyncHandler(async(req, res) => {
//     const task = await findOwnedTask(req.params.id, req.user._id, res);

//     res.status(200).json({
//         success: true,
//         task,
//     });
// });

// // Update Task
// export const updateTask = asyncHandler(async(req, res) => {
//     await findOwnedTask(req.params.id, req.user._id, res);

//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.status(200).json({
//         success: true,
//         message: "Task Updated Successfully",
//         task,
//     });
// });

// // Delete Task
// export const deleteTask = asyncHandler(async(req, res) => {
//     const task = await findOwnedTask(req.params.id, req.user._id, res);

//     await task.deleteOne();

//     res.status(200).json({
//         success: true,
//         message: "Task Deleted Successfully",
//     });
// });

// // Toggle Task
// export const toggleTask = asyncHandler(async(req, res) => {
//     const task = await findOwnedTask(req.params.id, req.user._id, res);

//     task.completed = !task.completed;
//     task.status = task.completed ? "done" : "todo";

//     await task.save();

//     res.status(200).json({
//         success: true,
//         message: "Task Status Updated",
//         task,
//     });
// });

// // Dashboard Stats
// export const getStats = asyncHandler(async(req, res) => {
//     const userId = req.user._id;

//     const total = await Task.countDocuments({ user: userId });

//     const completed = await Task.countDocuments({
//         user: userId,
//         completed: true,
//     });

//     const pending = total - completed;

//     const overdue = await Task.countDocuments({
//         user: userId,
//         completed: false,
//         dueDate: { $lt: new Date() },
//     });

//     res.status(200).json({
//         success: true,
//         total,
//         completed,
//         pending,
//         overdue,
//     });
// });