import * as nc from '../Index'

type PortFactory = () => chrome.runtime.Port
type PortInterceptorBase<T extends nc.Message, R extends nc.Response> =
  (message: T, next: PortInterceptorResponse<T, R>) => Partial<R>

type PortInterceptor = PortInterceptorBase<nc.Message, nc.Response>
type PortInterceptorResponse<T extends nc.Message, R extends nc.Response> = (message: T) => Partial<R>

interface Interceptors {
  [key: string]: PortInterceptor[]
}

export class PortInitiator {
  private readonly instance: chrome.runtime.Port
  private readonly interceptors: Interceptors = {}
  private readonly log: nc.Lincoln = nc.Logger.extend('port-manager')

  constructor(factory: PortFactory) {
    this.instance = factory()
    this.instance.onDisconnect.addListener(this.onDisconnectProxy)
    this.instance.onMessage.addListener(this.onMessageProxy)
    this.log.debug('constructor', this.instance)
  }

  public get port(): chrome.runtime.Port {
    return this.instance
  }

  public intercept(sender: string, handler: PortInterceptor): void {
    if (this.interceptors[sender] === undefined) {
      this.interceptors[sender] = []
    }
    this.interceptors[sender].push(handler)
  }

  public send<T extends nc.Message>(message: T): void {
    this.log.debug('send', message)
    this.instance.postMessage(message)
  }

  private onDisconnect(port: chrome.runtime.Port): void {
    this.log.debug('onDisconnect', port)
  }

  private onMessage(message: any, port: chrome.runtime.Port): void {
    this.log.debug('onMessage', message, port)
    if (message.sender) {
      const reply = this.pipeline(message, this.interceptors[message.sender])
      const response: nc.Response = Object.assign(message, reply)
      this.log.debug('onMessage.response', response)
    }
  }

  private pipeline(message: any, interceptors: PortInterceptor[]): Partial<nc.Response> {
    const response: Partial<nc.Response> = {}
    return (interceptors || []).reverse()
      .reduce((previous, current, index, array): PortInterceptor => {
        current(message, (m) => previous)
        return current
      }, response)
  }

  private readonly onDisconnectProxy: nc.OnDisconnectHandler = (port): void => this.onDisconnect(port)
  private readonly onMessageProxy: nc.OnMessageHandler = (message, port): void => this.onMessage(message, port)
}
