import React from "react";
import enzyme, { shallow } from "enzyme";
import { SingleRecipe } from "../components/singleRecipe";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from "@testing-library/react";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("Single Recipe", () => {
  let wrapper;

  const appState = {
    singleRecipe: {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnHm5WGV1Zc4gVI5XhIcoJb_Sfl24ygMJhTQ&usqp=CAU",
      title: "Spaghetti",
      servings: "Two",
      time: "20 minutes",
      ingredients: ["pasta", "tomato sauce", "parmesan cheese"],
      steps: ["cook the pasta"],
    },
    savedRecipes: [],
    user: {},
  };

  beforeEach(() => {
    wrapper = render(<SingleRecipe appState={appState} location={{}} />);
  });

  it("Renders without crashing", () => {
    shallow(<SingleRecipe appState={appState} location={{}} />);
  });

  it("Renders the recipe title", () => {
    const title = wrapper.getByText("Spaghetti");
    expect(title).toBeInTheDocument();
  });

  it("Renders the recipe servings", () => {
    const servings = wrapper.getByText(
      `Servings: ${appState.singleRecipe.servings}`
    );
    expect(servings).toBeInTheDocument();
  });

  it("Renders the recipe ingredients", () => {
    for (let el of appState.singleRecipe.ingredients) {
      const ingredient = wrapper.getByText(el);
      expect(ingredient).toBeInTheDocument();
    }
  });

  it("Renders the recipe steps", () => {
    const step = wrapper.getByText(appState.singleRecipe.steps[0]);
    expect(step).toBeInTheDocument();
  });
});

describe("Single Recipe for Logged in User", () => {
  let wrapper, save, remove, appState;

  beforeEach(() => {
    appState = {
      singleRecipe: {
        imgUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnHm5WGV1Zc4gVI5XhIcoJb_Sfl24ygMJhTQ&usqp=CAU",
        title: "Spaghetti",
        servings: "Two",
        time: "20 minutes",
        ingredients: ["pasta", "tomato sauce", "parmesan cheese"],
        steps: ["cook the pasta"],
      },
      savedRecipes: [],
      user: {},
    };

    appState.user = { id: 123 };
    save = jest.fn();
    remove = jest.fn();
    wrapper = render(
      <SingleRecipe appState={appState} location={{}} saveRecipe={save} />
    );
  });

  it("allows logged in users to save a recipe, if not already saved", () => {
    const saveButton = wrapper.container.querySelector(".MuiSvgIcon-root");
    fireEvent.click(saveButton);

    expect(save).toHaveBeenCalledTimes(1);
  });

  it("allows logged in users to remove a previously saved recipe", () => {
    appState.savedRecipes.push(appState.singleRecipe);

    const { container } = render(
      <SingleRecipe appState={appState} location={{}} removeRecipe={remove} />
    );
    const removeButton = container.querySelector(".MuiSvgIcon-root");
    fireEvent.click(removeButton);

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
