import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';

const Form = ({ alert, showAlert }) => {
  const [user, setUser] = useState({
    lastname: '',
    firstname: '',
    mobile: '',
    email: '',
    password: '',
    comments: '',
    agree: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSelectedFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const checkboxHandler = (e) => {
    setUser({ ...user, agree: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('justificatif', selectedFile);
    formData.append('lastname', user.lastname);
    formData.append('firstname', user.firstname);
    formData.append('mobile', user.mobile);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('comments', user.comments);
    formData.append('agree', user.agree);
    try {
      await axios.post(`${import.meta.env.VITE_URL}/auth/register`, formData);
      navigate('/login');
    } catch (error) {
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  return (
    <>
      <div className='alertSection'>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      </div>
      <div className='formContainer'>
        <form action='' onSubmit={handleSubmit}>
          <h3>Les champs suivis d'une * sont obligatoires</h3>
          <div className='formRow'>
            <label htmlFor='lastname'>Nom *</label>
            <input
              type='text'
              className='formInput'
              name='lastname'
              placeholder='nom'
              value={user.lastname}
              onChange={handleChange}
            />
          </div>
          <div className='formRow'>
            <label htmlFor='firstname'>Prénom *</label>
            <input
              type='text'
              className='formInput'
              name='firstname'
              placeholder='prénom'
              value={user.firstname}
              onChange={handleChange}
            />
          </div>
          <div className='formRow'>
            <label htmlFor='mobile'>Téléphone *</label>
            <input
              type='tel'
              className='formInput'
              name='mobile'
              placeholder='061011121314'
              value={user.mobile}
              onChange={handleChange}
            />
          </div>
          <div className='formRow'>
            <label htmlFor='email'>Adresse électronique *</label>
            <input
              type='email'
              className='formInput'
              placeholder='example@mail'
              name='email'
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className='formRow'></div>

          <div className='formRow'>
            <label htmlFor='password'>Mot de passe *</label>
            <input
              type='password'
              name='password'
              placeholder='mot de passe'
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className='formRow justificatifRow'>
            <label htmlFor='justificatif'>
              Joindre un justificatif de domicile * (PDF ou image)
            </label>
            <input
              className='justificatifInput'
              type='file'
              name='justificatif'
              onChange={handleSelectedFile}
            />
          </div>
          <div className='formRow'>
            <label htmlFor='comment'>Commentaires</label>
            <textarea
              type='textarea'
              name='comments'
              placeholder="besoin de nous en dire plus ? c'est ici "
              value={user.comments}
              onChange={handleChange}
            />
          </div>
          <div className='agreeBox'>
            <div className='agreeCont'>
              <div>
                <input
                  type='checkbox'
                  id='agree'
                  name='agree'
                  onChange={checkboxHandler}
                  value={user.agree}
                />
                <label htmlFor='agree'>
                  En cochant cette case <b> j'accepte </b> le règlement *
                </label>
              </div>
              <button disabled={!user.agree} className='btn'>
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
