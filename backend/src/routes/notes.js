import express from 'express';
import Note from '../models/Note.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();


// All notes for logged-in user
router.get('/', auth, async (req, res) => {
const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
res.json({ notes });
});


// Create note
router.post('/', auth, async (req, res) => {
const { title, body } = req.body;
if (!title || !title.trim()) return res.status(400).json({ message: 'Title is required' });
const note = await Note.create({ user: req.user.id, title: title.trim(), body: body || '' });
res.status(201).json({ note });
});


// Delete note
router.delete('/:id', auth, async (req, res) => {
const { id } = req.params;
const note = await Note.findOne({ _id: id, user: req.user.id });
if (!note) return res.status(404).json({ message: 'Note not found' });
await note.deleteOne();
res.json({ message: 'Deleted' });
});


export default router;