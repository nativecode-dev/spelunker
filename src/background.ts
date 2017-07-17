const log = console.log

chrome.browserAction.onClicked
  .addListener((tab: chrome.tabs.Tab): void => log(tab))

chrome.tabs.onActiveChanged
  .addListener((tabId: number, selectInfo: chrome.tabs.TabWindowInfo): void => log(tabId, selectInfo))
