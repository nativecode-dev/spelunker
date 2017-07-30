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
    this.server.handle<string>(`@${BackgroundId}`, (message: any) => {
      this.log.debug(message)
    })
  }

  private printed(job: nc.PrintJob): void {
    this.log.debug('printed', job)
    // TODO: Upload Blob to server (job.document)
    // SEE: https://stackoverflow.com/questions/13333378/how-can-javascript-upload-a-blob
  }
}

export default new Background()
