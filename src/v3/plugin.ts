import { Raw, ReadonlyRecord, ReadonlyList } from './utils'
import {
  PluginResource as RawPluginResource,
  Plugins as RawPlugins,
  PluginTree as RawPluginTree,
} from './raw'
import { UnderlineExt } from './underline'
export class PluginResource extends Raw<RawPluginResource> {
  constructor(_raw: RawPluginResource, private readonly _category?: string) {
    super(_raw)
  }

  get category(): string | undefined {
    return this._category
  }

  get filename(): string {
    return this._inner.name
  }

  public readonly underline: UnderlineExt = UnderlineExt.fromRaw(
    this.filename,
    this.category
  )

  get size(): number {
    return this._inner.size
  }

  get timestamp(): number {
    return this._inner.timestamp
  }

  get hash(): string {
    return this._inner.hash
  }
}

export class PluginList extends ReadonlyList<PluginResource> {
  static fromRawArray(x: RawPluginResource[], category?: string): PluginList {
    return new PluginList(x.map((v) => new PluginResource(v, category)))
  }
}

export class PluginTree extends ReadonlyRecord<
  Record<string, PluginList | undefined>
> {
  static fromRawRecord(x: RawPluginTree): PluginTree {
    return new PluginTree(
      Object.fromEntries(
        Object.entries(x).map(([key, list]) => [
          key,
          PluginList.fromRawArray(list, key),
        ])
      )
    )
  }
}

export class Plugins extends Raw<RawPlugins> {
  public readonly tree = PluginTree.fromRawRecord(this._inner.tree)
  get path(): string {
    return this._inner.path
  }
}
