/**  @internal */
export const INNER = Symbol('kToInner')

/**  @internal */
export interface Wrapped<T> {
  [INNER]: () => T
}

export function unwrap<T>(t: Wrapped<T>): T {
  if (typeof t[INNER] !== 'function') {
    throw new TypeError('Invalid Wrapped Object')
  }

  return t[INNER]()
}

export abstract class Raw<T> implements Wrapped<T> {
  /**  @internal */
  constructor(/**  @internal */ protected _inner: T) {}

  /**  @internal */
  [INNER](): T {
    return this._inner
  }

  /**  @internal */
  toJSON(): any {
    return {}
  }
}

export abstract class ReadonlySet<T> extends Raw<Set<T>> {
  has(x: T): boolean {
    return this._inner.has(x)
  }

  values(): IterableIterator<T> {
    return this._inner.values()
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values()
  }

  get size(): number {
    return this._inner.size
  }
}

export abstract class ReadonlyList<T> extends Raw<T[]> {
  values(): IterableIterator<T> {
    return this._inner.values()
  }

  keys(): IterableIterator<number> {
    return this._inner.keys()
  }

  entries(): IterableIterator<[number, T]> {
    return this._inner.entries()
  }

  get(i: number): T | undefined {
    return this._inner[i]
  }

  get length(): number {
    return this._inner.length
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values()
  }
}

/**  @internal */
export interface TypedKeyValue<T> {
  get: (<K extends keyof T>(key: K) => T[K]) | (<V = any>(key: string) => V)
  has: <K extends string>(key: K) => boolean
}

/**  @internal */
export type Entries<T, S extends keyof T = keyof T> = S extends S
  ? [
      S,
      NonNullable<[Required<T>[S]] extends [never] ? undefined : Required<T>[S]>
    ]
  : never

export class ReadonlyMap<T extends Record<string, any>, D = unknown>
  extends Raw<Partial<T> & Record<string, any>>
  implements TypedKeyValue<T>
{
  get<K extends keyof T>(key: K): T[K] | undefined
  get(key: string): D | undefined
  get(key: string): any {
    return this._inner[key]
  }

  has<K extends string>(key: K): boolean {
    return (this._inner[key] ?? undefined) !== undefined
  }

  values(): IterableIterator<T[keyof T] | D> {
    return Object.values(this._inner).values()
  }

  entries(): IterableIterator<Entries<T> | [string, D]> {
    return Object.entries(this._inner).values() as any
  }

  keys(): IterableIterator<string> {
    return Object.keys(this._inner).values()
  }

  [Symbol.iterator](): IterableIterator<Entries<T> | [string, D]> {
    return this.entries()
  }
}

export class ReadonlyRecord<T extends Record<string, any>> extends Raw<T> {
  get<K extends keyof T>(key: K): T[K] {
    return this._inner[key]
  }

  has<K extends string>(key: K): boolean {
    return (this._inner[key] ?? undefined) !== undefined
  }

  values(): IterableIterator<NonNullable<T[keyof T]>> {
    return Object.values(this._inner).values()
  }

  entries(): IterableIterator<Entries<T>> {
    return Object.entries(this._inner).values() as any
  }

  keys(): IterableIterator<string> {
    return Object.keys(this._inner).values()
  }

  [Symbol.iterator](): IterableIterator<Entries<T>> {
    return this.entries()
  }
}
