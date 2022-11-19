export interface Server {
  name: string
  description: string
  protocol: string
  root: string
  property: ServerProperties
}

export interface ReservedServerProperties {
  domestic_server: boolean
  upload_bandwidth: number
  sync_interval: number
  offcial_maintained: boolean
}

export type ServerProperties = Partial<ReservedServerProperties> &
  Record<string, any>

export interface Service {
  name: ServerName
  path: string
}

export type Services = Service[]

export type ServerName = ReservedServiceName | string

export type ReservedServiceName =
  | 'plugin'
  | 'kernel'
  | 'alpha'
  | 'ventoy'
  | 'hub'

export interface Plugins {
  tree: PluginTree
  path: string
}

export type PluginCategory = string

export type PluginTree = Record<PluginCategory, PluginResource[]>

export interface PluginResource {
  name: string
  size: number
  timestamp: number
  integrity: Integrity
}

export interface FileResource {
  version: string
  name: string
  url: string
  timestamp: number
  size: number
  integrity: Integrity
}

export interface Integrity {
  method: string
  value: string
}
export interface CoverResource {
  lower_than: string
  file: FileResource
}

export type ReservedFileResourceKeys = 'kernel'
export type ReservedFileResources = Record<
  ReservedFileResourceKeys,
  FileResource
>

export interface VentoyResource {
  windows: FileResource
  plugin: string
}

export interface AlphaResource {
  kernel_wim?: FileResource
  cover?: CoverResource
}

export interface HubResource {
  latest: HubVersion
  update: HubUpdateOptions
  notices: HubNotices
  packages: HubPackages
}

export type HubPackageKeys = 'update' | 'extended_update' | 'full' | string

export type HubPackages = Record<HubPackageKeys, string>

export type HubNotices = HubNotice[]

export interface HubNotice {
  id: string
  channel: string
  level: string
  message: string
  description: string
  close_text: string
  lower_than: string
  repeat_after: number
}

export interface HubUpdateOptions {
  allow_normal_since: string
  force_update_until: string
  wide_gaps: string[]
}

export interface HubVersion {
  version: string
  page: string
}

export interface Hello extends Server, ReservedFileResources {
  services: Services
  plugins: Plugins
  hub: HubResource
  ventoy: VentoyResource
}

export interface Underline4 extends Underline3 {
  category: string
}

export interface Underline3 {
  name: string
  version: string
  author: string
}

export interface Extname {
  base: string
  attrs: Set<string>
  full: string
}

export type Underline = Underline3 & Partial<Underline4>
export type Underline3Ext = Underline3 & { extname: Extname }
export type Underline4Ext = Underline4 & { extname: Extname }
export type UnderlineExt = Underline & { extname: Extname }
