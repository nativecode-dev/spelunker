export * from './MessageClient'
export * from './MessageServer'
export * from './Printer'

export type InstalledDetails = chrome.runtime.InstalledDetails
export type UpdateCheckDetails = chrome.runtime.UpdateCheckDetails

export type Tab = chrome.tabs.Tab
export type TabChangeInfo = chrome.tabs.TabChangeInfo
export type TabUpdated = (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void

export type MessageSender = chrome.runtime.MessageSender
export type MessageSenderResponse = (response: object) => void
export type OnMessageHandler = (message: object, port: chrome.runtime.Port) => void

export type OnConnectHandler = (port: chrome.runtime.Port) => void
export type OnDisconnectHandler = (port: chrome.runtime.Port) => void

export interface Envelope {
  recipient: string
  sender: string
  tag: string
}

export interface Message<T> extends Envelope {
  body: T
  id: string
}

export interface MessageFilter {
  recipient?: string
  sender?: string
  tag?: string
}

export interface Response extends Envelope {
  errors: string[]
  messageId: string
}
