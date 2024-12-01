import formidable from 'formidable';
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

    const { thesisId, reviewerId, comment, rating } = fields;

    if (!thesisId || !reviewerId || !comment || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    try {
      const [result] = await db.query(
        'INSERT INTO peer_reviews (thesis_id, reviewer_id, review_comment, rating, created_at) VALUES (?, ?, ?, ?, ?)',
        [
          thesisId,
          reviewerId,
          comment,
          rating,
          new Date(),
        ]
      );

      res.status(200).json({
        message: 'Review added successfully',
        reviewId: result.insertId,
      });
    } catch (dbError) {
      console.error('Database Error:', dbError);
      res.status(500).json({ error: 'Failed to save review to the database' });
    }
  } catch (formError) {
    console.error('Formidable Error:', formError);
    res.status(500).json({ error: 'Error processing form data' });
  }
}
