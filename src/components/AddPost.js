// src/components/AddPost.js
import React, { useState } from 'react';

const AddPost = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          content,
        }),
      });

      if (response.ok) {
        const addedPost = await response.json();
        onAddPost(addedPost);
        // Clear the form fields after adding the post
        setTitle('');
        setAuthor('');
        setContent('');
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="add-post">
      <br></br><br></br>
      <h2 style={{ color: 'green',}}>Add New Post</h2>
      <label>
        Title:   </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
   
      
      <label>
        Author: </label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
     
      <label>
        Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      
      <button  class="btn btn-success" onClick={handleAddPost}>Add Post</button>

      
      <br></br><br></br>
      <hr></hr>   <hr></hr>   <hr></hr>
    </div>

  );
};

export default AddPost;
