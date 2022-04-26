const config = {
  apiKey: process.env.OMDB_API_KEY || process.env.OMDB_API_KEY,
  network: process.env.NETWORK || process.env.NEXT_PUBLIC_NETWORK,
};

export default config;
