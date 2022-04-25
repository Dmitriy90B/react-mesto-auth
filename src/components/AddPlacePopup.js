import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name="profile-add"
            title="Новое место"
            isOpen={isOpen}
            saveButton="Создать"
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="heading"
                className="popup__input popup__input_profile_heading"
                id="text-card"
                minLength={2}
                maxLength={30}
                autoComplete="off"
                placeholder="Название"
                required
                value={name}
                onChange={handleNameChange}
            />
            <span id="text-card-error" className="error"></span>
            <input
                type="url"
                name="link"
                className="popup__input"
                id="url-card"
                placeholder="Ссылка на картинку"
                required
                value={link}
                onChange={handleLinkChange}
            />
            <span id="url-card-error" className="error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
