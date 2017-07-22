import '../assets/icon-16.png'
import '../assets/icon-24.png'
import '../assets/icon-32.png'
import '../assets/icon-48.png'
import '../assets/icon-64.png'
import '../assets/icon.png'
import './manifest.json'

import * as spelunker from '../scripts/Index'

type InstalledDetails = chrome.runtime.InstalledDetails
type Tab = chrome.tabs.Tab
type TabChangeInfo = chrome.tabs.TabChangeInfo
type UpdateCheckDetails = chrome.runtime.UpdateCheckDetails

type TabUpdated = (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void

const BackgroundId = 'background'

class Background {
  private log: spelunker.Lincoln = spelunker.Logger.extend('background')

  constructor() {
    chrome.runtime.onBrowserUpdateAvailable.addListener(() => this.onBrowserUpdateAvailable())
    chrome.runtime.onInstalled.addListener((details) => this.onInstalled(details))
    chrome.runtime.onUpdateAvailable.addListener((details) => this.onUpdateAvailable(details))

    chrome.tabs.onUpdated.addListener(this.onUpdated)
  }

  private onBrowserUpdateAvailable(): void {
    spelunker.Logger.debug('browser update available')
  }

  private onInstalled(details: InstalledDetails): void {
    switch (details.reason) {
      case 'install':
      case 'update':
      case 'chrome-update':
      case 'shared_module_updated':
      default:
        spelunker.Logger.debug(details)
        break
    }
  }

  private onUpdateAvailable(details: UpdateCheckDetails): void {
    chrome.runtime.reload()
  }

  private onUpdated(tabId: number, changeInfo: TabChangeInfo, tab: Tab): void {
    const message: spelunker.Message = {
      body: {
        changeInfo,
        tab,
        tabId,
      },
      from: BackgroundId,
      id: BackgroundId,
      to: '*',
    }

    spelunker.Messenger.sendAsync(message)
      .tap((response: spelunker.Response) => this.log.debug(response))
      .catch((error: Error) => this.log.error(error))
  }
}

export default new Background()
