import * as nc from '../Index'

import { Chain, ChainHandler } from '@nofrills/smorgasbord'

export type MessageServerHandler = (message: any) => nc.Response | null

export interface MessageServerFilter {
  callback: (content: any) => void
  filter: nc.MessageFilter
}

export class MessageServer {
  private readonly filters: MessageServerFilter[] = []
  private readonly log: nc.Lincoln = nc.Logger.extend('message-server')
  private readonly ports: Map<string, chrome.runtime.Port> = new Map<string, chrome.runtime.Port>()
  constructor() {
    chrome.runtime.onConnect.addListener(this.onConnectProxy)
  }

  public handle<T>(filter: string | MessageServerFilter, callback: (content: T) => void): void {
    if (typeof filter === 'string') {
      filter = {
        callback,
        filter: this.parse(filter),
      }
    }
    this.filters.push(filter)
  }

  private readonly onConnectProxy: nc.OnConnectHandler = (port: chrome.runtime.Port): void => this.onConnect(port)
  private readonly onDisconnectProxy: nc.OnDisconnectHandler = (port: chrome.runtime.Port): void => this.onDisconnect(port)
  private readonly onMessageProxy: nc.OnMessageHandler = (message: any, port: chrome.runtime.Port): void => this.onMessage(message, port)

  private onConnect(port: chrome.runtime.Port): void {
    this.log.debug('onConnect', port)
    this.register(port)
  }

  private onDisconnect(port: chrome.runtime.Port): void {
    this.log.debug('onDisconnect', port)
    this.dispose(port)
  }

  private onMessage(message: any, port: chrome.runtime.Port): void {
    this.log.debug('onMessage', message, port)

    if (message.recipient && message.sender && message.tag) {
      const envelope: nc.Envelope = message

      const compare = (key: string, value1: any, value2: any): boolean => {
        return value1[key] && value2[key] && value1[key].toLowerCase() === value2[key].toLowerCase()
      }

      const chains: Chain<nc.Envelope, nc.Envelope> = new Chain<nc.Envelope, nc.Envelope>()
      const filtered: MessageServerFilter[] = this.filters
        .filter(
        (filter: MessageServerFilter): boolean => {
          return Object.keys(filter.filter).every(
            (key: string) => compare(key, filter.filter, envelope)
          )
        })
        .map((filter: MessageServerFilter): MessageServerFilter => {
          chains.add((env: nc.Envelope, next: (obj: nc.Envelope) => Partial<nc.Envelope>) => {
            return env
          })
          return filter
        })

      if (filtered.length) {
        const response: nc.Envelope = chains.execute(envelope)
        this.log.debug('onMessage.response', response)
        port.postMessage(response)
      } else {
        this.log.debug('onMessage.filtered', message)
      }
    }
  }

  private parse(value: string): nc.MessageFilter {
    if (!value || value.length <= 0) {
      return {}
    }

    switch (value[0]) {
      case '@': return { recipient: value.substring(1) }
      case ':': return { sender: value.substring(1) }
      case '~': return { tag: value.substring(1) }
      default: return {}
    }
  }

  private dispose(port: chrome.runtime.Port): void {
    const name: string = port.name
    const existing: chrome.runtime.Port | undefined = this.ports.get(name)
    if (existing) {
      existing.onMessage.removeListener(this.onMessageProxy)
      existing.onDisconnect.removeListener(this.onDisconnectProxy)
      this.ports.delete(name)
    }
  }

  private register(port: chrome.runtime.Port): void {
    this.dispose(port)
    this.ports.set(port.name, port)
    port.onDisconnect.addListener(this.onDisconnectProxy)
    port.onMessage.addListener(this.onMessageProxy)
  }
}
