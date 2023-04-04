import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const getBlogs = async () => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleNotif = (errorState, notifMessage) => {
    setIsError(errorState);
    setMessage(notifMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const setCredentials = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      await blogService.create(blogObject);
    } catch (error) {
      throw error;
    }
    getBlogs();
  };

  const updateBlog = async (blogObject, objectId) => {
    try {
      await blogService.update(blogObject, objectId);
    } catch (error) {
      throw error;
    }
    getBlogs();
  };

  const deleteBlog = async (blogObject, objectId) => {
    try {
      console.log("to remove", objectId);
      await blogService.remove(blogObject, objectId);
      console.log("removed");
    } catch (error) {
      throw error;
    }
    getBlogs();
  };

  const loginForm = () => {
    return (
      <LoginForm setCredentials={setCredentials} handleNotif={handleNotif} />
    );
  };

  const blogDiv = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </p>
        <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} handleNotif={handleNotif} />
        </Toggleable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleNotif={handleNotif}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            currentUser={user}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Notification message={message} isError={isError} />
      {!user && loginForm()}
      {user && blogDiv()}
    </>
  );
};

export default App;
