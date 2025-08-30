/* import React, { useEffect, useState } from "react";
import api from "../Api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    try {
      const { data } = await api.post("/notes", { title, body });
      setNotes([data.note, ...notes]);
      setTitle("");
      setBody("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add note");
    }
  }

  async function del(id) {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete note");
    }
  }

  if (loading) return <div className="card">Loading notes…</div>;
  if (error) return <div className="card">{error}</div>;

  return (
    <div className="card">
      <form onSubmit={addNote}>
        <h3>Create Note</h3>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input"
          style={{ marginTop: 8, minHeight: 100 }}
          placeholder="Body (optional)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="row">
          <button className="btn btn-primary" style={{ marginTop: 8 }}>
            Add
          </button>
        </div>
      </form>
      <hr />
      <h3>Your Notes</h3>
      <div className="row" style={{ flexDirection: "column" }}>
        {notes.length === 0 && <p className="small">No notes yet.</p>}
        {notes.map((n) => (
          <div key={n._id} className="note">
            <h4>{n.title}</h4>
            {n.body && <p style={{ whiteSpace: "pre-wrap" }}>{n.body}</p>}
            <div className="row" style={{ justifyContent: "space-between" }}>
              <span className="small">
                {new Date(n.createdAt).toLocaleString()}
              </span>
              <button className="btn btn-danger" onClick={() => del(n._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 */
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
