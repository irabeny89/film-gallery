const config = {
  generalErrorMessage:
    "Something went wrong! Check your internet and try again.",
  notFoundErrorMessage: "Film not found. Try another film title/IMDB ID.",
  apiKey: process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_API_KEY,
  network: process.env.NETWORK || process.env.NEXT_PUBLIC_NETWORK,
};

export default config;
