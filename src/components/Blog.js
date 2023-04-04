import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleNotif, updateBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [viewHide, setViewHide] = useState(true);

  const showWhenVisible = { display: visible ? "" : "none" };
  const buttonName = viewHide ? "view" : "hide";

  const toggleVisibility = () => {
    setVisible(!visible);
    setViewHide(!viewHide);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = blog.user;
  const deleteAuth = user.username === currentUser.username;

  const addLike = async () => {
    try {
      const newLikes = likes + 1;

      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes, // for saving in backend
        user: user.id,
      };

      await updateBlog(updatedBlog, blog.id);
      setLikes(newLikes); // for rendering
    } catch (error) {
      console.log("error:", error);
      handleNotif(true, error.response.data.error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlog(blog.id);
      } catch (error) {
        handleNotif(true, error.response.data.error);
      }
    }
  };

  return (
    <div class="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility}>
          {buttonName}
        </button>
      </div>
      <div id="blog-details" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes <span>{likes}</span>
          <button type="button" onClick={addLike}>
            like
          </button>
        </div>
        <div>{user.name}</div>
        {deleteAuth && (
          <button class="remove" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleNotif: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Blog;
