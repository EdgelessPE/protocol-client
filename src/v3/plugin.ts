import { trimExtname, Raw, ReadonlyRecord, ReadonlyList } from './utils'
import { compareVersions } from 'compare-versions'
import {
  Underline,
  Underline4,
  Underline3,
  PluginResource as RawPluginResource,
  Plugins as RawPlugins,
  PluginTree as RawPluginTree,
} from './raw'

export function resolveId(id: string): Underline {
  const s = id.trim().split('_')
  if (s.length < 3) {
    throw new Error('Invalid Plugin Id')
  }
  return Object.seal({
    name: s[0],
    version: s[1],
    author: s[2],
    category: s[3],
  })
}

export function compareVersion(x: Underline, y: Underline): 0 | -1 | 1 {
  return compareVersions(x.version, y.version)
}

export function withCategory(
  x: Underline,
  defaultCategory: string
): Underline4 {
  const o = Object.assign({}, x)
  o.category ??= defaultCategory
  return o as unknown as Underline4
}

export class PluginResource extends Raw<RawPluginResource> {
  get filename(): string {
    return this._inner.name
  }

  public readonly id = trimExtname(this._inner.name, '.7z')

  public readonly underline: Readonly<Underline3> = resolveId(this.id)

  get name(): string {
    return this.underline.name
  }

  get author(): string {
    return this.underline.author
  }

  get version(): string {
    return this.underline.version
  }

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
  static fromRawArray(x: RawPluginResource[]): PluginList {
    return new PluginList(x.map((v) => new PluginResource(v)))
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
          PluginList.fromRawArray(list),
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
