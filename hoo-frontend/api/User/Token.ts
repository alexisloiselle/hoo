import HttpClient from "./HttpClient";

export class Token {
  public static async putToken(token: string, username: string): Promise<any> {
    const client = new HttpClient({
      endpoint: `/token/${token}`,
    });

    const body = { username };

    const response = await client.put({ body });

    return response.data;
  }
}
