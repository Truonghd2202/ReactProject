const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL\n" +
      "Please create .env file and add VITE_API_URL= http://localhost:3000",
  );
}

export const env = {
  API_URL,
} as const;
