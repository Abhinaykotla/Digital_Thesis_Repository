import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotificationSystem from './NotificationSystem';
import ModerationTools from './ModerationTools';

const PeerReview = () => {
  const { thesisId } = useParams();
  const [thesis, setThesis] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user_id = localStorage.getItem('user_id');
  const role = localStorage.getItem('role');
  useEffect(() => {
    const fetchThesis = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews?thesis_id=${thesisId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch thesis data');
        }
        const data = await response.json();
        setThesis(data.theses[0]);
        setComments(data.theses[0]?.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThesis();

    const trackView = async () => {
      try {
        await fetch(`http://localhost:3000/api/addthesesstatistics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            thesis_id: thesisId,
            type: 'view',
          }),
        });
      } catch (err) {
        console.error('Failed to track view', err);
      }
    };

    trackView();
  }, [thesisId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating before submitting your comment.');
      return;
    }
    if (newComment.trim() === '') {
      alert('Please enter a comment before submitting.');
      return;
    }
    const reviewData = {
      thesisId: thesis?.thesis_id,
      reviewerId: localStorage.getItem('user_id'),
      comment: newComment,
      rating: rating,
    };

    try {
      const response = await fetch('http://localhost:3000/api/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit review');
      }

      const fetchUpdatedThesis = async () => {
        const updatedResponse = await fetch(
          `http://localhost:3000/api/reviews?thesis_id=${thesisId}`
        );
        const updatedData = await updatedResponse.json();
        setThesis(updatedData.theses[0]);
        setComments(updatedData.theses[0]?.reviews || []);
      };

      fetchUpdatedThesis();
      setNewComment('');
      setRating(0);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDownloadClick = async () => {
    try {
      // Track thesis download
      await fetch(`http://localhost:3000/api/addthesesstatistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thesis_id: thesisId,
          type: 'download',
        }),
      });

      // Trigger the download in a new window
      window.open(thesis?.file, '_blank');
    } catch (err) {
      console.error('Failed to track download', err);
    }
  };

  const deleteComment = async (comment_id) => {
    try {
      await fetch(`http://localhost:3000/api/deleteComment?comment_id=` + comment_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setComments((prevComments) => prevComments.filter(comment => comment.review_id !== comment_id));


    } catch (err) {
      console.error('Failed to track download', err);
    }
  };
  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!thesis) {
    return (
      <div className="alert alert-warning" role="alert">
        No thesis information available.
      </div>
    );
  }

  return (
    <div className="peer-review-container container my-5">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{thesis.title}</h2>
          <h5 className="card-subtitle mb-2 text-muted">Submitted by: {thesis.author}</h5>
          <h6 className="card-subtitle mb-3 text-muted">Year: {thesis.year}</h6>
          <h6 className="card-subtitle mb-3 text-muted">Topic: {thesis.topic}</h6>
          <p className='card-text'>Created At : {new Date(thesis.created_at).toLocaleDateString()} </p>
          <p className="card-text">
            <strong>Abstract:</strong> {thesis.abstract || 'No abstract provided.'}
          </p>
          <h6 className="card-subtitle mb-3 text-muted">Theses File: <br></br><a href={thesis.file} className='btn btn-primary w-25' target='_blank' onClick={handleDownloadClick}>Download Theses Document</a></h6>

        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3>Reviews and Comments</h3>
        </div>
        <div className="card-body">
          {comments.length > 0 ? (
            <ul className="list-group">
              {comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                  <p className="mb-1"><small>Comment:</small> {comment.comments}</p>
                  <small className="text-muted">
                    Commented by: {comment.reviewer_name} - Rating: {'⭐'.repeat(comment.rating)}
                    &emsp;
                    {role === 'admin' ? (<a
                      className="text-danger" role="button" title='Delete Comment and Rating'
                      onClick={() => deleteComment(comment.review_id)}
                    >
                      Delete Comment
                    </a>
                    ) : ('')}

                    {/* <a className='text-danger' onClick={deleteComment(comment.review_id)}>Delete Comment</a> */}

                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No comments yet.</p>
          )}
        </div>
      </div>
      <div>
        {user_id ? (
          <div className="card">
            <div className="card-header">
              <h4>Leave a Comment</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    rows="3"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating:</label>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= rating ? 'text-warning' : 'text-muted'}`}
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => setRating(star)}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Comment
                </button>
              </form>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <button className="btn btn-success" onClick={handleDownloadClick}>
                  Download PDF
                </button>
              </div>
            </div>

          </div>

        ) : (
          <p className="text-muted"><a href='/login' className='btn btn-primary w-50' >  Login to Comment.</a></p>
        )}

      </div>

      <div className="mt-4">
        {/* <NotificationSystem /> */}
        {/* <ModerationTools /> */}
      </div>
    </div>
  );
};

export default PeerReview;
