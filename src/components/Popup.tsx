import * as JQuery from 'jquery'
import * as React from 'react'
import * as nc from '../scripts/Index'

import { ComponentProperties } from './ComponentProperties'

export interface PopupProperties extends ComponentProperties {
  allowPrinting?: boolean
  allowPrintingToPdf?: boolean
}

export class Popup extends React.Component<PopupProperties, {}> {
  private log: nc.Lincoln

  constructor() {
    super()
    this.log = nc.Logger.extend('popup') || nc.Logger
  }

  public render() {
    return (
      <div>
        <button id="print" onClick={(event) => this.print(event)}>Print</button>
      </div>
    )
  }

  private print(event: any): any {
    return event
  }
}
