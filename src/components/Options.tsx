import * as React from 'react';

export interface IProperties {
  title: string
}

export class Options extends React.Component<IProperties, {}> {
  public render() {
    return (
      <h1>Options</h1>
    )
  }
}
