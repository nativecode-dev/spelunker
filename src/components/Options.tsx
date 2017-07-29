import * as React from 'react'

import { ComponentProperties } from './ComponentProperties'

export interface OptionsProperties extends ComponentProperties {
  filters?: {
    blacklist: string[],
    whitelist: string[],
  }
}

export class Options extends React.Component<OptionsProperties, {}> {
  public render() {
    return (
      <h1>Options</h1>
    )
  }
}
