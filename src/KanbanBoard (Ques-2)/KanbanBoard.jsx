import React, { useState } from "react";
import "./KanbanBoard.css";
import { initialData } from "./ReusableMethodsAndModals";


export default function KanbanBoard() {
  const [board, setBoard] = useState(initialData);

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

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="board">
      {Object.keys(board).map((column) => (
        <div
          key={column}
          className="column"
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, column)}
        >
          <h2>{column.toUpperCase()}</h2>

          {board[column].map((task) => (
            <div
              key={task.id}
              className="task"
              draggable
              onDragStart={(e) => onDragStart(e, task, column)}
            >
              {task.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}