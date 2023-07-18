import closeIcon from '../../images/CloseIcon.svg';

export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section className={`popup popup-picture ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img
            className="popup__close-img"
            src={closeIcon}
            alt="Закрыть"
          />
        </button>
        <img src={card.link} alt={card.name} className="popup__img" />
        <h2 className="popup__photo-title">{card.name}</h2>
      </div>
    </section>
  )
}