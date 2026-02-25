import React, { useState, useEffect } from "react";
import TreeNode from "./TreeNode";
import { AddTodo, initialDataTreeView } from "../ReusableMethodsAndModals";
import Swal from "sweetalert2";

export default function TreeView() {
    const [treeData, setTreeData] = useState(() => {
        const saved = sessionStorage.getItem("treeViewData");
        return saved ? JSON.parse(saved) : initialDataTreeView;
    });
    const [name, setName] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [errNameMessage, setErrNameMessage] = useState("");
    const [currentNodeId, setCurrentNodeId] = useState(null);
    const handleReset = () => {
        setName("");
        setErrNameMessage("");
    }
    const addNode = (id) => {
        setShowAddModal(true);
        setCurrentNodeId(id);
    };

    useEffect(() => {
        sessionStorage.setItem("treeViewData", JSON.stringify(treeData));
    }, [treeData]);

    const handleSave = () => {
        if (name.trim() === "") {
            setErrNameMessage("Name cannot be empty");
            return;
        }       
        const newNode = {
            id: Date.now(),
            name,
            children: []
        };

        const updateTree = (nodes) =>
            nodes.map((node) => {
                if (node.id === currentNodeId) {
                    return { ...node, children: [...node.children, newNode] };
                }
                return {
                    ...node,
                    children: updateTree(node.children)
                };
            });

        setTreeData(updateTree(treeData));
        setShowAddModal(false);
        setName("");
        setErrNameMessage("");
    };

const deleteNode = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will delete the node and all its children!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    const removeNode = (nodes) =>
      nodes
        .filter((node) => node.id !== id)
        .map((node) => ({
          ...node,
          children: removeNode(node.children),
        }));

    setTreeData(removeNode(treeData));

    Swal.fire("Deleted!", "Node has been deleted.", "success");
  }
};

    return (
        <div style={{ padding: "20px" }}>
            <div className="tree-view-main tree-view-width">
            <h2>📁 Tree View</h2>
            {treeData.map((node) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    addNode={addNode}
                    deleteNode={deleteNode}
                />
            ))}
            <AddTodo show={showAddModal} title="Add New Node" setName={setName} name={name} errTodo={errNameMessage} handleClose={() => setShowAddModal(false)} isTreeView={true} todo={name} setTodo={setName} handleSave={handleSave} handleReset={handleReset} />
        </div>
        </div>

    );
}