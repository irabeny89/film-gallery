import { Dispatch, SetStateAction } from "react";

type SearchResultModalPropsType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

type SearchBoxPropsType = {
  setShowResult: SearchResultModalPropsType["setShow"];
};

type FilmType = Record<
  "Title" | "Year" | "imdbID" | "Type" | "Poster",
  string
>;

type FilmSearchResultType = Record<"Search", FilmType[]>;
