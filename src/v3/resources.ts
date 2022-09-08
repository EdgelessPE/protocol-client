import { Raw } from './utils'
import {
  FileResource as RawFileResource,
  CoverResource as RawCoverResource,
  AlphaResource as RawAlphaResource,
} from './raw'

export class FileResource extends Raw<RawFileResource> {
  get version(): string {
    return this._inner.version
  }

  get filename(): string {
    return this._inner.file_name
  }

  get url(): string {
    return this.url
  }
}

export class CoverResource extends Raw<RawCoverResource> {
  get minimumVersion(): string {
    return this._inner.lower_than
  }

  get url(): string {
    return this._inner.url
  }
}

export class AlphaResource extends Raw<RawAlphaResource> {
  public readonly image = new FileResource(this._inner.wim)
  public readonly cover = new CoverResource(this._inner.cover)
}
