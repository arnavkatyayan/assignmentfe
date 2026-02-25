import React, { useState } from "react";
import TreeNode from "./TreeNode";
const initialData = [
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

export default function TreeView() {
  const [treeData, setTreeData] = useState(initialData);

  // Add node
  const addNode = (id) => {
    const name = prompt("Enter node name");
    if (!name) return;

    const newNode = {
      id: Date.now(),
      name,
      children: []
    };

    const updateTree = (nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return { ...node, children: [...node.children, newNode] };
        }
        return {
          ...node,
          children: updateTree(node.children)
        };
      });

    setTreeData(updateTree(treeData));
  };

  // Delete node
  const deleteNode = (id) => {
    const removeNode = (nodes) =>
      nodes
        .filter((node) => node.id !== id)
        .map((node) => ({
          ...node,
          children: removeNode(node.children)
        }));

    setTreeData(removeNode(treeData));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📁 Tree View</h2>
      {treeData.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          addNode={addNode}
          deleteNode={deleteNode}
        />
      ))}
    </div>
  );
}