import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL;

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '' });

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get(`${backendUrl}/notes`);
        setNotes(response.data);
    };

    const addNote = async () => {
        if (!newNote.title || !newNote.content) return;
        await axios.post(`${backendUrl}/notes`, newNote);
        setNewNote({ title: '', content: '' });
        fetchNotes();
    };

    const deleteNote = async (id) => {
        await axios.delete(`${backendUrl}/notes/${id}`);
        fetchNotes();
    };

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <input type="text" placeholder="Title" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })}/>
                <textarea placeholder="Content" value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })}/>
                <button onClick={addNote}>Add Note</button>
            </div>
            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <button onClick={() => deleteNote(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;