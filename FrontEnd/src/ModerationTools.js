import React, { useEffect, useState } from 'react';

const ModerationTools = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = () => {
      const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
      setComments(storedComments);
    };

    fetchComments();
  }, []);

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  return (
    <div className="moderation-tools">
      <h2>Moderation Tools</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.text}</p>
              <small>{comment.timestamp}</small>
              <button onClick={() => handleDeleteComment(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available for moderation.</p>
      )}
    </div>
  );
};

export default ModerationTools;
