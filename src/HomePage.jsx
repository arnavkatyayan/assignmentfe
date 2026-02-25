import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center gap-7">
            <div className="tree-view-comp tree-view-bg">
                <h4>Tree View (Ques1)</h4>
                <Button variant="primary" onClick={() => navigate("/treeview")}>Go to Tree View</Button>
            </div>
            <div className="kanban-board-comp kanban-board-bg">
                <h4>Kanban Board (Ques2)</h4>
                <Button variant="success" onClick={() => navigate("/kanban")}>Go to Kanban Board</Button>
            </div>
        </div>
    )

}

export default HomePage;