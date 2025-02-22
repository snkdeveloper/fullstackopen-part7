import { useState, useEffect } from "react";
import { Input } from "../styles/styles";
import { Button } from "../styles/styles";
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
      <h2>Create New</h2>
      <form onSubmit={handleBlog}>
        <div>
          Title
          <Input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <Input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <Input
            data-testid="url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
