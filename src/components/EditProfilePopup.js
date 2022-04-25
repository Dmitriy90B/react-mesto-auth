import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleJobChange(e) {
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            saveButton="Сохранить"
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                className="popup__input"
                id="name-card"
                minLength={2}
                maxLength={40}
                autoComplete="off"
                required
                placeholder="Имя"
                value={name || ""}
                onChange={handleNameChange}
            />
            <span id="name-card-error" className="error"></span>
            <input
                type="text"
                name="job"
                className="popup__input"
                id="job-card"
                minLength={2}
                maxLength={200}
                autoComplete="off"
                required
                placeholder="О себе"
                value={description || ""}
                onChange={handleJobChange}
            />
            <span id="job-card-error" className="error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
