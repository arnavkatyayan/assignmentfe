import React, { useState, useEffect } from "react";
import "./KanbanBoard.css";
import { initialData } from "../ReusableMethodsAndModals";
import DeleteIcon from "../assets/deleteIcon.png";
import EditIcon from "../assets/editIcon.png";
import Add from "../assets/addTodoIcon.png";
import { AddTodo } from "../ReusableMethodsAndModals";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
export default function KanbanBoard() {
    //const [board, setBoard] = useState(initialData);
    const [board, setBoard] = useState(() => {
        const savedBoard = sessionStorage.getItem("kanbanBoard");
        return savedBoard ? JSON.parse(savedBoard) : initialData;
    }); const [todo, setTodo] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [errTodoMessage, setErrTodoMessage] = useState("");
    const [checkBoxOptions, setCheckBoxOptions] = useState([]);
    const [errCheckBoxMessage, setErrCheckBoxMessage] = useState("");
    const onDragStart = (e, task, fromColumn) => {
        e.dataTransfer.setData("task", JSON.stringify(task));
        e.dataTransfer.setData("fromColumn", fromColumn);
    };

    const onDrop = (e, toColumn) => {
        const task = JSON.parse(e.dataTransfer.getData("task"));
        const fromColumn = e.dataTransfer.getData("fromColumn");

        if (fromColumn === toColumn) return;

        setBoard((prev) => {
            const newFrom = prev[fromColumn].filter((t) => t.id !== task.id);
            const newTo = [...prev[toColumn], task];

            return {
                ...prev,
                [fromColumn]: newFrom,
                [toColumn]: newTo
            };
        });
    };

    const handleTodo = (evt) => {
        setTodo(evt.target.value);
    }

    const handleCheckBox = (evt) => {
        const value = evt.target.value;
        console.log(value);
        setCheckBoxOptions(prev => {
            if (prev.includes(value)) {
                return prev.filter(v => v !== value);
            } else {
                return [...prev, value];
            }
        });
    }

    useEffect(() => {
        if (checkBoxOptions.length > 1) {
            setErrCheckBoxMessage("Please select only one checkbox");
        }
        else {
            setErrCheckBoxMessage("");
        }
    }, [checkBoxOptions]);

    const handleSaveAddTodo = () => {
        if (todo.trim() === "" && checkBoxOptions.length === 0) {
            setErrTodoMessage("This is a mandatory field");
            setErrCheckBoxMessage("At least one checkbox must be selected");
            return;
        }
        else if (todo.trim().length < 3 || todo.trim().length > 20) {
            setErrTodoMessage("Task title must be between 3 and 20 characters");
            return;
        }
        else if (checkBoxOptions.length === 0) {
            setErrCheckBoxMessage("At least one checkbox must be selected");
            return;
        }
        const newTask = {
            id: Date.now(),
            title: todo

        }
        for (let column of checkBoxOptions) {
            setBoard(prev => ({
                ...prev,
                [column]: [...prev[column], newTask]
            }));
        }
        setShowAddModal(false);
        setTodo("");
        setCheckBoxOptions([]);
        setErrTodoMessage("");
        setErrCheckBoxMessage("");
    }

    const handleResetAddTodo = () => {
        setTodo("");
        setCheckBoxOptions([]);
        setErrTodoMessage("");
        setErrCheckBoxMessage("");
    }

    useEffect(() => {
        sessionStorage.setItem("kanbanBoard", JSON.stringify(board));
    }, [board]);

    const handleDeleteTask = async (taskId, column) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This task will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            setBoard(prev => ({
                ...prev,
                [column]: prev[column].filter(task => task.id !== taskId)
            }));

            Swal.fire("Deleted!", "Task has been deleted.", "success");
        }
    };

    const allowDrop = (e) => e.preventDefault();

    const getColor = (column) => {
        switch (column) {
            case "todo":
                return "red";
            case "Progress":
                return "yellow";
            case "done":
                return "green";
            default:
                return "";
        }
    };

    const handleResetBoard = () => {


        const emptyBoard = {
            todo: [],
            Progress: [],
            done: []
        };

        setBoard(emptyBoard);
        sessionStorage.removeItem("kanbanBoard");
    };

    const handleSaveEditTodo = () => {
        if (todo.trim() === "") {
            setErrTodoMessage("This is a mandatory field");
            return;
        }
        else if (todo.trim().length < 3 || todo.trim().length > 20) {
            setErrTodoMessage("Task title must be between 3 and 20 characters");
            return;
        }
        setBoard(prev => {
            const newColumn = checkBoxOptions[0];
            const oldColumn = Object.keys(prev).find(column => prev[column].some(task => task.id === currentEditTask.id));
            return {
                ...prev,
                [oldColumn]: prev[oldColumn].filter(task => task.id !== currentEditTask.id),
                [newColumn]: [...prev[newColumn], { ...currentEditTask, title: todo }]
            };
        });
        setShowEditModal(false);
        setTodo("");
        setCheckBoxOptions([]);
        setErrTodoMessage("");
        setErrCheckBoxMessage("");
    }

    return (

        <div className="kanban-board-main">
            <h1 className="text-2xl font-bold">Kanban Board</h1>
            <ul className="instructions">
                <li>1) Drag and drop tasks between columns <span className="font-bold">(Some tasks are added as sample).</span></li>
                <li>2) Click the button at the bottom to add a new task</li>
                <li>3) Click the delete icon on a task to delete it</li>
                <li>4) Color coding for different columns</li>
                <li>5) Maintaining Session Storage for board data</li>
                <li>6) Reset button to clear the board</li>
            </ul>
            <div className="board-container">
                <div className="board">
                    {Object.keys(board).map((column) => (
                        <div
                            key={column}
                            className="column"
                            onDragOver={allowDrop}
                            onDrop={(e) => onDrop(e, column)}
                        >
                            <div className="headers">
                                <div className={"circle"} style={{ backgroundColor: getColor(column) }}></div>
                                <h2>{column.toUpperCase()}</h2>

                            </div>
                            {board[column].map((task) => (
                                <div className="tasks">
                                    <div
                                        key={task.id}
                                        className="task"
                                        draggable
                                        onDragStart={(e) => onDragStart(e, task, column)}
                                        style={{ backgroundColor: getColor(column), color: column === "Progress" ? "black" : "white" }}
                                    >
                                        {task.title}
                                        <div className="icons">
                                            <button onClick={() => handleDeleteTask(task.id, column)}>🗑</button>
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>
                    ))}

                </div>
                <div className="flex gap-4.5">
                    <Button variant="success" className="add-btn" onClick={() => setShowAddModal(true)}>Add Task</Button>
                    <Button variant="danger" className="reset-btn" onClick={() => handleResetBoard()}>Reset Board</Button>
                </div>
            </div>
            <AddTodo
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                title="Add Task"
                todo={todo}
                setTodo={setTodo}
                handleCheckBox={handleCheckBox}
                checkBoxOptions={checkBoxOptions}
                handleSave={handleSaveAddTodo}
                handleReset={handleResetAddTodo}
                errCheckBox={errCheckBoxMessage}
                errTodo={errTodoMessage}
            />

        </div>

    );
}