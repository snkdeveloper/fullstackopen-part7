import { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleChange1 = (event) => {
    setNewTitle(event.target.value);
  };
  const handleChange2 = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleChange3 = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <input value={newTitle} onChange={handleChange1} />
        <input value={newAuthor} onChange={handleChange2} />
        <input value={newUrl} onChange={handleChange3} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
