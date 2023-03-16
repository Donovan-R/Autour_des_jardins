import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrTrash } from 'react-icons/gr';
import { FaEdit } from 'react-icons/fa';
import { GiButterflyWarning } from 'react-icons/gi';
import Alert from '../components/Alert';

const Dashboard = ({ alert, showAlert, token, user }) => {
  const url = `${import.meta.env.VITE_URL}/dash/`;
  const urlPlants = `${import.meta.env.VITE_URL}/plants/`;
  const [plantationsTab, setPlantationsTab] = useState([]);
  let plantsTabDashboard = [...plantationsTab];
  const [users, setUsers] = useState([]);
  const [commentsToRead, setCommentsToRead] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [plantEditId, setPlantEditId] = useState('');
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [userToEdit, setUserToEdit] = useState({
    lastname: '',
    firstname: '',
    mobile: '',
    email: '',
    name: '',
    role_id: '',
    user_id: '',
  });
  const [newPlant, setNewPlant] = useState({
    plant_id: '',
    name: '',
    main_img: '',
    img_inter: '',
    img_plant: '',
    harvest_date_start: '',
    harvest_date_end: '',
    plantation_date_start: '',
    plantation_date_end: '',
    plantation_details: '',
    sowing_details: '',
    crop: '',
    crop_rotation: '',
    rows_spacing_in_cm: '',
    plants_spacing_in_cm: '',
    // plants_friends_name: '',
    // plants_ennemies_name: '',
  });
  const [sowingInside, setSowingInside] = useState({
    sowing_date_start_inside: '',
    sowing_date_end_inside: '',
  });
  const [sowingOutside, setSowingOutside] = useState({
    sowing_date_start_outside: '',
    sowing_date_end_outside: '',
  });
  const [plantsFriends, setPlantsFriends] = useState([]);
  const [plantsEnnemies, setPlantsEnnemies] = useState([]);

  let newUsers = [...users];

  const getUsers = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUsers(data.data);
      setCommentsToRead(data.data.filter((user) => user.comments).length);
    } catch (error) {
      console.log(error);
      showAlert('impossible', 'danger', true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      setUsers(users.filter((user) => user.user_id !== id));
      showAlert('utilisateur supprimé', 'danger', true);
      await axios.delete(`${url}${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.response.data);
      showAlert(error.reponse.data.msg, 'danger', true);
    }
  };

  const editUser = (id) => {
    setIsFormOpen(true);
    let userFiltered = newUsers.filter((user) => user.user_id === id);
    setUserToEdit({
      lastname: userFiltered[0].lastname,
      firstname: userFiltered[0].firstname,
      mobile: userFiltered[0].mobile,
      email: userFiltered[0].email,
      role_id: userFiltered[0].role_id,
      name: userFiltered[0].name,
      user_id: userFiltered[0].user_id,
    });
    userFiltered = null;
  };

  const validEditUser = async (e) => {
    e.preventDefault();
    setIsFormOpen(false);
    const id = userToEdit.user_id;
    setUsers(
      newUsers.map((user) =>
        user.user_id === userToEdit.user_id ? (user = userToEdit) : user
      )
    );
    try {
      await axios.put(
        `${url}${id}`,
        { userToEdit },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert('utilisateur modifié avec succès', 'success', true);
    } catch (error) {
      console.log(error.response);
      showAlert(error.response.data.msg, 'danger', true);
    }
    setUserToEdit({
      lastname: '',
      firstname: '',
      mobile: '',
      email: '',
      role_id: '',
      name: '',
      user: '',
    });
  };

  const getAllPlantsAdmin = async () => {
    try {
      const { data } = await axios.get(urlPlants);
      setPlantationsTab(data.plants);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getAllPlantsAdmin();
  }, [newPlant]);

  const getSinglePlantInfos = async (plant_id) => {
    try {
      setIsEditModeActive(true);
      const {
        data: {
          plant: plant,
          sowing_inside: sowing_inside,
          sowing_outside: sowing_outside,
          plants_friends: plants_friends_name,
          plants_ennemies: plants_ennemies_name,
        },
      } = await axios.get(`${url}${plant_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setNewPlant({
        plant_id: plant.plant_id,
        name: plant.name,
        main_img: plant.main_img,
        img_inter: plant.img_inter,
        img_plant: plant.img_plant,
        harvest_date_start: plant.harvest_date_start.slice(0, 10),
        harvest_date_end: plant.harvest_date_end.slice(0, 10),
        plantation_date_start:
          plant.plantation_date_start !== null
            ? plant.plantation_date_start.slice(0, 10)
            : '',
        plantation_date_end:
          plant.plantation_date_end !== null
            ? plant.plantation_date_end.slice(0, 10)
            : '',
        plantation_details: plant.plantation_details,
        sowing_details: plant.sowing_details ? plant.sowing_details : '',
        crop: plant.crop !== undefined ? plant.crop : '',
        crop_rotation: plant.crop_rotation ? plant.crop_rotation : '',
        rows_spacing_in_cm: plant.rows_spacing_in_cm,
        plants_spacing_in_cm: plant.plants_spacing_in_cm,

        // plants_friends_name: plants_friends_name
        //   ? plants_friends_name.plants_friends_name
        //   : '',
        // plants_ennemies_name: plants_ennemies_name
        //   ? plants_ennemies_name.plants_ennemies_name
        //   : '',
      });
      sowing_inside &&
        setSowingInside({
          sowing_date_start_inside: sowing_inside.sowing_date_start
            ? sowing_inside.sowing_date_start.slice(0, 10)
            : '',
          sowing_date_end_inside: sowing_inside.sowing_date_end
            ? sowing_inside.sowing_date_end.slice(0, 10)
            : '',
        });
      sowing_outside &&
        setSowingOutside({
          sowing_date_start_outside: sowing_outside.sowing_date_start
            ? sowing_outside.sowing_date_start.slice(0, 10)
            : '',
          sowing_date_end_outside: sowing_outside.sowing_date_end
            ? sowing_outside.sowing_date_end.slice(0, 10)
            : '',
        });
    } catch (error) {
      console.log(error);
      showAlert(error, 'danger', true);
    }
  };

  // useEffect(() => {
  //   getSinglePlantInfos();
  // }, []);

  const editPlant = async (e) => {
    e.preventDefault();
    const editPlantId = newPlant.plant_id;
    try {
      axios.put(`${urlPlants}${editPlantId}`, {
        newPlant,
        sowingInside,
        sowingOutside,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsEditModeActive(false);
    setNewPlant({
      plant_id: '',
      name: '',
      main_img: '',
      img_inter: '',
      img_plant: '',
      harvest_date_start: '',
      harvest_date_end: '',
      plantation_date_start: '',
      plantation_date_end: '',
      plantation_details: '',
      sowing_details: '',
      crop: '',
      crop_rotation: '',
      rows_spacing_in_cm: '',
      plants_spacing_in_cm: '',
      plants_friends_name: '',
      plants_ennemies_name: '',
    });

    setSowingInside({
      sowing_date_start_inside: '',
      sowing_date_end_inside: '',
    });
    setSowingOutside({
      sowing_date_start_outside: '',
      sowing_date_end_outside: '',
    });
  };

  const cancelEdit = () => {
    setIsEditModeActive(false);
    setNewPlant({
      plant_id: '',
      name: '',
      main_img: '',
      img_inter: '',
      img_plant: '',
      harvest_date_start: '',
      harvest_date_end: '',
      plantation_date_start: '',
      plantation_date_end: '',
      plantation_details: '',
      sowing_details: '',
      crop: '',
      crop_rotation: '',
      rows_spacing_in_cm: '',
      plants_spacing_in_cm: '',
      plants_friends_name: '',
      plants_ennemies_name: '',
    });
    setSowingInside({
      sowing_date_start_inside: '',
      sowing_date_end_inside: '',
    });
    setSowingOutside({
      sowing_date_start_outside: '',
      sowing_date_end_outside: '',
    });
  };

  const addPlant = async (e) => {
    e.preventDefault();
    try {
      axios.post(urlPlants, {
        newPlant,
        sowingInside,
        sowingOutside,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setNewPlant({
      plant_id: '',
      name: '',
      main_img: '',
      img_inter: '',
      img_plant: '',
      harvest_date_start: '',
      harvest_date_end: '',
      plantation_date_start: '',
      plantation_date_end: '',
      plantation_details: '',
      sowing_details: '',
      crop: '',
      crop_rotation: '',
      rows_spacing_in_cm: '',
      plants_spacing_in_cm: '',
      plants_friends_name: '',
      plants_ennemies_name: '',
    });
    setSowingInside({
      sowing_date_start_inside: '',
      sowing_date_end_inside: '',
    });
    setSowingOutside({
      sowing_date_start_outside: '',
      sowing_date_end_outside: '',
    });
  };

  const deletePlant = async (plant_id) => {
    try {
      setPlantationsTab(
        plantsTabDashboard.filter((plant) => plant.plant_id !== plant_id)
      );
      showAlert('plant supprimé', 'danger', true);
      await axios.delete(`${urlPlants}${plant_id}`);
    } catch (error) {
      console.log(error.response.data);
      showAlert(error.reponse.data.msg, 'danger', true);
    }
  };

  return (
    <>
      <section className='dashboardSection'>
        <div className='alertSection'>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        </div>
        <h3 className='warningTitle'>
          <GiButterflyWarning /> Attention toutes les modifications sont
          définitives <GiButterflyWarning />
        </h3>
        <table className='usersTable'>
          <thead>
            <tr>
              <th colSpan='6'>Tableau des utilisateurs</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>prénom</th>
              <th>nom</th>
              <th className='optionalInfo'>téléphone</th>
              <th className='optionalColumn'>adresse électronique</th>
              <th className='optionalColumnBis'>rôle</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {newUsers.map((user) => {
              const {
                user_id: id,
                firstname,
                lastname,
                email,
                mobile,
                role_id,
                name,
              } = user;
              return (
                <tr key={id}>
                  <td>{firstname}</td>
                  <td>{lastname}</td>
                  <td className='optionalInfo'>{mobile}</td>
                  <td className='optionalColumn'>{email} </td>
                  <td className='optionalColumnBis'>{name}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(id)}
                      className='deleteBtn'
                    >
                      <GrTrash />
                    </button>
                    <button onClick={() => editUser(id)} className='editBtn'>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {commentsToRead > 0 && (
          <div>
            <h2>Commentaires</h2>

            {newUsers
              .filter((user) => user.comments)
              .map((user, index) => {
                const { firstname, lastname, email, mobile, comments } = user;

                return (
                  <article className='commentsSection' key={index}>
                    <h4>
                      {firstname} {lastname} a laissé un commentaire :
                    </h4>
                    <p>{comments}</p>
                    <h4>pour lui répondre :</h4>
                    <p>
                      {email} ou {mobile}
                    </p>
                  </article>
                );
              })}
          </div>
        )}
      </section>
      <hr />
      {user.name === 'donovan' && user.email === 'donoriviere@gmail.com' && (
        <section>
          <h2>espace réservé à {user.name}</h2>
          <div className='plantsTabDashboard'>
            {plantsTabDashboard.map((plant) => {
              const { name, main_img, plant_id } = plant;
              return (
                <div key={plant_id} className='plantCardDashboard'>
                  <img
                    src={main_img}
                    alt={name}
                    className='plantPictureDashboard'
                  />

                  <h4>{name} </h4>
                  <div className='plantCardDashboardBtns'>
                    <button
                      className='deleteBtn'
                      onClick={() => deletePlant(plant_id)}
                    >
                      {' '}
                      <GrTrash />
                    </button>
                    <button
                      className='editBtn'
                      onClick={() => getSinglePlantInfos(plant_id)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <form className='addPlantForm'>
            {isEditModeActive ? (
              <h2>Modification d'un plant</h2>
            ) : (
              <h2>Ajout d'un plant</h2>
            )}

            <fieldset className='addPlantCategory'>
              informations générales
              <div className='addPlantNotNullInfos'>
                <div className='formRowDashboard'>
                  <label htmlFor='newPlantName'>nom</label>
                  <input
                    type='text'
                    name='newPlantName'
                    value={newPlant.name}
                    className='formInput'
                    onChange={(e) =>
                      setNewPlant({ ...newPlant, name: e.target.value })
                    }
                  />
                </div>
                <div className='formRowDashboard'>
                  <label htmlFor='mainImage'>Image principale</label>
                  <input
                    type='text'
                    name='mainImage'
                    value={newPlant.main_img}
                    className='formInput'
                    onChange={(e) =>
                      setNewPlant({ ...newPlant, main_img: e.target.value })
                    }
                  />
                </div>
                <div className='formRowDashboard'>
                  <label htmlFor='plantImage'>Image du plant bébé</label>
                  <input
                    type='text'
                    name='plantImage'
                    value={newPlant.img_plant}
                    className='formInput'
                    onChange={(e) =>
                      setNewPlant({ ...newPlant, img_plant: e.target.value })
                    }
                  />
                </div>
                <div className='formRowDashboard'>
                  <label htmlFor='interImage'>Image intermédiaire</label>
                  <input
                    type='text'
                    name='interImage'
                    value={newPlant.img_inter}
                    className='formInput'
                    onChange={(e) =>
                      setNewPlant({ ...newPlant, img_inter: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='previewImages'>
                <img
                  src={newPlant.img_plant}
                  alt={newPlant.name}
                  className='previewImage'
                />
                <img
                  src={newPlant.img_inter}
                  alt={newPlant.name}
                  className='previewImage'
                />
                <img
                  src={newPlant.main_img}
                  alt={newPlant.name}
                  className='previewImage'
                />
              </div>
            </fieldset>
            <fieldset className='addPlantCategory'>
              Récolte
              <div className='formRowDashboard'>
                <label htmlFor='harvest_date_start'>début de récolte</label>
                <input
                  type='date'
                  name='harvest_date_start'
                  value={newPlant.harvest_date_start}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      harvest_date_start: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='harvest_date_end'>fin de récolte</label>
                <input
                  type='date'
                  name='harvest_date_end'
                  value={newPlant.harvest_date_end}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      harvest_date_end: e.target.value,
                    })
                  }
                />
              </div>
            </fieldset>
            <fieldset className='addPlantCategory'>
              {' '}
              Plantation
              <div className='formRowDashboard'>
                <label htmlFor='plantation_date_start'>
                  début de plantation
                </label>
                <input
                  type='date'
                  name='plantation_date_start'
                  value={newPlant.plantation_date_start}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      plantation_date_start: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='plantation_date_end'>fin de plantation</label>
                <input
                  type='date'
                  name='plantation_date_end'
                  value={newPlant.plantation_date_end}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      plantation_date_end: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='plantation_details'>
                  détails pour la plantation
                </label>
                <input
                  type='text'
                  name='plantation_details'
                  value={newPlant.plantation_details}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      plantation_details: e.target.value,
                    })
                  }
                />
              </div>
            </fieldset>

            <fieldset className='addPlantCategory'>
              culture
              <div className='formRowDashboard'>
                <label htmlFor='crop'>Détails sur la culture</label>
                <textarea
                  type='text'
                  name='crop'
                  value={newPlant.crop}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, crop: e.target.value })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='crop_rotation'>Rotation des cultures</label>
                <input
                  type='text'
                  name='crop_rotation'
                  value={newPlant.crop_rotation}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, crop_rotation: e.target.value })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='rows_spacing_in_cm'>
                  espacement des rangs(cm)
                </label>
                <input
                  type='number'
                  name='rows_spacing_in_cm'
                  value={newPlant.rows_spacing_in_cm}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      rows_spacing_in_cm: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='plants_spacing_in_cm'>
                  espacement des plants(cm)
                </label>
                <input
                  type='number'
                  name='plants_spacing_in_cm'
                  value={newPlant.plants_spacing_in_cm}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      plants_spacing_in_cm: e.target.value,
                    })
                  }
                />
              </div>
            </fieldset>
            <fieldset className='addPlantCategory'>
              semis
              <div className='formRowDashboard'>
                <label htmlFor='sowing_date_start_inside'>
                  début des semis sous abri
                </label>
                <input
                  type='date'
                  name='sowing_date_start_inside'
                  value={sowingInside.sowing_date_start_inside}
                  onChange={(e) =>
                    setSowingInside({
                      ...sowingInside,
                      sowing_date_start_inside: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='sowing_date_end_inside'>
                  fin des semis sous abri
                </label>
                <input
                  type='date'
                  name='sowing_date_end_inside'
                  value={sowingInside.sowing_date_end_inside}
                  onChange={(e) =>
                    setSowingInside({
                      ...sowingInside,
                      sowing_date_end_inside: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='sowing_date_start_outside'>
                  début des semis en pleine terre
                </label>
                <input
                  type='date'
                  name='sowing_date_start_outside'
                  value={sowingOutside.sowing_date_start_outside}
                  onChange={(e) =>
                    setSowingOutside({
                      ...sowingOutside,
                      sowing_date_start_outside: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='sowing_date_end_outside'>
                  fin des semis en pleine terre
                </label>
                <input
                  type='date'
                  name='sowing_date_end_outside'
                  value={sowingOutside.sowing_date_end_outside}
                  onChange={(e) =>
                    setSowingOutside({
                      ...sowingOutside,
                      sowing_date_end_outside: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='sowing_details'>Détails pour les semis</label>
                <input
                  type='text'
                  name='sowing_details'
                  value={newPlant.sowing_details}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, sowing_details: e.target.value })
                  }
                />
              </div>
            </fieldset>
            {/* 
            <fieldset className='addPlantCategory'>
              Cohabitation
              <div className='formRowDashboard'>
                <label htmlFor='plants_friends_name'>plants amis</label>
                <input
                  type='text'
                  name='plants_friends_name'
                  value={newPlant.plants_friends_name}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      plants_friends_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRowDashboard'>
                <label htmlFor='plants_ennemies_name'>plants ennemis</label>
                <input
                  type='text'
                  name='plants_ennemies_name'
                  value={newPlant.plants_ennemies_name}
                  onChange={(e) =>
                    setNewPlant({
                      ...newPlant,
                      plants_ennemies_name: e.target.value,
                    })
                  }
                />
              </div>
            </fieldset> */}
            {isEditModeActive ? (
              <div>
                <button onClick={editPlant}>modifier le plant</button>
                <button onClick={cancelEdit}>annuler</button>
              </div>
            ) : (
              <button onClick={addPlant}>créer le plant</button>
            )}
          </form>
        </section>
      )}
      {isFormOpen && (
        <section className='modifyUserSection'>
          <h3 className='warningTitle'>
            <GiButterflyWarning /> Attention toutes les modifications sont
            définitives <GiButterflyWarning />
          </h3>
          <form className='formAdmin'>
            <h3>formulaire de modification de compte</h3>
            <label htmlFor='lastname'>Nom</label>
            <input
              className=''
              type='text'
              name='lastname'
              value={userToEdit.lastname}
              onClick={(e) => e.preventDefault()}
              onChange={(e) =>
                setUserToEdit({ ...userToEdit, lastname: e.target.value })
              }
            />
            <label htmlFor='firstname'>Prénom</label>
            <input
              type='text'
              name='firstname'
              value={userToEdit.firstname}
              onClick={(e) => e.preventDefault()}
              onChange={(e) =>
                setUserToEdit({ ...userToEdit, firstname: e.target.value })
              }
            />
            <label htmlFor='mobile'>téléphone</label>
            <input
              type='text'
              name='mobile'
              value={userToEdit.mobile}
              onClick={(e) => e.preventDefault()}
              onChange={(e) =>
                setUserToEdit({ ...userToEdit, mobile: e.target.value })
              }
            />
            <label htmlFor='email'>adresse électronique</label>
            <input
              type='text'
              name='email'
              value={userToEdit.email}
              onClick={(e) => e.preventDefault()}
              onChange={(e) =>
                setUserToEdit({ ...userToEdit, email: e.target.value })
              }
            />
            <label htmlFor='role'>rôle</label>
            <input
              type='text'
              name='role'
              value={userToEdit.role_id}
              onClick={(e) => e.preventDefault()}
              onChange={(e) =>
                setUserToEdit({ ...userToEdit, role_id: e.target.value })
              }
            />
            <div className='adminFormBtn'>
              <button onClick={validEditUser} className='validBtnAdmin'>
                Valider
              </button>
              <button
                onClick={() => setIsFormOpen(false)}
                className='cancelBtnAdmin'
              >
                Annuler
              </button>
            </div>

            <table className='legendAdmin'>
              <thead>
                <tr>
                  <th colSpan={'2'}>attribution d'un rôle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>droit</th>
                  <th>chiffre</th>
                </tr>
                <tr>
                  <td>utilisateur</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>administrateur</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </form>
        </section>
      )}
    </>
  );
};

export default Dashboard;
