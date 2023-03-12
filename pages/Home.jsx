import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SimpleSlider } from '../components/SimpleSlider';

const Home = () => {
  return (
    <>
      <section className='section'>
        <h2>Accueil</h2>
        <div className='sliderHome'>
          <SimpleSlider />
        </div>
        <div>
          <h3>
            Bienvenue sur le site de l'association Autour Des Jardins De
            Chéreng.
          </h3>
          <p className='introuceText'>
            Ce site vous permettra de mieux connaître l'association et ses
            activités. Il vous offira également la possibilité de vous incrire
            sur notre liste d'attente grâce au formulaire visible sur la page{' '}
            <Link to={'/Contact'} className='linkPage'>
              {' '}
              nous rejoindre
            </Link>
            . Sur cette page, vous trouverez également le mail de l'association
            pour nous contacter sans vous inscrire (en cliquant sur l'adresse
            votre messagerie s'ouvrira automatiquement).
          </p>
          <p>
            Vous aurez également la possibilité de consulter un calendrier du
            potager présenté par nom de plant et classé par ordre
            alphabétiquement à la page{' '}
            <Link to={'/Plantations'} className='linkPage'>
              plantations
            </Link>
          </p>
          <p>
            Les insrcrits pourront accèder à un espace personnel dans lequel ils
            pourront gérer leurs données personnelles, créer leur propre liste
            de tâches et consulter les ressources mises en ligne.
          </p>
          <p>
            Ce site a été créé bénévolement et peut présenter des défauts. Son
            but étant de vous offrir la meilleure expèrience possible, n'hésitez
            pas à nous faire part des problèmes rencontrés avec bienveillance.
            Autour Des Jardins de Chéreng vous souhaite une bonne navigation et
            vous remercie de votre visite.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
