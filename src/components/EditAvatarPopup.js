import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="profile-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            saveButton="Сохранить"
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="avatar"
                className="popup__input"
                id="url-avatar"
                placeholder="Ссылка на картинку"
                required
                ref={avatarRef}
            />
            <span id="url-avatar-error" className="error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
