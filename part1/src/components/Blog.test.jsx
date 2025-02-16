import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "OWO",
    author: "admingirl",
    url: "www.hhh.com",
    likes: 3000,
  };

  render(<Blog blog={blog} />);

  const title = screen.queryByText("OWO");
  const author = screen.queryByText("admingirl");
  const url = screen.queryByText("www.hhh.com");
  const likes = screen.queryByText("3000");
  expect(title).toBeDefined();
  expect(author).toBeNull();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});
