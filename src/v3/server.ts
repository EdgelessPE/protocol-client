import { ReadonlyMap, Raw } from './utils'
import { ReservedServerProperties, Server as RawServer } from './raw'

export class ServerProperties extends ReadonlyMap<ReservedServerProperties> {}

export class Server extends Raw<RawServer> {
  public readonly porperty = new ServerProperties(this._inner.property)
  get name(): string {
    return this._inner.name
  }

  get description(): string {
    return this._inner.description
  }

  get protocol(): string {
    return this._inner.protocol
  }

  get root(): string {
    return this._inner.root
  }
}
