import { gql } from "@apollo/client";

export const SEARCH_TITLE = gql`
  query SearchTitle($title: String!) {
    film(title: $title) @rest(type: "Film", path: "s={args.title}") {
      Search
    }
  }
`