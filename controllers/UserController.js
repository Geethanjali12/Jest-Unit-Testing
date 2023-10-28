const note = require('../models/UserModels');

const notesController = {
    getAllNotes: async (req, res) => {
        try {
            const notes = await note.find();
            res.json(notes);
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    },

    createNote: async (req, res) => {
        try {
            const { title, content } = req.body;
            const newNote = new note({ title, content});
            await newNote.save();
            res.json(newNote);
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    },

    updateNote: async (req, res) => {
        try {
            const { title, content } = req.body;
            const updateNote = await note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
            if (updateNote) {
                res.json(updateNote)
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    },

    deleteNote: async ( req, res ) => {
        try {
            const deleteNote = await note.findByIdAndDelete(req.params.id);
            if (deleteNote) {
                res.json(deleteNote);
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    },
};

module.exports = notesController;