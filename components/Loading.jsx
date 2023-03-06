import React from 'react';
import { Audio } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='loadingPage'>
      <h2>Chargement en cours</h2>
      <Audio
        height='80'
        width='80'
        radius='9'
        color='green'
        ariaLabel='loading'
        wrapperStyle
        wrapperClass
      />
      ;
    </div>
  );
};

export default Loading;
