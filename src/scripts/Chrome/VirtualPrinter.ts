type PrinterResults = (printer: chrome.printerProvider.PrinterInfo[]) => void
const onGetPrintersRequested = (results: PrinterResults) => results([{
  id: 'spelunker-virtual-printer',
  name: 'Spelunker Virtual Printer',
}])
chrome.printerProvider.onGetPrintersRequested.addListener(onGetPrintersRequested)

type PrinterCapabilities = (capabilities: any) => void
const onGetCapabilityRequested = (printerId: string, capabilities: PrinterCapabilities) => {}
chrome.printerProvider.onGetCapabilityRequested.addListener(onGetCapabilityRequested)
