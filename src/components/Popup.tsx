import * as JQuery from 'jquery'
import * as React from 'react'

import * as nc from '../scripts/Index'

export interface IProperties {
  title: string
}

export class Popup extends React.Component<IProperties, {}> {
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
