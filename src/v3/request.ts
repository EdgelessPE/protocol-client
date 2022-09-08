import axios, { AxiosRequestConfig } from 'axios'
import { Hello } from './hello'

export type RequestConfig = Exclude<
  AxiosRequestConfig,
  'responseType' | 'data' | 'params'
>

export class Client {
  constructor(public readonly root: string) {}
  async hello(config?: RequestConfig, path = '/hello'): Promise<Hello> {
    const r = await axios.get(this.root + path, {
      responseType: 'json',
      ...config,
    })

    if (r.status !== 200) {
      throw new Error(`Invalid Status ${r.status}`)
    }

    return new Hello(r.data)
  }
}
