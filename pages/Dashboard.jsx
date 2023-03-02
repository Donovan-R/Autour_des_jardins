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
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({
    lastname: '',
    firstname: '',
    mobile: '',
    email: '',
    name: '',
    role_id: '',
    user_id: '',
  });
  const [plantToEdit, setPlantToEdit] = useState({
    name: '',
    plantation_date_start: '',
  });

  let newUsers = [...users];

  const getUsers = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setUsers(data.data);
      // setNewUserInfos(userInfos);
    } catch (error) {
      console.log(error.response.data);
      showAlert(error.reponse.data.msg, 'danger', true);
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
  }, []);

  const getSinglePlantInfos = async (plant_id) => {
    try {
      const {
        data: { plant },
      } = await axios.get(`${url}${plant_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setPlantToEdit({
        name: plant.name,
        plantation_date_start: plant.plantation_date_start,
      });
      console.log(plantToEdit);
    } catch (error) {
      console.log(error.response);
      showAlert(error.response.data.msg, 'danger', true);
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
              <th>téléphone</th>
              <th className='optionalColumn'>adresse électronique</th>
              <th>rôle</th>
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
                  <td>{mobile}</td>
                  <td className='optionalColumn'>{email} </td>
                  <td>{name}</td>
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
      </section>
      <hr />
      {user.name === 'donovan' && user.email === 'donoriviere@gmail.com' && (
        <section>
          <h2>espace réservé à {user.name}</h2>
          <div className='plantsTabDashboard'>
            {plantsTabDashboard.map((plant) => {
              const { name, main_img, plant_id } = plant;
              return (
                <div
                  key={plant_id}
                  className='plantCardDashboard'
                  onClick={() => getSinglePlantInfos(plant_id)}
                >
                  <img
                    src={main_img}
                    alt={name}
                    className='plantPictureDashboard'
                  />
                  <h4>{name}</h4>
                </div>
              );
            })}
            {/* <form className='formEntire'>
              <input
                type='text'
                value={plantToEdit.name}
                className='formInput'
              />
              <input
                type='date'
                className='formInput'
                defaultValue={plantToEdit.plantation_date_start}
              />
            </form> */}
            <form action='' className='addPlantForm'></form>
          </div>
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
            <label htmlFor='fistname'>Prénom</label>
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
