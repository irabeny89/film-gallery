import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import HomePage from "pages/index";
import { FilmSearchResultType } from "types";
import { SEARCH_TITLE } from "graphql/documentNodes";
import mockSearchResult from "data/mockSearchResult";
import config from "config";

const searchTerm = "avengers",
  foundResultMocks: readonly MockedResponse<
    Record<"film", FilmSearchResultType>
  >[] = [
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
  ],
  notFoundResultMocks: typeof foundResultMocks = [
    {
      ...foundResultMocks[0],
      result: {
        data: { film: { Response: "False", Error: "Too many results" } },
      },
    },
  ],
  networkErrorResultMocks: typeof foundResultMocks = [
    {
      request: foundResultMocks[0].request,
      error: new Error("Network error!"),
    },
  ],
  graphqlErrorResultMocks: typeof foundResultMocks = [
    {
      request: foundResultMocks[0].request,
      error: new GraphQLError("GraphQL error!"),
    },
  ];

describe("Home Page", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={foundResultMocks}>
        <HomePage />
      </MockedProvider>
    );
  });
  afterEach(cleanup);

  it("has page title.", () => {
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
    const searchButton = screen.getByTestId("searchButton"),
      textbox = screen.getByRole("textbox"),
      resultModal = screen.queryByTestId("result-modal"),
      user = userEvent.setup();

    expect(textbox).toHaveValue("");
    await user.click(searchButton);
    expect(resultModal).not.toBeInTheDocument();
  });

  it("searches and returns list of avengers films.", async () => {
    const searchButton = screen.getByTestId("searchButton"),
      textbox = screen.getByRole("textbox"),
      user = userEvent.setup();

    await user.type(textbox, searchTerm), await user.click(searchButton);

    expect(Array.isArray(await screen.findAllByText(/avengers/i))).toBe(true);
  });

  it("handles network errors when loading home page.", async () => {
    render(
      <MockedProvider mocks={networkErrorResultMocks}>
        <HomePage />
      </MockedProvider>
    );

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("handles GraphQL errors when loading home page.", async () => {
    render(
      <MockedProvider mocks={graphqlErrorResultMocks}>
        <HomePage />
      </MockedProvider>
    );

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("matches snapshot.", () => {
    const mainElement = screen.getByRole("main");

    expect(mainElement).toMatchSnapshot();
  });
});
