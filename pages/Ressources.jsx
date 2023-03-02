import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { GiBirdHouse } from 'react-icons/gi';

const Ressources = () => {
  return (
    <section className='section'>
      <h2>Ressources</h2>
      <h3>
        Cette page est dédiée au partage de ressources liées au jardinage
        (compost, paillage, culture, arrosage, etc.)
      </h3>
      <ul>
        <li>
          Voici un livre en libre accès et téléchargeable au format PDF :
          <a
            href='http://permabox.ressources-permaculture.fr/3-PRODUCTION---SAVOIR-FAIRE-ET-TECHNIQUES/CULTIVER/JARDINAGE/LIVRES/LIVRE_L-abc-du-potager---geste-par-geste_de-R.-Lepage-et-G.-Meudec.pdf'
            target='blank'
          >
            livre sur le potager
          </a>
        </li>
      </ul>
      {/* <Link to='/'>
        <span className='backHome'>
          <GiBirdHouse />
        </span>
      </Link>
      <div className='goUp'>
        <a href='#'>
          <FaRegPaperPlane />
        </a>
      </div> */}
    </section>
  );
};

export default Ressources;
