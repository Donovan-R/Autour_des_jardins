import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaParking } from 'react-icons/fa';
import Goup from '../components/Goup';
import {
  GiBirdHouse,
  GiWateringCan,
  GiMushroomHouse,
  GiForestEntrance,
  GiFarmer,
} from 'react-icons/gi';

const About = () => {
  const [overImg, setOverImg] = useState(
    'https://res.cloudinary.com/dlovq0hsk/image/upload/v1678891360/Jardins_plants/divers/cabanon_ext%C3%A9rieur_vhoa1v.jpg'
  );
  return (
    <>
      <section className='section'>
        <h2>À propos</h2>
        <h3>Le mot de la mairie</h3>
        <p>
          Une nouvelle unité de jardins familiaux comprenant 22 parcelles a vu
          le jour en 2013 dans le quartier de l’Autour exactement rue des
          tilleuls. La commune en a confié la gestion et l’animation à
          l’association “Autour Des Jardins de Chéreng” dont le siège social est
          situé en Mairie. Si vous aimez jardiner, profiter d’un espace de
          convivialité en un lieu champêtre, n’hésitez pas à vous adresser à
          l’association.
        </p>
        <h3>Les jardins</h3>
        <article className='aboutArticle'>
          <h4>
            {' '}
            <GiMushroomHouse /> Le cabanon
          </h4>
          <div>
            <img
              src={overImg}
              alt='cabanon'
              className='aboutImg'
              onMouseEnter={() =>
                setOverImg(
                  'https://res.cloudinary.com/dlovq0hsk/image/upload/v1678891362/Jardins_plants/divers/cabanon_h20dnd.jpg'
                )
              }
              onMouseLeave={() =>
                setOverImg(
                  'https://res.cloudinary.com/dlovq0hsk/image/upload/v1678891360/Jardins_plants/divers/cabanon_ext%C3%A9rieur_vhoa1v.jpg'
                )
              }
            />
            <p>
              Chaque parcelle dispose de son propre cabanon. Ainsi, les membres
              peuvent stocker les outils encombrants, des bidons d'eau ou tout
              matériel permettant de cultiver la parcelle dans de bonnes
              conditions. Seule, la lasure est à réaliser par le membre lui-même
              (passez la souris sur l'image pour ouvrir le cabanon).
            </p>
          </div>
        </article>
        <article className='aboutArticle'>
          <h4>
            <GiWateringCan /> Le récupérateur d'eau
          </h4>
          <div>
            <p>
              Jouxtant le cabanon, les jardiniers ont aussi à leur disposition
              un récupérateur d'eau d'une capacité de 350L. Une pompe a
              également été mise en place récemment pour faciliter l'arrosage.
            </p>
            <img
              src='https://res.cloudinary.com/dlovq0hsk/image/upload/v1678891360/Jardins_plants/divers/r%C3%A9cup%C3%A9rateur_eau_u6xxr7.jpg'
              alt="récupérateur d'eau"
              className='aboutImg'
            />
          </div>
        </article>
        <article className='aboutArticle'>
          <h4>
            <FaParking /> Le parking
          </h4>
          <div>
            <img
              src='https://res.cloudinary.com/dlovq0hsk/image/upload/v1678891361/Jardins_plants/divers/parking_potager_zblyll.jpg'
              alt='parking'
              className='aboutImg'
            />
            <p>
              Devant les jardins, un parking est accessible depuis la rue des
              tilleuls. Aussi, nul besoin de circuler à brouette dans les rues
              de Chéreng pour transporter son matériel.
            </p>
          </div>
        </article>
        <article className='aboutArticle'>
          <h4>
            <GiForestEntrance /> L'entrée des jardins
          </h4>
          <div>
            <p>
              Deux portillons permettent l'accès aux jardins. Ici l'entrée
              depuis le parking. Pour éviter l'entrée de nuisibles, il est
              demandé de bien veiller à la fermeture de ces derniers à chaque
              passage.
            </p>{' '}
            <img
              src='https://res.cloudinary.com/dlovq0hsk/image/upload/v1678891362/Jardins_plants/divers/entr%C3%A9e_potager_vbbxv8.jpg'
              alt='entrée'
              className='aboutImg'
            />
          </div>
        </article>
        <article className='aboutArticle'>
          <h4>
            <GiFarmer /> Le fumier
          </h4>
          <div>
            <img
              src='https://res.cloudinary.com/dlovq0hsk/image/upload/v1678891361/Jardins_plants/divers/fumier_gfrpnr.jpg'
              alt='fumier'
              className='aboutImg'
            />
            <p>
              Du fumier est mis à disposition après la belle saison pour les
              membres voulant en recouvrir leur terre. Le fumier est déposé sur
              le parking près du portillon.
            </p>{' '}
          </div>
        </article>

        <Link to='/'>
          <span className='backHome'>
            <GiBirdHouse />
          </span>
        </Link>

        <Goup />
      </section>
    </>
  );
};

export default About;
