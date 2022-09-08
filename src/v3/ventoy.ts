import { Raw } from './utils'
import { VentoyResource as RawVentoyResource } from './raw'
import { FileResource } from './resources'

export class VentoyResource extends Raw<RawVentoyResource> {
  public readonly windows = new FileResource(this._inner.windows)
  get plugin(): string {
    return this._inner.plugin
  }
}
