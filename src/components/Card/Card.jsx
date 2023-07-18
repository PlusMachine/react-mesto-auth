import { useContext } from "react";
import basket from "../../images/basket.svg";
import like from "../../images/like.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onBasketClick }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card)
  }

  function handleCardLike() {
    onCardLike(card)
  }

  function handleBasketClick() {
    onBasketClick(card)
  }

  return (
    <li className="elements__element" key={card._id}>
      {isOwn &&
        <button className="elements__basket-button" type="button">
          <img
            src={basket}
            alt="удалить"
            className="elements__basket"
            onClick={handleBasketClick}
          />
        </button>
      }
      <img src={card.link} alt={card.name} className="elements__image" onClick={handleClick} />
      <div className="elements__text-container">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like">
          <button className="elements__like-button" type="button" onClick={handleCardLike}>
            <img
              src={like}
              alt="нравится"
              className={isLiked ? "elements__like-icon elements__like-icon_active" : "elements__like-icon"}
            />
          </button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}