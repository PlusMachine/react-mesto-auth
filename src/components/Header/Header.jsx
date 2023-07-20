import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Header({ email, loggedIn, onExit }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        src={logo}
        alt="логотип"
        className="header__logo" />
      <div className='header__info'>
        {
          loggedIn ?
            (<>
              <p className='header__email'>{email}</p>
              <Link className='header__unlogin-button' to="/sign-in" onClick={onExit}>Выйти</Link>
            </>)
            :
            <Link className='header__login-button' to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>{location.pathname === "/sign-in" ? "Регистрация" : "Войти"}</Link>}
      </div>
    </header>
  )
}