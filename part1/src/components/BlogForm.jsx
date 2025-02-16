import { useState, useEffect } from "react";

const BlogForm = ({
  handleBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleBlog}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
