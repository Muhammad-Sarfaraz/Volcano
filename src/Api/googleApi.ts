import axios from "axios";
import { GOOGLE_API_ENDPOINT, GOOGLE_API_KEY } from "../constants";

export const googleApi = (text: string, apiKey: string) => {
  return axios.post(
    `${GOOGLE_API_ENDPOINT}?key=${apiKey}`,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: text }],
        },
      ],
    },
    { headers: { "Content-Type": "application/json" } }
  );
};
