import React, { useState } from "react";
import "./TreeView.css";
import DeleteIcon from "../assets/deleteIcon.png";
import PlusIcon from "../assets/plusIcon.png";
function TreeNode({ node, addNode, deleteNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="tree-node">
      <div className="tree-node-row">
        <span
          className="tree-node-toggle"
          onClick={() => setOpen(!open)}
        >
          {node.children.length > 0 ? (open ? "▼" : "▶") : "📄"}
        </span>

        <span className="tree-node-name">{node.name}</span>
        <img src={PlusIcon} alt="Add" className="tree-node-add-icon" onClick={()=>addNode(node.id)} />

          <img src={DeleteIcon} alt="Delete" className="tree-node-delete-icon"  onClick={() => deleteNode(node.id)} />
      
      </div>

      {open &&
        node.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            addNode={addNode}
            deleteNode={deleteNode}
          />
          
        ))}
    </div>
    
  );
}

export default TreeNode;