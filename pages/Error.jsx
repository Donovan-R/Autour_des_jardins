import React from 'react';
import { Link } from 'react-router-dom';
import { GiBirdHouse } from 'react-icons/gi';

const Error = () => {
  return (
    <div className='errorPage'>
      <div>
        <h1>404 page non trouvée</h1>
        <Link to='/'>
          <h3 className='backTitle'>retour à la page d'accueil</h3>
        </Link>
      </div>
    </div>
  );
};

export default Error;
