import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { useFormik } from "formik";
import { SignInContainer } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);
      screen.debug();

      fireEvent.changeText(
        screen.getByPlaceholderText("Username"),
        "tteekkari"
      );
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "secret");
      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "tteekkari",
        password: "secret",
      });
    });
  });
});
