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
  private readonly log: nc.Lincoln
  private readonly printer: nc.Printer
  private readonly server: nc.MessageServer

  constructor() {
    this.log = nc.Logger.extend(BackgroundId)
    this.printer = new nc.Printer('spelunker', 'Spelunker', (job: nc.PrintJob): void => this.printed(job))
    this.server = new nc.MessageServer()
    this.server.handle<types.ContentLoaded>('@background', (message: types.ContentLoaded) => this.log.debug(message))
  }

  private printed(job: nc.PrintJob): void {
    this.log.debug('printed', job)
    // TODO: Upload Blob to server (job.document)
    // SEE: https://stackoverflow.com/questions/13333378/how-can-javascript-upload-a-blob
  }
}

export default new Background()
