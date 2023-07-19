import closeIcon from '../../images/CloseIcon.svg';
import agreeImage from '../../images/agree.svg';
import errorImage from '../../images/error.svg';

export default function InfoTooltip({ name, isOpen, onClose }) {

  const isSucessfull = true;

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container" >
        <div className='popup__info-tooltip-wrapper'>
          <button className="popup__close-button" type="button" onClick={onClose}>
            <img
              className="popup__close-img"
              src={closeIcon}
              alt="Закрыть"
            />
          </button>
          <div className='popup__info-tooltip-union' style={{ backgroundImage: `url(${isSucessfull ? agreeImage : errorImage})` }}> </div>
          <h2 className='popup__info-tooltip-title'>
            {isSucessfull
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
            }</h2>
        </div>
      </div>
    </section >
  )
}