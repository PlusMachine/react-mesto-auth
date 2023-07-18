import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [formValues, setFormValues] = useState({ title: '', link: '' })

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  useEffect(() => {
    setFormValues({ title: '', link: '' })
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: formValues.title, link: formValues.link });

  }


  return (<PopupWithForm
    name='add-card'
    title='Новое место'
    buttonText='Создать'
    isOpen={isOpen}
    onSubmit={handleSubmit}
    onClose={onClose}
  >
    <fieldset className="popup__input-container">
      <input
        type="text"
        id="title-input"
        className="popup__form-field popup__form-field_input_title"
        name="title"
        required=""
        onChange={handleChange}
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={formValues.title}
      />
      <span className="popup__form-input-error title-input-error" />
      <input
        type="url"
        id="link-input"
        onChange={handleChange}
        className="popup__form-field popup__form-field_input_link"
        name="link"
        required=""
        placeholder="Ссылка на картинку"
        value={formValues.link}
      />
      <span className="popup__form-input-error link-input-error" />
    </fieldset>
  </PopupWithForm>)
}
