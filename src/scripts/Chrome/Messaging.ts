import * as Promise from 'bluebird'

import { Logger } from '../Logging'

export interface Message {
  body: any
  from: string
  id: string
  to: string
}

export interface Response {
  body: any
  from: string
  message: Message
  to: string
}

export class Messenger {
  public static send<T extends Message>(message: T): void {
    chrome.runtime.sendMessage(message)
  }

  public static sendAsync<T extends Message>(message: T): Promise<Response> {
    return new Promise((resolve, reject) => {
      Logger.debug(`sending message "${message.id}"`, message)
      chrome.runtime.sendMessage(message, ((response: any): void => {
        Logger.debug(`repling to "${message.id}"`, response)
        const reply: Response = {
          body: response,
          from: message.to,
          message,
          to: message.from,
        }
        resolve(reply)
      }))
    })
  }
}
