import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";

describe("<Togglable />", async () => {
  let container;
  const mockHandler = vi.fn();
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="view">
        <div className="testDiv">
          <p>www.uwu2.com</p>
          <p>
            likes 20000<button onClick={mockHandler}>like</button>
          </p>
        </div>
      </Togglable>,
    ).container;
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const button2 = screen.getByText("like");
    await user.click(button2);
    await user.click(button2);
    const url = screen.queryByText("www.uwu2.com");
    const likes = screen.getByText("20000", { exact: false });
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
