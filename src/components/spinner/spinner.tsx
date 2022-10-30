import React from 'react';
import './spinner.scss';

const Spinner = (props: { isLoading: boolean }) => {
  const { isLoading } = props;
  return (
    <div className={`lds-roller ${isLoading ? '' : 'hidden'}`}>
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
};

export default Spinner;
