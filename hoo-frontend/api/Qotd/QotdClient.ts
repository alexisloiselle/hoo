import HttpClient from "../HttpClient";

export class QotdClient {
  public static async getQotd(): Promise<any> {
    const client = new HttpClient({
      endpoint: "/qotd",
    });

    const response = await client.get();

    return response.data.qotd;
  }
}
