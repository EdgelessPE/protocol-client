import {
  Underline as RawUnderline,
  UnderlineExt as RawUnderlineExt,
  Extname as RawExtname,
} from './raw'
import { compareVersions } from 'compare-versions'
import pathParse from 'path-parse'
import { Raw, ReadonlySet, Wrapped, INNER } from './utils'

export class Underline extends Raw<RawUnderline> {
  get name(): string {
    return this._inner.name
  }

  get version(): string {
    return this._inner.version
  }

  get author(): string {
    return this._inner.author
  }

  get category(): string | undefined {
    return this._inner.category
  }

  compareVersion(y: Underline): 0 | -1 | 1 {
    if (this === y) {
      return 0
    }

    return compareVersions(this.version, y.version)
  }

  toJSON(): string {
    return this.toString()
  }

  toString(defaultCategory?: string): string {
    const category = this.category ?? defaultCategory
    if (typeof category === 'string') {
      return this.toString3() + `_${category}`
    }

    return this.toString3()
  }

  toString3(): string {
    return `${this.name}_${this.version}_${this.author}`
  }

  toString4(replaceCategory?: string): string {
    if (typeof this.category !== 'string') {
      throw new TypeError('Not found category')
    }

    return this.toString3() + `_${replaceCategory ?? this.category}`
  }

  static fromRaw(x: string, category?: string): Underline {
    return new Underline(resolveUnderline(x, category))
  }
}

export const packageExtname = '.7z'

export function resolveExtname(extname: string): RawExtname {
  extname = extname.trim()
  if (!extname.startsWith(packageExtname)) {
    throw new Error('Invalid Extname ' + extname)
  }

  const attrs = new Set<string>(extname.split(''))
  return {
    attrs,
    base: packageExtname,
    full: extname,
  }
}

export class Extname extends Raw<RawExtname> {
  public readonly attrs = new Attrs(this._inner.attrs)
  get full(): string {
    return this._inner.full
  }

  get base(): string {
    return this._inner.base
  }

  static fromRaw(raw: string): Extname {
    return new Extname(resolveExtname(raw))
  }
}

export class Attrs extends ReadonlySet<string> {}

export function resolveUnderline(id: string, category?: string): RawUnderline {
  const s = id.split('_')
  if (s.length < 3) {
    throw new Error('Invalid Id "' + id + '"')
  }
  return {
    name: s[0],
    version: s[1],
    author: s[2],
    category: s[4] ?? category,
  }
}

export function resolveUnderlineExt(
  filename: string,
  category?: string
): RawUnderlineExt {
  const { ext, name } = pathParse(filename)
  const exts = resolveExtname(ext)
  const id = resolveUnderline(name, category)
  return Object.assign(id, { extname: exts })
}

export class UnderlineExt
  extends Underline
  implements Wrapped<RawUnderlineExt>
{
  /** @ingored @internal */
  constructor(
    /** @ingored @internal */ protected readonly _inner: RawUnderlineExt
  ) {
    super(_inner)
    this.extname = new Extname(_inner.extname)
  }

  public readonly extname: Extname

  toFilename3(): string {
    return `${this.toString3()}${this.extname.full}`
  }

  toPureFilename(): string {
    return `${this.toString3()}${this.extname.base}`
  }

  /** @ingored @internal */
  [INNER](): RawUnderlineExt {
    return this._inner
  }

  static fromRaw(s: string, category?: string): UnderlineExt {
    return new UnderlineExt(resolveUnderlineExt(s, category))
  }
}
