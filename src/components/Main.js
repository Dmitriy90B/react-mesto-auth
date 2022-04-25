import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img
                    src={currentUser.avatar}
                    alt="Аватар"
                    className="profile__avatar"
                />
                <button
                    type="button"
                    className="profile__avatar-button"
                    onClick={onEditAvatar}
                ></button>
                <div className="profile__user">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__items">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            onCardClick={onCardClick}
                            key={card._id}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
