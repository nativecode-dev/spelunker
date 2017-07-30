
import * as JQuery from 'jquery'
import * as nc from '../scripts/Index'
import * as types from './types'

const BackgroundId = 'background'
const ContentId = 'content'

export class Content {
  private readonly client: nc.MessageClient
  private readonly log: nc.Lincoln = nc.Logger.extend(ContentId)
  private readonly options: any = { name: ContentId }
  constructor() {
    this.client = new nc.MessageClient(this.factory)
    if (window.location.hostname === 'app.proplogix.com') {
      this.client.send<string>(window.location.hostname, BackgroundId, ContentId)
    }
  }

  private readonly factory = () => chrome.runtime.connect(this.options)
}

export default new Content()
