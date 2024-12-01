import db from '../../lib/db';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import Cors from 'cors';
import { comment } from 'postcss';

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  origin: '*', 
  allowedHeaders: ['Content-Type', 'Authorization'],
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
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  const { comment_id } = req.query;

  
  try {
    const [rows] = await db.query('DELETE FROM  peer_reviews WHERE review_id = ?', [comment_id]);

    res.status(200).json({ status: 'success'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}
