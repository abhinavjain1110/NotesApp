import React, { useEffect, useState } from "react";
import api from "../Api";
import "./notes.css";
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/notes");
      setNotes(data.notes);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addNote(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      const { data } = await api.post("/notes", { title, body });
      setNotes((prev) => [data.note, ...prev]);
      setTitle("");
      setBody("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add note");
    } finally {
      setSaving(false);
    }
  }

  async function del(id) {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete note");
    }
  }

  if (loading) return <div className="card">Loading notes…</div>;
  if (error) return <div className="card error">{error}</div>;

  return (
    <div className="notes-container">
      <form className="note-form" onSubmit={addNote}>
        <h2>Create Note</h2>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Body (optional)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="btn-primary" disabled={saving}>
          {saving ? "Adding…" : "Add Note"}
        </button>
      </form>

      <h2>Your Notes</h2>
      <div className="notes-list">
        {notes.length === 0 && <p className="empty">No notes yet.</p>}
        {notes.map((n) => (
          <div key={n._id} className="note-card">
            <h3>{n.title}</h3>
            {n.body && <p>{n.body}</p>}
            <div className="note-footer">
              <span>{new Date(n.createdAt).toLocaleString()}</span>
              <button className="btn-danger" onClick={() => del(n._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
