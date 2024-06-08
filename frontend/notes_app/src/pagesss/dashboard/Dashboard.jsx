// Dashboard.jsx
import React, { useState } from 'react';

const Dashboard = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [viewingNote, setViewingNote] = useState(null);

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
    setIsEditingNote(null);
    setViewingNote(null);
  };

  const handleNoteSubmit = () => {
    const newNote = {
      id: Date.now(),
      title: noteTitle,
      description: noteDescription,
      body: noteBody,
    };
    setNotes([...notes, newNote]);
    setIsAddingNote(false);
    setNoteTitle('');
    setNoteDescription('');
    setNoteBody('');
  };

  const handleEditClick = (note) => {
    setIsEditingNote(note.id);
    setNoteTitle(note.title);
    setNoteDescription(note.description);
    setNoteBody(note.body);
  };

  const handleEditSubmit = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, title: noteTitle, description: noteDescription, body: noteBody } : note));
    setIsEditingNote(null);
    setNoteTitle('');
    setNoteDescription('');
    setNoteBody('');
  };

  const handleDeleteClick = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleCancelClick = () => {
    setIsAddingNote(false);
    setIsEditingNote(null);
    setViewingNote(null);
    setNoteTitle('');
    setNoteDescription('');
    setNoteBody('');
  };

  const handleViewClick = (note) => {
    setViewingNote(note);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-end">
        <button
          onClick={handleAddNoteClick}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <span className="text-xl">+</span>
        </button>
      </div>
      {isAddingNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 border border-gray-300 rounded-md w-96">
            <h2 className="text-xl font-bold mb-2">Add New Note</h2>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder="Description"
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
            />
            <textarea
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder="Body"
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleNoteSubmit}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditingNote !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 border border-gray-300 rounded-md w-96">
            <h2 className="text-xl font-bold mb-2">Edit Note</h2>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder="Description"
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
            />
            <textarea
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder="Body"
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEditSubmit(isEditingNote)}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {viewingNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 border border-gray-300 rounded-md w-96">
            <h2 className="text-xl font-bold mb-2">{viewingNote.title}</h2>
            <p className="mb-2">{viewingNote.description}</p>
            <p>{viewingNote.body}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Close
              </button>
              <button
                onClick={() => handleEditClick(viewingNote)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(viewingNote.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="p-4 border border-gray-300 rounded-md cursor-pointer"
            onClick={() => handleViewClick(note)}
          >
            <h2 className="text-lg font-bold mb-2">{note.title}</h2>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
