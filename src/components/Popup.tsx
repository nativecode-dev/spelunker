import * as JQuery from 'jquery'
import * as React from 'react'

import { Lincoln, Logger , Message, Messenger, Response } from '../scripts/Index'

export interface IProperties {
  title: string
}

export class Popup extends React.Component<IProperties, {}> {
  private log: Lincoln

  constructor() {
    super()
    this.log = Logger.extend('popup') || Logger
  }

  public render() {
    return (
      <div>
        <h1>Popup</h1>
        <button onClick={(event) => this.print(event)}>Print</button>
      </div>
    )
  }

  private print(event: any): any {
    this.log.debug(event)
    return event
  }
}
