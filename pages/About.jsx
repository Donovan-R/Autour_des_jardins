import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { GiBirdHouse } from 'react-icons/gi';

const About = () => {
  return (
    <>
      <section className='section'>
        <h2>À propos</h2>
        <h3>Les débuts</h3>
        <p>
          Une nouvelle unité de jardins familiaux comprenant 22 parcelles a vu
          le jour en 2013 dans le quartier de l’Autour exactement rue des
          tilleuls. La commune en a confié la gestion et l’animation à
          l’association “Autour Des Jardins de Chéreng” dont le siège social est
          situé en Mairie. Si vous aimez jardiner, profiter d’un espace de
          convivialité en un lieu champêtre, alors n’hésitez pas à vous adresser
          à l’association par courrier
        </p>
        {/* 
        <Link to='/'>
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
    </>
  );
};

export default About;
