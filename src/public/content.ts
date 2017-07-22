import { FormHighlighter, FormHighlighters, Logger, Message, Messenger, Response } from '../scripts/Index'

type Sender = chrome.runtime.MessageSender
type Responder = (response: any) => void

type OnMessage = (message: any, sender: Sender, responder: Responder) => void

const handler: OnMessage = (message, sender, responder) => {
  responder('content')
}

chrome.runtime.onMessage.addListener(handler)
