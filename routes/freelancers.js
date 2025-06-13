import pgclient from '../db.js';
import express from 'express';

const freelancers = express.Router();

freelancers.get('/', async (req, res) => {
    try {
        const result = await pgclient.query('SELECT * FROM freelancers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching freelancers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
freelancers.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pgclient.query('SELECT * FROM freelancers WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Freelancer not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching freelancer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

freelancers.post('/', async (req, res) => {
  const {
    name, email, phone, job_title, skills, projects,
    location, experience, bio, portfolio, availability
  } = req.body;

  try {
    const result = await pgclient.query(
      `INSERT INTO freelancers (name, email, phone, job_title, skills, projects, location, experience, bio, portfolio, availability)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [name, email, phone, job_title, skills, projects, location, experience, bio, portfolio, availability]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error creating freelancer:', err.message);
    res.status(500).json({ error: 'Failed to create freelancer' });
  }
});
freelancers.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name, email, phone, job_title, skills, projects,
        location, experience, bio, portfolio, availability
    } = req.body;

    try {
        const result = await pgclient.query(
            `UPDATE freelancers SET name = $1, email = $2, phone = $3, job_title = $4,
             skills = $5, projects = $6, location = $7, experience = $8,
             bio = $9, portfolio = $10, availability = $11 WHERE id = $12 RETURNING *`,
            [name, email, phone, job_title, skills, projects, location,
             experience, bio, portfolio, availability, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Freelancer not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating freelancer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

freelancers.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pgclient.query('DELETE FROM freelancers WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Freelancer not found' });
        }

        res.json({ message: 'Freelancer deleted successfully', freelancer: result.rows[0] });
    } catch (error) {
        console.error('Error deleting freelancer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default freelancers;