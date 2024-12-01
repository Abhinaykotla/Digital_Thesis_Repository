import db from '../../lib/db';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed, only GET is accepted' });
  }

  const { topic, author, year, keywords, thesis_id } = req.query;

  try {
    let query = `
      SELECT 
        theses.*,
        pr.review_id,
        pr.reviewer_id,
        pr.rating,
        theses.keywords AS review_keywords,
        theses.year AS review_year,
        pr.review_comment AS review_comments,
        u.first_name AS reviewer_name
      FROM 
        theses 
      LEFT JOIN 
        peer_reviews pr ON theses.thesis_id = pr.thesis_id
      LEFT JOIN 
        users u ON u.user_id = pr.reviewer_id
      WHERE 1=1
    `;
    const queryParams = [];

    if (thesis_id) {
      query += ' AND theses.thesis_id = ?';
      queryParams.push(thesis_id);
    }

    if (topic) {
      query += ' AND theses.keywords LIKE ?';
      queryParams.push(`%${topic}%`);
    }

    if (author) {
      query += ' AND u.first_name LIKE ?';
      queryParams.push(`%${author}%`);
    }

    if (year) {
      query += ' AND theses.year = ?';
      queryParams.push(year);
    }

    if (keywords) {
      query += ' AND theses.keywords LIKE ?';
      queryParams.push(`%${keywords}%`);
    }

    const [rows] = await db.query(query, queryParams);

    const theses = {};
    rows.forEach((row) => {
      const thesisId = row.thesis_id;

      if (!theses[thesisId]) {
        theses[thesisId] = {
          thesis_id: row.thesis_id,
          title: row.title,
          author: row.author,
          year: row.year,
          file: 'http://localhost:3000/'+row.file_url,
          created_at: row.created_at,
          topic: row.topic,
          abstract: row.abstract,
          reviews: [],
        };
      }

      if (row.review_id) {
        theses[thesisId].reviews.push({
          review_id: row.review_id,
          reviewer_id: row.reviewer_id,
          rating: row.rating,
          reviewer_name: row.reviewer_name,
          keywords: row.review_keywords,
          year: row.review_year,
          comments: row.review_comments,
        });
      }
    });

    res.status(200).json({ theses: Object.values(theses) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch theses, internal server error' });
  }
}
