
import HttpClient from './HttpClient'

export class User {
  public static async getUser(
    userName: string,
  ): Promise<any> {
    const client = new HttpClient({
      endpoint: `/users/${userName}`,
    })

    const response = await client.get()

    return response.data
  }

  public static async getLeaderboard(
    userName: string,
  ): Promise<any> {
    const client = new HttpClient({
      endpoint: `/users/${userName}/leaderboard`,
    })

    const response = await client.get()

    return response.data
  }

}