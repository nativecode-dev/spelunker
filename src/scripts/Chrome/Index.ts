export * from './PortClient'
export * from './PortInitiator'

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

export interface Message {
  body: any
  recipient: string
  sender: string
  type: MessageType
}

export enum MessageType {
  Acknowledgement,
  Notification,
}

export interface Response {
  body: any
  recipient: string
  sender: string
  type: MessageType
}
