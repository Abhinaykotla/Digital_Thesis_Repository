import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import db from '../../lib/db';

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle file uploads
  },
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed (e.g., a specific domain)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public', 'uploads'),
    keepExtensions: true, // Retain file extensions
    allowEmptyFiles: false, // Ensure files are uploaded
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Extract fields
    const { coverLetter, experience, skills, jobId, user_id } = fields;
    const resume = files.resume;

    // Validate required fields
    if (!coverLetter || !experience || !skills || !jobId || !resume) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the file exists and has a valid path
    const uploadedFilePath = resume.filepath || resume[0]?.filepath; // Adjust for `formidable` versions
    if (!uploadedFilePath) {
      return res.status(500).json({ error: 'File upload failed. Resume file path is missing.' });
    }

    // Define the path to save the resume
    const resumePath = path.join('/uploads', path.basename(uploadedFilePath));

    try {
      // Insert data into the database
      const [result] = await db.query(
        'INSERT INTO job_applications (job_id, user_id, cover_letter, experience, skills, resume_path) VALUES (?, ?, ?, ?, ?, ?)',
        [jobId, user_id, coverLetter, experience, skills, resumePath]
      );

      // Respond with success
      res.status(200).json({
        message: 'Job application submitted successfully',
        applicationId: result.insertId,
      });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to save application to the database' });
    }
  } catch (error) {
    console.error('Formidable Error:', error);
    res.status(500).json({ error: 'Error processing form data' });
  }
}
