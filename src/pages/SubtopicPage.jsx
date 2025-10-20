import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import CapsuleGrid from "../components/CapsuleGrid.jsx";
import StickyTable from "../components/StickyTable.jsx";

export default function SubtopicPage() {
    const { subjectId } = useParams();
    const [subtopics, setSubtopics] = useState([]);
    const [links, setLinks] = useState([]);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [subName, setSubName] = useState("");
    const [linkForm, setLinkForm] = useState({ title: "", description: "", url: "" });

    // Modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", description: "", url: "" });

    useEffect(() => {
        loadSubtopics();
    }, []);

    async function loadSubtopics() {
        try {
            const res = await api.get(`/api/subtopics/${subjectId}`);
            setSubtopics(res.data || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function addSubtopic() {
        if (!subName.trim()) return;
        try {
            const res = await api.post(`/api/subtopics/${subjectId}`, { name: subName });
            setSubtopics((prev) => [...prev, res.data]);
            setSubName("");
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    }

    async function openSubtopic(sub) {
        setSelectedSubtopic(sub);
        try {
            const res = await api.get(`/api/links/${sub.id}`);
            setLinks(res.data || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function addLink() {
        if (!selectedSubtopic) return;
        if (!linkForm.title.trim() || !linkForm.url.trim()) return;
        try {
            const res = await api.post(`/api/links/${selectedSubtopic.id}`, linkForm);
            setLinks((prev) => [...prev, res.data]);
            setLinkForm({ title: "", description: "", url: "" });
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteLink(id) {
        if (!window.confirm("Are you sure you want to delete this link?")) return;
        try {
            await api.delete(`/api/links/${id}`);
            setLinks((prev) => prev.filter((l) => l.id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    function openEditModal(link) {
        setEditingLink(link);
        setEditForm({ title: link.title, description: link.description, url: link.url });
        setEditModalOpen(true);
    }

    async function saveEdit() {
        try {
            const res = await api.put(`/api/links/${editingLink.id}`, editForm);
            setLinks((prev) => prev.map((l) => (l.id === editingLink.id ? res.data : l)));
            setEditModalOpen(false);
            setEditingLink(null);
        } catch (err) {
            console.error("Edit failed:", err);
        }
    }

    // 🕒 Format createdAt date
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // 🧾 Columns + Rows
    const cols = ["S.No", "Created At", "Title", "Description", "Link", "Actions"];
    const rows = links.map((l, i) => [
        i + 1,
        formatDate(l.dateAdded),
        l.title,
        l.description,
        <a
            key={i}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
        >
            Open
        </a>,
        <div key={`actions-${i}`} className="flex gap-2">
            <button
                onClick={() => openEditModal(l)}
                className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                Edit
            </button>
            <button
                onClick={() => deleteLink(l.id)}
                className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
                Delete
            </button>
        </div>,
    ]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Subtopics</h2>

            <CapsuleGrid
                items={subtopics}
                onItemClick={openSubtopic}
                onInsertClick={() => setShowForm((v) => !v)}
                label="Insert Subtopic"
            />

            {showForm && (
                <div className="mt-4 max-w-md">
                    <input
                        value={subName}
                        onChange={(e) => setSubName(e.target.value)}
                        className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700"
                        placeholder="Subtopic name"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={addSubtopic}
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {selectedSubtopic && (
                <div className="mt-6">
                    <h3 className="font-medium mb-2">
                        Links under "<span className="font-semibold">{selectedSubtopic.name}</span>"
                    </h3>

                    <div className="max-w-2xl bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                placeholder="Title"
                                value={linkForm.title}
                                onChange={(e) =>
                                    setLinkForm({ ...linkForm, title: e.target.value })
                                }
                                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                            />
                            <input
                                placeholder="URL"
                                value={linkForm.url}
                                onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                            />
                        </div>
                        <textarea
                            placeholder="Description"
                            value={linkForm.description}
                            onChange={(e) =>
                                setLinkForm({ ...linkForm, description: e.target.value })
                            }
                            className="w-full mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={addLink}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Add Link
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <StickyTable columns={cols} rows={rows} />
                    </div>
                </div>
            )}

            {/* 🟣 Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Link</h2>
                        <input
                            placeholder="Title"
                            value={editForm.title}
                            onChange={(e) =>
                                setEditForm({ ...editForm, title: e.target.value })
                            }
                            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
                        />
                        <input
                            placeholder="URL"
                            value={editForm.url}
                            onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
                        />
                        <textarea
                            placeholder="Description"
                            value={editForm.description}
                            onChange={(e) =>
                                setEditForm({ ...editForm, description: e.target.value })
                            }
                            className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-700"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
