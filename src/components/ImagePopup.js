import React from "react";

function ImagePopup({ card, onClose }) {
    // если компонент невидим, то не отображаем его
    if (!card) return null;

    return (
        <div className={`popup popup_type_image popup_opened`}>
            <div className="popup__container popup__container_text_color">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__subtitle">{card.name}</p>
            </div>
        </div>
    );
}
export default ImagePopup;
