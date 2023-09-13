import axios from "axios";
const apiKey = process.env.CHATGPT_API_KEY;

const apiUrl = "https://api.openai.com/v1/chat/completions";

export class GptService {
  static async prompt(prompt: string) {
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
          ${prompt}

          Write it as you were a wise owl.
        `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  }
}
