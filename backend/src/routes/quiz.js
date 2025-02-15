import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const [quizzes] = await pool.query(
      'SELECT * FROM quizzes ORDER BY created_at DESC'
    );
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Get a specific quiz
router.get('/:id', async (req, res) => {
  try {
    const [quiz] = await pool.query(
      'SELECT * FROM quizzes WHERE id = ?',
      [req.params.id]
    );
    if (quiz.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});

// Create a new quiz
router.post('/', async (req, res) => {
  try {
    const { title, description, teacherId } = req.body;
    const [result] = await pool.query(
      'INSERT INTO quizzes (title, description, teacher_id) VALUES (?, ?, ?)',
      [title, description, teacherId]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

// Update a quiz
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    await pool.query(
      'UPDATE quizzes SET title = ?, description = ? WHERE id = ?',
      [title, description, req.params.id]
    );
    res.json({ message: 'Quiz updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating quiz' });
  }
});

// Delete a quiz
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM quizzes WHERE id = ?', [req.params.id]);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

export default router;