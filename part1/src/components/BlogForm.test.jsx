import { render, screen } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<NewBlogForm createBlog={createBlog} />);

  const input = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("Create");

  await user.type(input[0], "john");
  await user.type(input[1], "sins");
  await user.type(input[2], "123");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  //  
  expect(createBlog.mock.calls[0][0].title).toBe("john");
  expect(createBlog.mock.calls[0][0].author).toBe("sins");
  expect(createBlog.mock.calls[0][0].url).toBe("123");
});
