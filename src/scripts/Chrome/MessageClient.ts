import * as uuid from 'uuidjs'
import * as nc from '../Index'

export class MessageClient {
  private readonly log: nc.Lincoln = nc.Logger.extend('message-client')
  private readonly port: chrome.runtime.Port
  constructor(factory: () => chrome.runtime.Port) {
    this.port = factory()
    this.port.onDisconnect.addListener(this.onDisconnectProxy)
    this.port.onMessage.addListener(this.onMessageProxy)
  }

  public send<T>(body: T, recipient: string, sender: string): void {
    const message: nc.Message<T> = {
      body,
      id: uuid.genV4().toString(),
      recipient,
      sender,
      tag: sender,
    }
    this.log.debug('send', message)
    this.port.postMessage(message)
  }

  private readonly onDisconnectProxy: nc.OnDisconnectHandler = (port): void => this.onDisconnect(port)
  private readonly onMessageProxy: nc.OnMessageHandler = (message, port): void => this.onMessage(message, port)

  private onDisconnect(port: chrome.runtime.Port): void {
    this.log.debug('onDisconnect', port)
    port.onMessage.removeListener(this.onMessageProxy)
    port.onDisconnect.removeListener(this.onDisconnectProxy)
  }

  private onMessage(message: object, port: chrome.runtime.Port): void {
    this.log.debug('onMessage', message, port)
  }
}
