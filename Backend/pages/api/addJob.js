// pages/api/addJob.js

import db from '../../lib/db';
import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow only specific methods
  origin: '*', // You can replace '*' with specific domains like 'http://localhost:3000' for more security
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, only POST is accepted' });
  }

  const { job_title, company_name, location, job_description, job_type, posted_by, posted_date } = req.body;

  if (!job_title || !company_name || !location || !job_description || !job_type || !posted_by || !posted_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Insert the new job into the database
    const result = await db.query(
      'INSERT INTO jobs (job_title, company_name, location, job_description, job_type, posted_by, posted_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [job_title, company_name, location, job_description, job_type, posted_by, posted_date]
    );

    // Return success response
    res.status(201).json({ message: 'Job added successfully', job_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add job, internal server error' });
  }
}
