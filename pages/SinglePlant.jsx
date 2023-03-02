import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GiArtilleryShell, GiBirdHouse } from 'react-icons/gi';
import axios from 'axios';

const SinglePlant = () => {
  const [plantDetails, setPlantDetails] = useState([]);
  const [sowingInside, setSowingInside] = useState([]);
  const [sowingOutside, setSowingOutside] = useState([]);
  const [plantsFriends, setPlantsFriends] = useState([]);
  const [plantsEnnemies, setPlantsEnnemies] = useState([]);
  const { id } = useParams();
  const url = `${import.meta.env.VITE_URL}/plants/`;

  const getSinglePlant = async () => {
    try {
      const {
        data: {
          plant: plant,
          sowing_inside: sowing_inside,
          sowing_outside: sowing_outside,
          plants_friends: plants_friends_name,
          plants_ennemies: plants_ennemies_name,
        },
      } = await axios.get(`${url}${id}`);
      setPlantDetails(plant);
      if (sowing_inside) {
        setSowingInside(sowing_inside);
      }

      if (sowing_outside) {
        setSowingOutside(sowing_outside);
      }

      if (plants_friends_name) {
        setPlantsFriends(plants_friends_name);
      }
      if (plants_ennemies_name) {
        setPlantsEnnemies(plants_ennemies_name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePlant();
  }, []);
  const {
    plant_name,
    main_img,
    img_inter,
    img_plant,
    plantation_date_start,
    plantation_date_end,
    plantation_details,
    sowing_details,
    crop,
    crop_rotation,
    rows_spacing_in_cm,
    plants_spacing_in_cm,
  } = plantDetails;

  const { sowing_date_start_inside, sowing_date_end_inside } = sowingInside;
  const { sowing_date_start_outside, sowing_date_end_outside } = sowingOutside;

  const { plants_friends_name } = plantsFriends;

  const { plants_ennemies_name } = plantsEnnemies;

  return (
    <>
      <h2>{plant_name}</h2>
      <section
        // style={{
        //   backgroundImage: 'url(' + plantDetails.img + ')',
        //   backgroundAttachment: 'fixed',
        //   backgroundRepeat: 'no-repeat',
        //   backgroundSize: 'cover',
        // }}
        className='singlePlantSection'
      >
        <div className='plantsTitle'>
          <div className='singlePlantPictures'>
            <img
              src={img_plant}
              alt={plant_name}
              className='singlePlantPicture'
            />
            <img
              src={img_inter}
              alt={plant_name}
              className='singlePlantPicture'
            />
            <img
              src={main_img}
              alt={plant_name}
              className='singlePlantPicture'
            />
          </div>{' '}
        </div>
        <div className='underline'></div>

        <div className='plantsDetails'>
          <div className='semisDetails'>
            {sowing_date_start_inside && (
              <h3>
                {' '}
                Les semis se font sous abri du {sowing_date_start_inside} au
                {sowing_date_end_inside}
              </h3>
            )}
            {sowing_date_start_outside && (
              <h3>
                Les semis se font en pleine terre du
                {sowing_date_start_outside} au {sowing_date_end_outside}
              </h3>
            )}

            <p>{sowing_details}</p>
          </div>
          <div className='plantationDetails'>
            <h3>
              La plantation se fait du {plantation_date_start} au
              {plantation_date_end}
            </h3>
            <p>{plantation_details}</p>
            <table>
              <thead>
                <tr>
                  <th>espace conseillé</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>entre les plants</td>
                  <td>{plants_spacing_in_cm} cm</td>
                </tr>
                <tr>
                  <td>entre les lignes</td>

                  <td>{rows_spacing_in_cm} cm</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='culturePlant'>
            <h3>Conseils pour la culture :</h3>
            <p>{crop}</p>
            {crop_rotation && (
              <>
                {' '}
                <h4>
                  <strong>Rotation des cultures :</strong>
                </h4>
                <p>{crop_rotation}</p>
              </>
            )}
          </div>

          {(plants_friends_name || plants_ennemies_name) && (
            <div className='cohabPlants'>
              <h3>Cohabitation</h3>
              {plants_friends_name && (
                <h4>Ce plant pourra cohabiter avec : {plants_friends_name}</h4>
              )}
              {plants_ennemies_name && (
                <>
                  <h4>A contrario, il vaudra mieux éviter de l'associer à :</h4>
                  <p>{plants_ennemies_name}</p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SinglePlant;
