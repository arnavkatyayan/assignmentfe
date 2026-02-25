import React, { useState } from "react";


function TreeNode({ node, addNode, deleteNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginLeft: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
          {node.children.length > 0 ? (open ? "▼" : "▶") : "📄"}
        </span>

        <span>{node.name}</span>

        <button onClick={() => addNode(node.id)}>➕</button>
        <button onClick={() => deleteNode(node.id)}>🗑</button>
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
} export default TreeNode;