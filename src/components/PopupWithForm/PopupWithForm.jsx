import closeIcon from '../../images/CloseIcon.svg';

export default function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  function handleSubmitClick(e) {
    onSubmit(e);
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img
            className="popup__close-img"
            src={closeIcon}
            alt="Закрыть"
          />
        </button>
        <form
          className="popup__form popup__form-edit"
          name={name}
          noValidate=""
          onSubmit={handleSubmitClick}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button popup__save-button" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </section>
  )
}