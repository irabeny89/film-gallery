import { makeVar } from "@apollo/client";
import mockSearchResult from "data/mockSearchResult";
import { FilmSearchResultType } from "types";
import config from "config";

const initialSearchResult = {
    Search: [],
  },
  defaultSearchResult =
    config.network === "offline" ? mockSearchResult : initialSearchResult;

export const filmSearchResultVar =
  makeVar<FilmSearchResultType>(defaultSearchResult);
