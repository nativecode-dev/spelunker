import '../assets/icon-16.png'
import '../assets/icon-24.png'
import '../assets/icon-32.png'
import '../assets/icon-48.png'
import '../assets/icon-64.png'
import '../assets/icon.png'
import './manifest.json'

import * as nc from '../scripts/Index'
import * as types from './types'

const BackgroundId = 'background'

export class Background {
  private readonly log: nc.Lincoln = nc.Logger.extend(BackgroundId)
  private readonly server: nc.MessageServer
  constructor() {
    this.server = new nc.MessageServer()
    this.server.handle<types.ContentLoaded>('@background', (message: types.ContentLoaded) => this.log.debug(message))
  }
}

export default new Background()
