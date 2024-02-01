// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import PostDetails from './PostDetails';
import AddPost from './AddPost';  // Import the AddPost component
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
 // const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/posts');
        if (response.ok) {
          const fetchedPosts = await response.json();
          setPosts(fetchedPosts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handlePostClick = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
  };

  const handleEditPost = async (updatedPost) => {
    try {
      // Send a PUT request to update the post on the backend
      const response = await fetch(`http://localhost:8080/api/v1/posts/${updatedPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (response.ok) {
        // If the update is successful, update the posts state
        const updatedPosts = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
        setPosts(updatedPosts);
        setSelectedPost(null);
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        setSelectedPost(null);
       
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const addedPost = await response.json();
        setPosts([...posts, addedPost]);
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="dashboard">
  

      <AddPost onAddPost={handleAddPost} />
      <Posts posts={posts} onPostClick={handlePostClick} />
      {selectedPost && (
        <PostDetails
          post={selectedPost}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
      )}
    </div>
  );
};

export default Dashboard;
