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
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchNotes(userId);
    }
  }, []);

  const fetchNotes = async (userId) => {
    try {
      const response = await axios.get(`https://notesapp-3qhd.onrender.com/notes/${userId}`);
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

    try {
      const response = await axios.post('https://notesapp-3qhd.onrender.com/notes', newNote, {
        headers: {
          'user-id': localStorage.getItem('userId')
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
      const response = await axios.put(`https://notesapp-3qhd.onrender.com/notes/${id}`, updatedNote);
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
      await axios.delete(`https://notesapp-3qhd.onrender.com/notes/${id}`);
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
    <div className="p-4 font-mono">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-xl font-bold mb-4 font-mono">Click the plus button</h1>
        <button
          onClick={handleAddNoteClick}
          className="bg-gray-500 text-white p-2 rounded-full"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <div key={note._id} className="bg-[#facbc7] p-4 rounded-lg border border-gray-300">
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="mb-2">{note.description}</p>
            <p>{note.body}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleViewClick(note)}
                className="bg-transparent border border-gray-500  text-gray-500 font-semibold p-2 rounded-md hover:text-[#facbc7] hover:bg-gray-500"
              >
                View
              </button>
              <button
                onClick={() => handleEditClick(note)}
                className="bg-transparent border border-gray-500  text-gray-500 font-semibold p-2 rounded-md hover:text-[#facbc7] hover:bg-gray-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(note._id)}
                className="bg-transparent border border-gray-500  text-gray-500 font-semibold p-2 rounded-md hover:text-[#facbc7] hover:bg-gray-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
