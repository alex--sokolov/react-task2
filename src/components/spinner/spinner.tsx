import React, { Component } from 'react';
import './spinner.scss';

class Spinner extends Component<Readonly<{ isLoading: boolean }>, unknown> {
  render(): React.ReactNode {
    return (
      <div className={`lds-roller ${this.props.isLoading ? '' : 'hidden'}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Spinner;
