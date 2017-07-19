import * as React from 'react';

export interface IProperties {
  title: string
}

export class Popup extends React.Component<IProperties, {}> {
  public render() {
    return (
      <h1>Popup</h1>
    )
  }
}
