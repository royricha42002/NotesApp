import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [viewingNote, setViewingNote] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/notes/${user._id}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
    setIsEditingNote(null);
    setViewingNote(null);
  };

  const handleNoteSubmit = async () => {
    const newNote = {
      title: noteTitle,
      description: noteDescription,
      body: noteBody,
    };

    // if (!noteTitle || !noteDescription || !noteBody) {
    //   console.error("All fields are required");
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:8000/notes', newNote, {
        headers: {
          'user-id': user._id
        }
      });
      setNotes([...notes, response.data]);
      setIsAddingNote(false);
      setNoteTitle('');
      setNoteDescription('');
      setNoteBody('');
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleEditClick = (note) => {
    setIsEditingNote(note._id);
    setNoteTitle(note.title);
    setNoteDescription(note.description);
    setNoteBody(note.body);
  };

  const handleEditSubmit = async (id) => {
    const updatedNote = {
      title: noteTitle,
      description: noteDescription,
      body: noteBody,
    };
    try {
      const response = await axios.put(`http://localhost:8000/notes/${id}`, updatedNote);
      setNotes(notes.map(note => note._id === id ? response.data : note));
      setIsEditingNote(null);
      setNoteTitle('');
      setNoteDescription('');
      setNoteBody('');
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
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
            </div>
          </div>
        </div>
      )}
      <ul>
        {notes.map(note => (
          <li key={note._id} className="border border-gray-300 p-2 mb-2 rounded-md">
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p>{note.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleViewClick(note)}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                View
              </button>
              <button
                onClick={() => handleEditClick(note)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(note._id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
