import React from 'react';

function PopupWithForm({name, isOpen, onClose, title, children, saveButton, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
            <button type="button" className="popup__close" onClick={onClose}></button>
            <form onSubmit={onSubmit} name={name} className="popup__form">
                <h2 className="popup__profile">{title}</h2>
                {children}
                <button type="submit" className="popup__save-button">{saveButton}</button>
            </form>
            </div>
        </div>
    );
}
export default PopupWithForm;