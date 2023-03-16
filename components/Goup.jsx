import React, { useEffect, useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';

const Goup = () => {
  const [showGoUp, setShowGoUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.pageYOffset > 300 ? setShowGoUp(true) : setShowGoUp(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    showGoUp && (
      <span className='goUp'>
        <a href='#'>
          <FaRegPaperPlane />
        </a>
      </span>
    )
  );
};

export default Goup;
