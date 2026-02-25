import React from "react";
import {Modal, Button, Form} from "react-bootstrap";
import "./App.css";
const initialData = {
  todo: [
    { id: 1, title: "Learn React" },
    { id: 2, title: "Build Kanban Board" }
  ],
  Progress: [
    { id: 3, title: "Practice DSA" }
  ],
  done: [
    { id: 4, title: "Setup Portfolio" }
  ]
};
sessionStorage.setItem("kanbanData", JSON.stringify(initialData));
const initialDataTreeView = [
  {
    id: 1,
    name: "Applications",
    children: [
      {
        id: 2,
        name: "Frontend",
        children: [
          { id: 3, name: "React App", children: [] },
          { id: 4, name: "Vue App", children: [] }
        ]
      },
      {
        id: 5,
        name: "Backend",
        children: [
          { id: 6, name: "Spring Boot API", children: [] }
        ]
      }
    ]
  }
];
//sessionStorage.setItem("treeViewData", JSON.stringify(initialDataTreeView));
const AddTodo = ({ show, handleClose, title, body, handleSave, todo, setTodo, handleCheckBox, checkBoxOptions, errTodo, errCheckBox, handleReset, isTreeView }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <ul className="modal-validations">
                    <li>{isTreeView ? "Node field is mandatory" : "All fields are mandatory"}</li>
                    <li>Min len 3 characters</li>
                    <li>Max len 20 characters</li>
                </ul>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-2xl">{isTreeView ? "Node Name" : "Task Title"}</Form.Label>
                        <Form.Control type="text" placeholder={isTreeView ? "Enter node name" : "Enter task title"} value={todo} onChange={(e) => setTodo(e.target.value)} />
                        {errTodo && <div className="text-danger">{errTodo}</div>}
                        {!isTreeView && (
                            <>
                                <div className="flex gap-1.5 mt-2 add-todo-checkboxes">
                                    <Form.Check
                                        type="checkbox"
                                        label="📌 ToDo"
                                        value="todo"
                                        onChange={handleCheckBox}
                                        checked={checkBoxOptions?.includes("todo")}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="⏳ Progress"
                                        value="Progress"
                                        onChange={handleCheckBox}
                                        checked={checkBoxOptions?.includes("Progress")}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="✅ Done"
                                        value="done"
                                        onChange={handleCheckBox}
                                        checked={checkBoxOptions?.includes("done")}
                                    />
                                </div>

                                {errCheckBox && (
                                    <div className="text-danger">{errCheckBox}</div>
                                )}
                            </>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <div className="add-btns-grp">
                <Button variant="success" onClick={handleSave}>
                    {isTreeView ? "Add Node" : "Save Todo"}

                </Button>
                <Button variant="danger" onClick={handleReset}>
                    Reset
                </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export { initialData, AddTodo, initialDataTreeView};