import { useState } from "react";

function TaskModal({ task, onClose, onSave }) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(
        task?.description || ""
    );
    const [dueDate, setDueDate] = useState(
        task?.dueDate
            ? task.dueDate.substring(0, 10)
            : ""
    );
    const [priority, setPriority] = useState(
        task?.priority || "medium"
    );
    const [category, setCategory] = useState(
        task?.category || "general"
    );
    const [status, setStatus] = useState(
        task?.status || "TO-DO"
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            title,
            description,
            dueDate,
            priority,
            category,
            status,
        });
    };

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    {task ? "Edit Task" : "Create Task"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                    />

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option value="low">
                            Low
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>
                    </select>

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="TO-DO">
                            To Do
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Done">
                            Done
                        </option>
                    </select>

                    <div className="modal-buttons">

                        <button type="submit">
                            {task ? "Update Task" : "Create Task"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default TaskModal;