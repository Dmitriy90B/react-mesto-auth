import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const handleClick = () => {
        onCardClick(card);
    } 

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__trash ${isOwn ? 'elements__trash_visible' : 'elements__trash_hidden'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__like ${isLiked && 'elements__like_active'}`
    );

    return (
        <li className="elements__position">
            <img
                className="elements__item"
                onClick={handleClick}
                src={card.link}
                alt={card.name}
            />
            <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
            <div className="elements__text">
                <h3 className="elements__title">{card.name}</h3>
                <div>
                    <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
                    <p className="elements__likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
