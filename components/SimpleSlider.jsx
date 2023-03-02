import React, { useState } from 'react';
import potager1 from '.././assets/potager1.jpg';
import potager2 from '.././assets/potager2.jpg';
import potager3 from '.././assets/potager3.jpg';
import Loading from './Loading';

export const SimpleSlider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingImg = () => {
    setIsLoading(false);
  };
  {
    isLoading && <Loading />;
  }
  return (
    <div id='carouselExampleIndicators' className='carousel slide'>
      <div className='carousel-indicators'>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='0'
          className='buttonSlider active'
          aria-current='true'
          aria-label='Slide 1'
        ></button>
        <button
          className='buttonSlider'
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='1'
          aria-label='Slide 2'
        ></button>
        <button
          className='buttonSlider'
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='2'
          aria-label='Slide 3'
        ></button>
      </div>
      <div className='carousel-inner'>
        <div className='carousel-item active'>
          <img
            src={potager1}
            className='d-block'
            alt='vue générale du potager'
            onLoad={handleLoadingImg}
          />
        </div>
        <div className='carousel-item'>
          <img
            src={potager2}
            className='d-block'
            alt='vue générale du potager'
            onLoad={handleLoadingImg}
          />
        </div>
        <div className='carousel-item'>
          <img
            src={potager3}
            className='d-block'
            alt='vue générale du potager'
            onLoad={handleLoadingImg}
          />
        </div>
      </div>
      <button
        className='carousel-control-prev'
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide='prev'
      >
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button
        className='carousel-control-next'
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide='next'
      >
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
};
