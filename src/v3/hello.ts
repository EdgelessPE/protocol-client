import { Raw } from './utils'
import { Hello as RawHello } from './raw'
import { Server } from './server'
import { Services } from './service'
import { Plugins } from './plugin'
import { AlphaResource, FileResource } from './resources'
import { HubResource } from './hub'
import { VentoyResource } from './ventoy'

export class Hello extends Raw<RawHello> {
  public readonly server = new Server(this._inner)
  public readonly services = Services.fromRawArray(this._inner.services)
  public readonly plugins = new Plugins(this._inner.plugins)
  public readonly alpha = new AlphaResource(this._inner.alpha)
  public readonly hub = new HubResource(this._inner.hub)
  public readonly iso = new FileResource(this._inner.iso)
  public readonly ventoy = new VentoyResource(this._inner.ventoy)
}
