import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsAdmin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (credentials.username === "admin" && credentials.password === "password") {
      setIsAdmin(true);
      navigate("/posts");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md w-96"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
        <Input
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="mb-4"
        />
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </motion.div>
    </div>
  );
};

const PostsPage = ({ posts, handleLike, handleDelete, isAdmin }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Recent Posts</h1>
        {posts.map((post) => (
          <Card key={post.id} className="mb-4">
            <CardContent>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700">{post.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span>{post.likes} Likes</span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleLike(post.id)}
                    className="text-blue-500"
                  >
                    Like
                  </Button>
                  {isAdmin && (
                    <Button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

const CreatePostPage = ({ newPost, setNewPost, handlePostSubmit }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Create a Post</h1>
        <Input
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Description"
          value={newPost.description}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handlePostSubmit} className="w-full">
          Post
        </Button>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [posts, setPosts] = useState([]); // Holds the list of posts
  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch existing posts (mocked for now)
  useEffect(() => {
    setPosts([
      {
        id: 1,
        title: "Breaking News!",
        description: "This is an example post to get started.",
        likes: 3,
      },
    ]);
  }, []);

  // Handle new post submission
  const handlePostSubmit = () => {
    if (newPost.title && newPost.description) {
      const post = {
        id: posts.length + 1,
        ...newPost,
        likes: 0,
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", description: "" });
    }
  };

  // Handle likes
  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  // Handle delete
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <Router>
      <nav className="bg-blue-500 p-4 text-white">
        <div className="max-w-3xl mx-auto flex justify-between">
          <Link to="/posts" className="font-bold">Posts</Link>
          <Link to="/create" className="font-bold">Create Post</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route
          path="/posts"
          element={<PostsPage posts={posts} handleLike={handleLike} handleDelete={handleDelete} isAdmin={isAdmin} />}
        />
        <Route
          path="/create"
          element={<CreatePostPage newPost={newPost} setNewPost={setNewPost} handlePostSubmit={handlePostSubmit} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
