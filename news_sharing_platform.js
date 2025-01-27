import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const App = () => {
  const [posts, setPosts] = useState([]); // Holds the list of posts
  const [newPost, setNewPost] = useState({ title: "", description: "" });

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">News Sharing Platform</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Post News</h2>
          <Input
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="mb-2"
          />
          <Textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            className="mb-2"
          />
          <Button onClick={handlePostSubmit} className="w-full">
            Post
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          {posts.map((post) => (
            <Card key={post.id} className="mb-4">
              <CardContent>
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-700">{post.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span>{post.likes} Likes</span>
                  <Button
                    onClick={() => handleLike(post.id)}
                    className="text-blue-500"
                  >
                    Like
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
