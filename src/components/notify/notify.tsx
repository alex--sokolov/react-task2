import React, { Component } from 'react';
import './notify.scss';
import { NotifyType } from '../../interfaces';

class Notify extends Component<
  Readonly<{ isShow: boolean; message: string; type: NotifyType }>,
  unknown
> {
  render(): React.ReactNode {
    return (
      <div className={`notify ${this.props.type} ${this.props.isShow ? 'show' : ''}`}>
        {this.props.message}
      </div>
    );
  }
}

export default Notify;
