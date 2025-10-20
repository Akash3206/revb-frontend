import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CapsuleGrid from '../components/CapsuleGrid';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [subjects, setSubjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const navigate = useNavigate();

    // Load subjects when page opens
    useEffect(() => {
        loadSubjects();
    }, []);

    async function loadSubjects() {
        try {
            const res = await api.get('/api/subjects');
            setSubjects(res.data || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function addSubject() {
        if (!subjectName.trim()) return;
        try {
            const res = await api.post('/api/subjects', { name: subjectName });
            setSubjects((prev) => [...prev, res.data]); // keep insertion order
            setSubjectName('');
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Main Subjects</h1>

            <CapsuleGrid
                items={subjects}
                onItemClick={(subject) => navigate(`/subtopics/${subject.id}`)}
                onInsertClick={() => setShowForm((v) => !v)}
                label="Insert Subject"
            />

            {showForm && (
                <div className="mt-4 max-w-md">
                    <input
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700"
                        placeholder="Enter subject name"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={addSubject}
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
        </div>
    );
}
