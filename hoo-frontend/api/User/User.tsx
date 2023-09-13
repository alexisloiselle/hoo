
import HttpClient from './HttpClient'


export class User {
  public static async getUser(
    id: number,
  ): Promise<any> {
    const client = new HttpClient({
      endpoint: 'facts/',
    })

    const params = {
        id
    }

    const response = await client.get({
     // params: params,
    })

    return response.data
  }

}