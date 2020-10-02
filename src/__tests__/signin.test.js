import React from "react";
import enzyme, { shallow } from "enzyme";
import { SignIn } from "../components/login";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from "@testing-library/react";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("sign in", () => {
  let wrapper;
  const setUser = jest.fn();
  const history = {
    location: {
      state: "/",
    },
  };
  const user = {};

  beforeEach(() => {
    wrapper = render(
      <SignIn setUser={setUser} history={history} user={user} />
    );
  });

  it("Renders without crashing", () => {
    shallow(<SignIn setUser={setUser} history={history} user={user} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("renders input fields", () => {
    it("renders three input fields", () => {
      const inputs = wrapper.container.querySelectorAll("input");
      expect(inputs.length).toEqual(3);
    });

    it("renders an email field", () => {
      const email = wrapper.container.querySelector('input[name="email"]');
      expect(email).toBeInTheDocument();
    });

    it("renders a password field", () => {
      const password = wrapper.container.querySelector('input[name="password');
      expect(password).toBeInTheDocument();
    });
  });

  it("includes a link to sign up", () => {
    const link = wrapper.container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link.text).toEqual(
      expect.stringContaining("New to Serv'd? Sign Up")
    );
  });

  describe("uses controlled inputs", () => {
    it("uses a controlled email input", () => {
      wrapper = enzyme.mount(
        <SignIn setUser={setUser} history={history} user={user} />
      );
      const email = wrapper.find('input[name="email"]');
      email.simulate("change", { target: { name: "email", value: "test" } });
      expect(email.html()).toContain("test");
    });
  });
});
