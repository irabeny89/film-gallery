import { Dispatch, SetStateAction } from "react";

type SearchResultModalPropsType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

type SearchBoxPropsType = {
  setShow: SearchResultModalPropsType["setShow"];
};

type MovieType = Record<
  "Title" | "Year" | "imdbID" | "Type" | "Poster",
  string
>;

type filmSearchResultType = Record<"Search", MovieType[]>;
