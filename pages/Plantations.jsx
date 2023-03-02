import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { GiArtilleryShell, GiBirdHouse } from 'react-icons/gi';
import axios from 'axios';
import PlantsList from '../components/PlantsList';

const Plantations = () => {
  const url = `${import.meta.env.VITE_URL}/plants/`;
  const [plantationsTab, setPlantationsTab] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  let newTab = [...plantationsTab];

  const getAllPlants = async () => {
    if (isLoading) {
      <div>
        <h2>chargement en cours</h2>
      </div>;
    }
    try {
      const { data } = await axios.get(url);
      setPlantationsTab(data.plants);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getAllPlants();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className='plantsSection'>
      <div className='calendarTitle'>
        <h2>Calendrier du potager</h2>
        <input
          type='text'
          placeholder='Chercher un plant'
          value={search}
          onChange={handleChange}
        />
      </div>
      <div className='plantsTab'>
        {newTab
          .filter((plant) => plant.name.includes(search))
          .map((plant) => (
            <PlantsList plant={plant} key={plant.plant_id} />
          ))}
      </div>

      <Link to='/'>
        <span className='backHome'>
          <GiBirdHouse />
        </span>
      </Link>

      <div className='goUp'>
        <a href='#'>
          <FaRegPaperPlane />
        </a>
      </div>
    </section>
  );
};

export default Plantations;
