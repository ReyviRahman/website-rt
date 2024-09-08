import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]); // State untuk menyimpan array notes
  const backendUrl = process.env.REACT_APP_BACKEND_BASEURL;

  useEffect(() => {
    fetchNotes();
  }, []);

  // Fungsi untuk fetch data dari API
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${backendUrl}/notes`);
      console.log(res.data); // Cek struktur data yang diterima

      // Simpan seluruh array notes ke state
      if (res.data.notes && res.data.notes.length > 0) {
        setNotes(res.data.notes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Notes List</h1>
      <ul>
        {notes.length > 0 ? (
          notes.map(note => (
            <li key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
            </li>
          ))
        ) : (
          <p>No notes available</p>
        )}
      </ul>
    </div>
  );
}

export default App;
