import React, { useState, useEffect } from "react";
import "./KanbanBoard.css";
import { initialData } from "../ReusableMethodsAndModals";
import DeleteIcon from "../assets/deleteIcon.png";
import EditIcon from "../assets/editIcon.png";
 import  Add  from "../assets/addTodoIcon.png";
import { AddTodo ,EditTodo } from "../ReusableMethodsAndModals";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function KanbanBoard() {
    const [board, setBoard] = useState(initialData);
    const [todo, setTodo] = useState("");
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
        if(checkBoxOptions.length > 1) {
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
        else if(checkBoxOptions.length === 0) {
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

    const handleDeleteTask = (taskId, column) => {
        setBoard(prev => ({
            ...prev,
            [column]: prev[column].filter(task => task.id !== taskId)
        }));
    }

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
                           {column === "todo" && 
                           <img src={Add} alt="add" className="add-icon" onClick={() => setShowAddModal(true)} />
                     }
                        </div>
                        {board[column].map((task) => (
                            <div className="tasks">
                                <div
                                    key={task.id}
                                    className="task"
                                    draggable
                                    onDragStart={(e) => onDragStart(e, task, column)}
                                    style={{ backgroundColor: getColor(column),color: column === "Progress" ? "black" : "white" }}
                                >
                                    {task.title}
                                    <div className="icons">
                                        <img src={DeleteIcon} alt="delete" className="icon" onClick={() => handleDeleteTask(task.id, column)}/>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                ))}
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