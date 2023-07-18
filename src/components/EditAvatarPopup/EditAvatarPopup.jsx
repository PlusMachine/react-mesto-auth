import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          ref={inputRef}
          type="url"
          id="link-avatar-input"
          className="popup__form-field popup__form-field_input_avatar"
          name="avatar"
          required=""
          placeholder="Ссылка на картинку"
        />
        <span className="popup__form-input-error link-avatar-input-error" />
      </fieldset>
    </PopupWithForm >)
}