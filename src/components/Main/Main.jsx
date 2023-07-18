import { useContext } from 'react';
import addButtonPic from '../../images/add-button.svg';
import editButtonPic from '../../images/EditButton.svg';
import Card from '../Card/Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Spinner from '../Spinner/Spinner';


export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onBasketClick,
  cards,
  isLoading,
}) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile" aria-label="профиль">
        <div className="profile__user">
          <img src={currentUser.avatar ? currentUser.avatar : "#"} alt="аватар" className="profile__image" />
          <button className="profile__button" type="button" onClick={onEditAvatar} />
          <div className="profile__info">
            <div className="profile__personal-data">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : ""}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                <img
                  src={editButtonPic}
                  alt="редактировать профиль"
                  className="profile__edit-button-pic"
                />
              </button>
            </div>
            <p className="profile__profession">{currentUser.about ? currentUser.about : ""}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}>
          <img
            src={addButtonPic}
            alt="добавить"
            className="profile__add-button-pic"
          />
        </button>
      </section>
      <section className="elements" aria-label="фотогалерея">
        {isLoading ? <Spinner /> :
          <ul className="elements__list">
            {
              cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onBasketClick={onBasketClick}
                />
              ))
            }
          </ul>}
      </section>
    </main>
  )
}