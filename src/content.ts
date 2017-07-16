import * as $ from 'jquery'

const listener = (message: string, sender: chrome.runtime.MessageSender, response: (response: any) => void) => {
  console.log(sender.url)
  response(sender.url)
}

chrome.runtime.onMessage.addListener(listener)
