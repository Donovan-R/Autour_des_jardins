import React from 'react';
import { Link } from 'react-router-dom';
import reglement from '.././assets/Jardins-reglement-interieur.pdf';
import Form from '../components/Form';
import { FaRegPaperPlane } from 'react-icons/fa';
import { GiBirdHouse } from 'react-icons/gi';

const Contact = ({ alert, showAlert, setToken }) => {
  return (
    <section className='contactSection'>
      <h2>Contact</h2>
      <h4>
        Prêt à cultiver votre jardin? Remplissez le formulaire ci-dessous pour
        vous inscrire dans notre liste d'attente. Nous vous recontacterons pour
        savoir si vous êtes toujours intéressé, le moment venu.
      </h4>
      <p>
        Avant tout, consultez le règlement intérieur de l'association{' '}
        <a href={reglement}>ici</a> (vous devrez l'accepter pour finaliser votre
        inscription)
      </p>
      <div className='formEntire'>
        <Form alert={alert} showAlert={showAlert} setToken={setToken} />
      </div>

      {/* <Link to='/'>
        <span className='backHome'>
          <GiBirdHouse />
        </span>
      </Link> */}
      {/* <div className='goUp'>
        <a href='#'>
          <FaRegPaperPlane />
        </a>
      </div> */}
    </section>
  );
};

export default Contact;
