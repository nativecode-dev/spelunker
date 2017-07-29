import * as nc from '../Index'

import { CloudDeviceDefinition } from './PrinterCapabilities'

export type CapabilityRequestedCallback = (capabilities: PrinterCapabilities) => void
export type PrintersRequestedCallback = (printers: PrinterInfo[]) => void
export type PrintRequestedCallback = (result: string) => void

export type PrinterCapabilities = chrome.printerProvider.PrinterCapabilities
export type PrinterInfo = chrome.printerProvider.PrinterInfo
export type PrintJob = chrome.printerProvider.PrintJob

export type PrintJobHandler = (printJob: PrintJob) => void

const PrinterId: string = 'printer'

export class Printer {
  private readonly handler: PrintJobHandler
  private readonly id: string
  private readonly log: nc.Lincoln
  private readonly name: string

  constructor(id: string, name: string, handler: PrintJobHandler) {
    this.handler = handler
    this.id = id
    this.log = nc.Logger.extend(PrinterId)
    this.name = name
    this.initialize()
  }

  private readonly proxyGetCapabilityRequested = (printerId: string, resultCallback: CapabilityRequestedCallback): void => {
    this.onGetCapabilityRequested(printerId, resultCallback)
  }

  private readonly proxyGetPrintersRequested = (resultCallback): void => {
    this.onGetPrintersRequested(resultCallback)
  }

  private readonly proxyPrintRequested = (printJob: PrintJob, resultCallback: PrintRequestedCallback): void => {
    this.onPrintRequested(printJob, resultCallback)
  }

  private initialize(): void {
    chrome.printerProvider.onGetCapabilityRequested.addListener(this.proxyGetCapabilityRequested)
    chrome.printerProvider.onGetPrintersRequested.addListener(this.proxyGetPrintersRequested)
    chrome.printerProvider.onPrintRequested.addListener(this.proxyPrintRequested)
  }

  private uninitialize(): void {
    chrome.printerProvider.onPrintRequested.removeListener(this.proxyPrintRequested)
    chrome.printerProvider.onGetPrintersRequested.removeListener(this.proxyGetPrintersRequested)
    chrome.printerProvider.onGetCapabilityRequested.removeListener(this.proxyGetCapabilityRequested)
  }

  private onGetCapabilityRequested(printerId: string, resultCallback: CapabilityRequestedCallback): void {
    this.log.debug('onGetCapabilityRequested', printerId, CloudDeviceDefinition)
    resultCallback(CloudDeviceDefinition)
  }

  private onGetPrintersRequested(resultCallback: PrintersRequestedCallback): void {
    const printer: PrinterInfo = {
      description: `Virtual Printer: ${this.name}`,
      id: this.id,
      name: this.name,
    }

    this.log.debug('onGetPrintersRequested', printer)
    resultCallback([printer])
  }

  private onPrintRequested(printJob: PrintJob, resultCallback: PrintRequestedCallback): void {
    this.log.debug('onPrintRequested', printJob)
    resultCallback('OK')
    this.handler(printJob)
  }
}
