import * as nc from '../scripts/Index'

const BackgroundId = 'background'
const ContentId = 'content'

export class Content {
  private readonly initiator: nc.PortInitiator
  private readonly log: nc.Lincoln = nc.Logger.extend(ContentId)
  private readonly options: any = { name: ContentId }
  constructor() {
    this.initiator = new nc.PortInitiator(this.factory)
    this.initiator.send({
      body: { event: 'loaded', url: window.location.toString() },
      recipient: BackgroundId,
      sender: ContentId,
      type: nc.MessageType.Notification,
    })
  }

  private readonly factory = () => chrome.runtime.connect(this.options)
}

export default new Content()
