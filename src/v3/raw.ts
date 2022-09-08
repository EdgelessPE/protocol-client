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

export type ReservedServiceName = 'plugin' | 'iso' | 'alpha' | 'ventoy' | 'hub'

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
  hash: string
}

export interface FileResource {
  version: string
  file_name: string
  url: string
}

export interface CoverResource {
  lower_than: string
  url: string
}

export type ReservedFileResourceKeys = 'iso'
export type ReservedFileResources = Record<
  ReservedFileResourceKeys,
  FileResource
>

export interface VentoyResource {
  windows: FileResource
  plugin: string
}

export interface AlphaResource {
  wim: FileResource
  cover: CoverResource
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
  alpha: AlphaResource
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

export type Underline = Underline3 & Partial<Underline4>
