import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const Account = ({ alert, showAlert, token }) => {
  const [warning, setWarning] = useState(false);
  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userInfos, setUserInfos] = useState({
    lastname: '',
    firstname: '',
    email: '',
    mobile: '',
    id: '',
  });
  const [loading, setLoading] = useState(true);
  const url = 'http://localhost:5000/api/v1/account/';

  const navigate = useNavigate();

  const getUserAccount = async () => {
    try {
      const {
        data: { user: user },
      } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUserInfos({
        lastname: user[0].lastname,
        firstname: user[0].firstname,
        email: user[0].email,
        mobile: user[0].mobile,
        id: user[0].user_id,
      });
      setLoading(false);
      // setNewUserInfos(userInfos);
    } catch (error) {
      console.log(error.response);
      showAlert(error, 'danger', true);
    }
  };

  useEffect(() => {
    getUserAccount();
  }, [token]);

  const deleteAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      showAlert('votre compte a été supprimé', 'danger', true);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        url,
        { userInfos },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert('vos informations ont été modifiées', 'success', true);
    } catch (error) {
      console.log(error);
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const id = userInfos.id;
    try {
      await axios.put(
        `${url}${id}`,
        { originalPassword, newPassword },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setNewPassword('');
      setOriginalPassword('');
      showAlert('votre mot de passe a bien été modifié', 'success', true);
    } catch (error) {
      console.log(error.response.data.msg);
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  if (loading) {
    <p>chargement en cours</p>;
  } else {
    return (
      <>
        <div>
          <h2>
            voici vos informations personnelles {userInfos.firstname}{' '}
            {userInfos.lastname}:
          </h2>
        </div>
        <section className='accountSection'>
          <div className='alertSection'>
            {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          </div>
          <form
            className='formContainer'
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <fieldset>
              <legend>mes informations</legend>
              <div className='formRow'>
                <label htmlFor='lastname'>mon nom</label>
                <input
                  className='formInput'
                  value={userInfos.lastname}
                  name='lastname'
                  type='text'
                  placeholder='nouvelle valeur'
                  onChange={(e) =>
                    setUserInfos({ ...userInfos, lastname: e.target.value })
                  }
                />
              </div>
              <div className='formRow'>
                <label htmlFor='firstname'>mon prénom</label>
                <input
                  value={userInfos.firstname}
                  name='firtsname'
                  type='text'
                  placeholder='nouvelle valeur'
                  onChange={(e) =>
                    setUserInfos({
                      ...userInfos,
                      firstname: e.target.value,
                    })
                  }
                />
              </div>
              <div className='formRow'>
                <label htmlFor='email'>mon adresse électronique</label>
                <input
                  value={userInfos.email}
                  name='email'
                  type='mail'
                  placeholder='nouvelle valeur'
                  onChange={(e) =>
                    setUserInfos({ ...userInfos, email: e.target.value })
                  }
                />
              </div>
              <div className='formRow'>
                <label htmlFor='mobile'>mon numéro de téléphone</label>
                <input
                  value={userInfos.mobile}
                  name='mobile'
                  type='tel'
                  placeholder='nouvelle valeur'
                  onChange={(e) =>
                    setUserInfos({ ...userInfos, mobile: e.target.value })
                  }
                />
              </div>
              <div>
                <button onClick={handleSubmit}>modifier</button>
              </div>
            </fieldset>
          </form>
          <form className='formContainer' onSubmit={changePassword}>
            <fieldset>
              <legend>changer mon mot de passe</legend>
              <label htmlFor='originalPassword'>
                saisissez votre mot de passe actuel
              </label>
              <input
                className='formRow'
                type='password'
                name='originalPassword'
                value={originalPassword}
                onChange={(e) => setOriginalPassword(e.target.value)}
              />
              <br />
              <label htmlFor='newPassword'>
                saisissez votre nouveau mot de passe
              </label>
              <input
                className='formRow'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button>changer de mot de passe</button>
            </fieldset>
          </form>
          <button
            onClick={deleteAccount}
            className='deleteAccountBtn'
            onMouseEnter={() => setWarning(true)}
            onMouseLeave={() => setWarning(false)}
          >
            supprimer mon compte
            {warning && (
              <span className='warningAccount'>
                attention en cliquant sur supprimer, vous supprimerez
                définitivement vos données
              </span>
            )}
          </button>
        </section>
      </>
    );
  }
};

export default Account;
