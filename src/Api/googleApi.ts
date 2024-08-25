import axios from "axios"
import { GOOGLE_API_ENDPOINT, GOOGLE_API_KEY } from "../constants"

export const googleApi = (text: string) => {
    return axios
        .post(
            `${GOOGLE_API_ENDPOINT}?key=${GOOGLE_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: text }],
                    },
                ],
            },
            { headers: { "Content-Type": "application/json" } }
        )
}