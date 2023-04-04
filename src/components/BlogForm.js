import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog, handleNotif }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    try {
      await createBlog(blogObject);
      handleNotif(false, `a new blog ${title} by ${author} added`);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      handleNotif(true, error.response.data.error);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="blog-title"
            type="text"
            value={title}
            name="Title"
            placeholder="enter title..."
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="blog-author"
            type="text"
            value={author}
            name="Author"
            placeholder="enter author..."
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="blog-url"
            type="text"
            value={url}
            name="Url"
            placeholder="enter url..."
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  handleNotif: PropTypes.func.isRequired,
};

export default BlogForm;
