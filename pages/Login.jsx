import React, { useState } from 'react';
import { GiBirdHouse } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Alert from '../components/Alert';
import axios from 'axios';

const Login = ({ alert, showAlert, setToken, setUser }) => {
  //* changer password type
  const [passwordType, setPasswordType] = useState('password');
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  //* gérer l'user
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const connectUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/auth/login`,
        userInput
      );
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      navigate('/todo');
    } catch (error) {
      showAlert(error.response.data.msg, 'danger', true);
      localStorage.removeItem('token');
    }
  };

  return (
    <>
      <h2>connexion</h2>
      <div className='formEntire'>
        <div className='alertSection'>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        </div>

        <h3>Veuillez vous connecter pour accèder à votre espace</h3>
        <div className='formContainer'>
          <form action='' onSubmit={handleSubmit}>
            <div className='formRow'>
              <label htmlFor='email'>email</label>
              <input
                type='mail'
                className='formInput'
                name='email'
                value={userInput.email}
                onChange={handleChange}
                placeholder='exemple@mail.com'
              />
            </div>
            <div className='formRow'>
              <label htmlFor='password'>mot de passe</label>
              <input
                type={passwordType}
                onChange={handleChange}
                value={userInput.password}
                name='password'
                className='formInput'
                placeholder='mot de passe'
              />
              <i className='showPassword'>
                {passwordType === 'password' ? (
                  <AiFillEye onClick={togglePassword} />
                ) : (
                  <AiFillEyeInvisible onClick={togglePassword} />
                )}
              </i>
            </div>
            <div className='agreeCont'>
              <button type='submit' onClick={connectUser}>
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
