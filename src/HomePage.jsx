import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center gap-7">
            <div className="tree-view-comp tree-view-bg">

                <h3>🌳 Tree View (Ques 1)</h3>

                <h5>Features:</h5>
                <ul>
                    <li>Displays hierarchical data in an expandable and collapsible tree structure.</li>
                    <li>Supports adding new nodes dynamically at any level.</li>
                    <li>Allows deleting any node along with its child nodes.</li>
                    <li>Maintains tree state using Session Storage to persist data on refresh.</li>
                    <li>Clean and intuitive UI with visual indicators for folders and leaf nodes.</li>
                    <li>Recursive rendering of nested tree nodes for scalability.</li>
                </ul>

                <h5>Tech Stack:</h5>
                <ul className="home-page-headers">
                    <li><span>Frontend</span>: React.js (Functional Components, Hooks)</li>
                    <li><span>State Management</span>: useState, useEffect</li>
                    <li><span>Storage</span>: Session Storage</li>
                    <li><span>Styling</span>: CSS, Flexbox</li>
                    <li><span>Routing</span>: React Router DOM</li>
                    <li><span>UI Components</span>: React Bootstrap</li>
                </ul>

                <hr />



                <Button variant="primary" onClick={() => navigate("/treeview")}>Go to Tree View</Button>
            </div>
            <div className="kanban-board-comp kanban-board-bg">
                <h3>📋 Kanban Board (Ques 2)</h3>

                <h5>Features:</h5>
                <ul>
                    <li>Drag and drop tasks across columns (ToDo, Progress, Done).</li>
                    <li>Add new tasks using a modal form with validations.</li>
                    <li>Delete tasks with confirmation alerts.</li>
                    <li>Color-coded columns for better visual distinction.</li>
                    <li>Reset board functionality to clear all tasks.</li>
                    <li>Session Storage integration to retain board state on page refresh.</li>
                </ul>

                <h5>Tech Stack:</h5>
                <ul className="home-page-headers">
                    <li><span>Frontend</span>: React.js (Functional Components, Hooks)</li>
                    <li><span>State Management</span>: useState, useEffect</li>
                    <li><span>Storage</span>: Session Storage</li>
                    <li><span>Styling</span>: CSS, Flexbox</li>
                    <li><span>UI Components</span>: React Bootstrap</li>
                    <li><span>Alerts & Modals</span>: SweetAlert2, React Bootstrap Modal</li>
                    <li><span>Routing</span>: React Router DOM</li>
                </ul>
                
                <hr/>
                <Button variant="success" onClick={() => navigate("/kanban")}>Go to Kanban Board</Button>
            </div>
        </div>
    )

}

export default HomePage;