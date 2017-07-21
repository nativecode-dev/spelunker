import * as Promise from 'bluebird'

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
  type: string | null
}

export class Messenger {
  public static send<T extends Message>(message: T): void {
    chrome.runtime.sendMessage(message)
  }

  public static sendAsync<T extends Message>(message: T): Promise<Response> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, ((response): void => {
        resolve({
          body: response,
          from: message.to,
          message,
          to: message.from,
          type: response.type || null,
        })
      }))
    })
  }
}
