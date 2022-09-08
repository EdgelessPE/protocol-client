import { Raw, ReadonlyList } from './utils'
import { Service as RawService } from './raw'

export class Service extends Raw<RawService> {
  get name(): string {
    return this.name
  }

  get path(): string {
    return this.path
  }
}

export class Services extends ReadonlyList<Service> {
  static fromRawArray(x: RawService[]): Services {
    return new Services(x.map((v) => new Service(v)))
  }
}
