import { useState } from "react";
import { Link } from 'react-router-dom';


export default function Register({ onRegister }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmitClick() {
    preve
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="auth">
      <form
        className="auth__form"
        name="login"
        noValidate=""
        onSubmit={handleSubmitClick}
      >
        <h2 className="auth__title">Регистрация</h2>
        <fieldset className="auth__input-container">
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={handleChangeEmail}
            className="auth__form-field auth__form-field_input_email"
            required={true}
            placeholder="Email"
          />
          <input
            value={password}
            onChange={handleChangePassword}
            type="password"
            id="login-password"
            className="auth__form-field auth__form-field_input_password"
            placeholder="Пароль"
            required={true}
          />
        </fieldset>
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="auth__description">Уже зарегистрированы? <Link to={'/sign-in'} className='auth__description-link'>Войти</Link></p>
      </form>
    </section >
  )
}