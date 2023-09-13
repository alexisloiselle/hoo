import axios, { AxiosInstance, AxiosResponse } from 'axios'

type Body = { [key: string]: unknown } | FormData
interface Url {
  endpoint: string
  token?: string
}

interface Params {
  body?: Body
  params?: {
    [key: string]: string | string[] | number | number[] | boolean | undefined
  }
}

class Client {
  public instance: AxiosInstance
  public endpoint: string
  public body?: Body
  public token?: string
  public baseUrl?: string

  constructor({ endpoint, token }: Url) {
    this.token = token
    this.endpoint = endpoint
    this.instance = axios.create({ baseURL: 'https://d024-69-156-9-82.ngrok-free.app/' })
  }

  public async get({ params }: Params = {}): Promise<AxiosResponse> {
    return this.instance.get(this.endpoint, {
      params,
    })
  }

  public async post({ body, params }: Params): Promise<AxiosResponse> {
    return this.instance.post(this.endpoint, body, {
      params,
    })
  }

  public async put({ body, params }: Params): Promise<AxiosResponse> {
    return this.instance.put(this.endpoint, body, {
      params,
    })
  }

  public async delete({ params }: Params): Promise<AxiosResponse> {
    return this.instance.delete(this.endpoint, {
      params,
    })
  }

  public async patch({ body, params }: Params): Promise<AxiosResponse> {
    return this.instance.patch(this.endpoint, body, {
      params,
    })
  }

  public async head({ params }: Params): Promise<AxiosResponse> {
    return this.instance.head(this.endpoint, {
      params,
    })
  }
}

export default Client