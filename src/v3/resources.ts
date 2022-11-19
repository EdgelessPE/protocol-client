import { Raw } from './utils'
import {
  FileResource as RawFileResource,
  CoverResource as RawCoverResource,
  AlphaResource as RawAlphaResource,
  Integrity,
} from './raw'

export class FileResource extends Raw<RawFileResource> {
  get version(): string {
    return this._inner.version
  }

  get name(): string {
    return this._inner.name
  }

  get url(): string {
    return this._inner.url
  }

  get size(): number {
    return this._inner.size
  }

  get timestamp(): number {
    return this._inner.timestamp
  }

  integrity(): Readonly<Integrity> {
    return Object.freeze({
      method: this._inner.integrity.method,
      value: this._inner.integrity.value,
    })
  }
}

export class CoverResource extends Raw<RawCoverResource> {
  get minimumVersion(): string {
    return this._inner.lower_than
  }

  public readonly file = new FileResource(this._inner.file)
}

export class AlphaResource extends Raw<RawAlphaResource> {
  public readonly kernel =
    this._inner.kernel_wim != null
      ? new FileResource(this._inner.kernel_wim)
      : undefined

  public readonly cover =
    this._inner.cover != null ? new CoverResource(this._inner.cover) : undefined
}
