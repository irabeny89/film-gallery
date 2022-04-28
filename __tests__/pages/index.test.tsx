import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import HomePage from "pages/index";
import { FilmSearchResultType } from "types";
import { SEARCH_TITLE } from "graphql/documentNodes";
import mockSearchResult from "data/mockSearchResult";

const searchTerm = "avengers",
  mocks: readonly MockedResponse<Record<"film", FilmSearchResultType>>[] = [
    {
      request: {
        query: SEARCH_TITLE,
        variables: {
          title: searchTerm,
        },
      },
      result: {
        data: {
          film: mockSearchResult,
        },
      },
    },
  ];

describe("Home Page", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <HomePage />
      </MockedProvider>
    );
  });
  afterEach(cleanup);

  it("has a page title.", () => {
    const pageTitle = screen.getByRole("heading");

    expect(pageTitle).toHaveTextContent("Welcome to the film gallery");
  });

  it("list nine films.", async () => {
    const filmList = await screen.findByTestId("film-list"),
      filmCards = await screen.findAllByTestId("film-card");

    expect(filmList).not.toBeEmptyDOMElement();
    expect(filmCards.length).toBe(9);
  });

  it("does not search when textbox is empty.", async () => {
    const searchButton = screen.getByRole("button"),
      textbox = screen.getByRole("textbox"),
      resultModal = screen.queryByTestId("result-modal"),
      user = userEvent.setup();

    expect(textbox).toHaveValue("");
    await user.click(searchButton);
    expect(resultModal).not.toBeInTheDocument();
  });

  it("searches and returns list of avengers films.", async () => {
    const searchButton = screen.getByRole("button"),
      textbox = screen.getByRole("textbox"),
      user = userEvent.setup();

    await user.type(textbox, searchTerm), await user.click(searchButton);

    expect(Array.isArray(await screen.findAllByText(/avengers/i))).toBe(true);
  });

  it("matches snapshot.", () => {
    const mainElement = screen.getByRole("main");

    expect(mainElement).toMatchSnapshot();
  });
});
