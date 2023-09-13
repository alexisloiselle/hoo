
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

  public static async postCreateUser(
    username: string,
    age: number,
    gender: string,
    weight: number,
    region: string
  ): Promise<any> {
    const client = new HttpClient({
      endpoint: '/users',
    })

    const body = {
        username,
        age,
        gender,
        weight,
        region
    }

      const response = await client.post({body})

    return response.data
  }

  public static async postHydration(
    username: string,
  ): Promise<any> {
    const client = new HttpClient({
      endpoint: `/users/${username}/hydration`,
    })

    const body = {
        username,
    }

    const response = await client.post({body})

    return response.data
  }

  public static async deleteUser(
    username: string,
  ): Promise<any> {
    const client = new HttpClient({
      endpoint: `/users/${username}`,
    })

    const body = {
        username,
    }

    const response = await client.delete({body})

    return response.data
  }

  public static async patchUser(
    username: string,
    age: number,
    gender: string,
    weight: number,
    region: string
  ): Promise<any> {
    const client = new HttpClient({
      endpoint: `/users/${username}`,
    })

    const body = {
        age,
        gender,
        weight,
        region
    }

      const response = await client.patch({body})

    return response.data
  }

}