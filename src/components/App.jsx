import Header from './Header/Header';
import Login from './Login/Login';
import Register from './Register/Register'
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ImagePopup from './ImagePopup/ImagePopup';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import { useCallback, useEffect, useState } from 'react';
import api from '../utils/api';
import CurrentUserContext from './contexts/CurrentUserContext';
import PopupWithConfirmation from './ConfirmationPopup/ConfirmationPopup';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import * as auth from '../utils/auth';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [isSucessfull, setIsSucessfull] = useState(false);

  const [cards, setCards] = useState([])

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function deleteCard(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    }).catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleLogin({ password, email }) {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setIsSucessfull(false);
        console.error(error);
      });
  }

  function handleRegister({ password, email }) {
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          navigate("/sign-in");
          setIsInfoTooltipOpen(true);
          setIsSucessfull(true);
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setIsSucessfull(false);
        console.error(error);
      });
  }

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token) {
      auth.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true })
        }
      });
    }
  }, [navigate])

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  useEffect(
    () => {
      setIsLoading(true);
      Promise.all([api.getInitialCards(), api.getUser()])
        .then(([initialCards, user]) => {
          setCurrentUser(user);
          setCards(initialCards);
          setIsLoading(false);
        }
        ).catch((error => console.error(`Ошибка при получении массива карточек или информации о пользователе ${error}`)))
    }, [])

  function handleExit() {
    localStorage.removeItem('token');
    navigate('/sign-in');
    setLoggedIn(false);
    setEmail("");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    isLiked ?
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => (state.map((c) => c._id === card._id ? newCard : c)));
        }).catch((error => console.error(`Ошибка при попытке удаления лайка ${error}`)))
      :
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((error => console.error(`Ошибка при попытке постановки лайка ${error}`)))
  }

  function handleUpdateUser({ name, about }) {
    api.updateProfileInfo(name, about).then(res => { setCurrentUser(res); closeAllPopups() }).catch((error) => console.error(`Ошибка при обновлении профиля ${error}`));
  }


  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar).then((res) => { setCurrentUser(res); closeAllPopups(); }).catch((error => console.error(`Ошибка при попытке сменить аватар ${error}`)));
  }

  function handleAddPlaceSubmit({ title, link }) {
    api.addCard(title, link).then((res) => { setCards([res, ...cards]); closeAllPopups() }).catch((error => console.error(`Ошибка при попытке создать новую карточку ${error}`)))
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-content">
        <Header
          onExit={handleExit}
          email={email}
          loggedIn={loggedIn}
        />

        <Routes>
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/" element={<ProtectedRoute
            element={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            isLoading={isLoading}
            onCardLike={handleCardLike}
            onBasketClick={handleCardDelete}
            loggedIn={loggedIn}
          />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {<InfoTooltip
          isSucessfull={isSucessfull}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />}

        < Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithConfirmation
          name='delete-card'
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={deleteCard}
          card={selectedCard}
          title='Вы уверены?'
          buttonText='Да'
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


