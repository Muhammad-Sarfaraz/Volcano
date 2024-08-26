import axios from "axios";
import { OPEN_API_ENDPOINT, OPEN_API_KEY } from "../constants";

export const openaiApi = (text: string) => {
  return axios.post(
    OPEN_API_ENDPOINT,
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_API_KEY}`,
      },
    }
  );
};
