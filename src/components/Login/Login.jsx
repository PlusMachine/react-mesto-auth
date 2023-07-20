import { useState } from "react";


export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmitClick(e) {
    e.preventDefault();
    onLogin({ password, email });
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
        <h2 className="auth__title">Вход</h2>
        <fieldset className="auth__input-container">
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={handleChangeEmail}
            className="auth__form-field auth__form-field_input_email"
            required={true}
            placeholder="Email"
            minLength="2"
            maxLength="40"
          />
          <input
            value={password}
            onChange={handleChangePassword}
            type="password"
            id="login-password"
            className="auth__form-field auth__form-field_input_password"
            placeholder="Пароль"
            required={true}
            minLength="6"
            maxLength="16"
          />
        </fieldset>
        <button className="auth__button" type="submit">
          Войти
        </button>
      </form>
    </section >
  )
}