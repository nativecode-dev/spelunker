import * as nc from '../Index'

export type PortClientCallback = (message: any) => nc.Response | null

export class PortClient {
  private readonly callback: PortClientCallback
  private readonly log: nc.Lincoln = nc.Logger.extend('port-client')

  constructor(callback: PortClientCallback) {
    this.callback = callback
    chrome.runtime.onConnect.addListener(this.onConnectProxy)
  }

  private readonly onConnectProxy: nc.OnConnectHandler = (port) => this.onConnect(port)
  private readonly onDisconnectProxy: nc.OnDisconnectHandler = (port) => this.onDisconnect(port)
  private readonly onMessageProxy: nc.OnMessageHandler = (message, port) => this.onMessage(message, port)

  private onConnect(port: chrome.runtime.Port): void {
    this.log.debug('onConnect', port)
    port.onDisconnect.addListener(this.onDisconnectProxy)
    port.onMessage.addListener(this.onMessageProxy)
  }

  private onDisconnect(port: chrome.runtime.Port): void {
    this.log.debug('onDisconnect', port)
    port.onMessage.removeListener(this.onMessageProxy)
    port.onDisconnect.removeListener(this.onDisconnectProxy)
  }

  private onMessage(message: object, port: chrome.runtime.Port): void {
    this.log.debug('onMessage', message, port)
    const response: nc.Response | null = this.callback(message)
    if (response) {
      port.postMessage(response)
    }
  }
}
