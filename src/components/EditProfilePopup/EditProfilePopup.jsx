import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useEffect, useState, useContext } from 'react';


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    currentUser.name ? setName(currentUser.name) : setName('');
    currentUser.about ? setDescription(currentUser.about) : setDescription('');
  }, [currentUser, isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          type="text"
          id="name-input"
          value={name}
          onChange={handleChangeName}
          className="popup__form-field popup__form-field_input_name"
          name="name"
          required=""
          minLength={2}
          maxLength={40}
          placeholder="Имя"
        />
        <span className="popup__form-input-error name-input-error" />
        <input
          value={description}
          onChange={handleChangeDescription}
          type="text"
          id="about-input"
          className="popup__form-field popup__form-field_input_about"
          name="about"
          placeholder="Профессия"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span className="popup__form-input-error about-input-error" />
      </fieldset>
    </PopupWithForm>
  )
}