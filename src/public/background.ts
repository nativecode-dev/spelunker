import '../assets/icon-16.png'
import '../assets/icon-24.png'
import '../assets/icon-32.png'
import '../assets/icon-48.png'
import '../assets/icon-64.png'
import '../assets/icon.png'
import './manifest.json'

import * as nc from '../scripts/Index'

const BackgroundId = 'background'

class Background {
  private readonly client: nc.PortClient = new nc.PortClient((message) => this.onMessage(message))
  private readonly log: nc.Lincoln = nc.Logger.extend(BackgroundId)

  private onMessage(message: nc.Message): nc.Response {
    this.log.debug('onMessage', message)
    return {
      body: { url: message.body.url },
      recipient: message.sender,
      sender: message.recipient || BackgroundId,
      type: nc.MessageType.Acknowledgement,
    }
  }
}

export default new Background()
