import React from "react";
import enzyme, { shallow } from "enzyme";
import { RecipeCard } from "../components/RecipeCard";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from "@testing-library/react";

const adapter = new Adapter();
enzyme.configure({ adapter });

const recipe = {
  imgUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnHm5WGV1Zc4gVI5XhIcoJb_Sfl24ygMJhTQ&usqp=CAU",
  title: "Spaghetti",
};

const user = {
  id: 123,
};

describe("Recipe Card", () => {
  it("Renders without crashing", () => {
    shallow(<RecipeCard recipe={recipe} />);
  });

  it("renders the recipe title", () => {
    const { getByText } = render(<RecipeCard recipe={recipe} />);
    const title = getByText("Spaghetti");
    expect(title).toBeInTheDocument();
  });

  it("renders the recipe image", () => {
    const { getByTitle } = render(<RecipeCard recipe={recipe} />);
    const title = getByTitle("Spaghetti");
    expect(title).toBeInTheDocument();
  });

  it("does not render save recipe button when user is logged out", () => {
    const { getAllByRole } = render(<RecipeCard recipe={recipe} />);
    const buttonCount = getAllByRole("button").length;

    expect(buttonCount).toEqual(1);
  });
});

describe("Recipe Card for logged in users", () => {
  it("renders save recipe button when user is logged in", () => {
    const { getAllByRole } = render(<RecipeCard recipe={recipe} user={user} />);
    const buttonCount = getAllByRole("button").length;

    expect(buttonCount).toEqual(2);
  });

  it("allows users to save recipes", () => {
    const save = jest.fn();

    const { getAllByRole } = render(
      <RecipeCard recipe={recipe} user={user} saveRecipe={save} />
    );
    const saveButton = getAllByRole("button")[1];

    fireEvent.click(saveButton);
    expect(save).toHaveBeenCalledTimes(1);
  });
});
