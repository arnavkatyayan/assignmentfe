import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import KanbanBoard from "./KanbanBoard (Ques-2)/KanbanBoard";
import HomePage from "./HomePage";
import TreeView from "./TreeView (Ques-1)/TreeView";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/treeview" element={<TreeView />} />
        </Routes>
      </div>
    </Router>
  );
}