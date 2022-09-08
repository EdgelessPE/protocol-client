import { Raw, ReadonlyList, ReadonlyRecord } from './utils'
import {
  HubVersion as RawHubVersion,
  HubUpdateOptions as RawHubUpdateOptions,
  HubNotice as RawHubNotice,
  HubResource as RawHubResource,
} from './raw'

export class HubVersion extends Raw<RawHubVersion> {
  get version(): string {
    return this._inner.version
  }

  get page(): string {
    return this._inner.page
  }
}

export class WideGaps extends ReadonlyList<string> {}

export class HubUpdateOptions extends Raw<RawHubUpdateOptions> {
  public readonly wideGaps = new WideGaps(this._inner.wide_gaps)
  get allowNormalSince(): string {
    return this._inner.allow_normal_since
  }

  get forceUpdateUntil(): string {
    return this._inner.force_update_until
  }
}

export class HubNotice extends Raw<RawHubNotice> {
  get id(): string {
    return this._inner.id
  }

  get channel(): string {
    return this._inner.channel
  }

  get level(): string {
    return this._inner.level
  }

  get message(): string {
    return this._inner.message
  }

  get description(): string {
    return this._inner.description
  }

  get closeText(): string {
    return this._inner.close_text
  }

  get lowerThan(): string {
    return this._inner.lower_than
  }

  get repeatAfter(): number {
    return this._inner.repeat_after
  }
}

export class HubNotices extends ReadonlyList<HubNotice> {
  static fromRawArray(x: RawHubNotice[]): HubNotices {
    return new HubNotices(x.map((v) => new HubNotice(v)))
  }
}

export class HubPackages extends ReadonlyRecord<
  Record<string, string | undefined>
> {}

export class HubResource extends Raw<RawHubResource> {
  public readonly latest = new HubVersion(this._inner.latest)
  public readonly update = new HubUpdateOptions(this._inner.update)
  public readonly notices = HubNotices.fromRawArray(this._inner.notices)
  public readonly packages = new HubPackages(this._inner.packages)
}
