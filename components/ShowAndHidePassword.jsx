import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function ShowAndHidePassword() {
  const [passwordType, setPasswordType] = useState('password');
  const [passwordInput, setPasswordInput] = useState('');
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  return (
    <>
      <div className='formRow'>
        <input
          type={passwordType}
          onChange={handlePasswordChange}
          value={passwordInput}
          name='password'
          className='formInput'
          placeholder='mot de passe'
        />
        <span className='showPassword'>
          {passwordType === 'password' ? (
            <AiFillEye onClick={togglePassword} />
          ) : (
            <AiFillEyeInvisible onClick={togglePassword} />
          )}
        </span>
      </div>
    </>
  );
}
export default ShowAndHidePassword;
