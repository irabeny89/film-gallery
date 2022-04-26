const config = {
  generalErrorMessage:
    "Something went wrong! Check your internet and try again.",
  apiKey: process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_API_KEY,
  network: process.env.NETWORK || process.env.NEXT_PUBLIC_NETWORK,
};

export default config;
