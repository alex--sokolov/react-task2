import React from 'react';
import './Notify.scss';
import { NotifyType } from '../../../interfaces';

const Notify = (props: { isShow: boolean; message: string; type: NotifyType }) => {
  const { isShow, message, type } = props;
  return (
    <div className={`notify ${type} ${isShow ? 'show' : ''}`} data-testid="notify">
      {message}
    </div>
  );
};

export default Notify;
