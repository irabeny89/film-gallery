import { makeVar } from "@apollo/client";
import mockSearchResult from "data/mockSearchResult";
import { FilmSearchResultType } from "types";
import config from "config";

const initialSearchResult: FilmSearchResultType = {
    Search: [],
    Response: "",
  },
  defaultSearchResult =
    config.network === "offline" ? mockSearchResult : initialSearchResult;

export const filmSearchResultVar =
  makeVar<FilmSearchResultType>(defaultSearchResult);
