// src/components/PostDetails.js
import React, { useState } from 'react';

const PostDetails = ({ post, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedAuthor, setUpdatedAuthor] = useState(post.author);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const updatedPost = {
      ...post,
      title: updatedTitle,
      author: updatedAuthor,
      content: updatedContent,
      // Add any other fields you want to update
    };
    onEdit(updatedPost);
    setEditMode(false);
  };

  return (
    <div className="post-details">
      {editMode ? (
        <>
          <label>Title:</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <label>Author:</label>
          <input
            type="text"
            value={updatedAuthor}
            onChange={(e) => setUpdatedAuthor(e.target.value)}
          />
          <label>Content:</label>
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          ></textarea>
          {/* Add input fields for other fields if needed */}
          <button class="btn btn-success"  onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <h3>Title: {post.title}</h3>
          <p>Author: {post.author}</p>
          <p>Content: {post.content}</p>
          <div>
            <button class="btn btn-warning" onClick={handleEditClick}>Edit</button>
            <button class="btn btn-danger" onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
