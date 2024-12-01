import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import db from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public', 'uploads'),
    keepExtensions: true,
    allowEmptyFiles: false,
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { topic, abstract, thesisTitle, authorName, email, keywords, year, author_id } = fields;
    const thesisDocument = files.uploadFile;

    if (!thesisTitle || !authorName || !email || !keywords || !year || !author_id || !thesisDocument) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const uploadedFilePath = thesisDocument.filepath || thesisDocument[0]?.filepath;
    if (!uploadedFilePath) {
      return res.status(500).json({ error: 'File upload failed. File path is missing.' });
    }

    const fileUrl = path.join('/uploads', path.basename(uploadedFilePath));

    try {
      const [result] = await db.query(
        'INSERT INTO theses (title, topic, abstract, author, author_id, email, keywords, year, file_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          thesisTitle,
          topic,
          abstract,
          authorName,
          author_id,
          email,
          keywords,
          year,
          fileUrl,
          new Date(),
        ]
      );

      res.status(200).json({
        message: 'Thesis submitted successfully',
        thesisId: result.insertId,
      });
    } catch (dbError) {
      console.error('Database Error:', dbError);
      res.status(500).json({ error: 'Failed to save thesis to the database' });
    }
  } catch (formError) {
    console.error('Formidable Error:', formError);
    res.status(500).json({ error: 'Error processing form data' });
  }
}
