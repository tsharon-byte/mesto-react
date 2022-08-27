import {useRef, memo} from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = memo(({isOpen, onClose, onUpdateAvatar}) => {
    const avatarRef = useRef('');

    const handleAvatarSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        avatarRef.current.value = '';
    }
    return (
        <PopupWithForm name='avatarEdit' title='Обновить аватар' isOpen={isOpen}
                       onClose={onClose} onSubmit={handleAvatarSubmit}>
            <input className="input form__name" id="avatar" name="avatar"
                   placeholder="URL аватара" required type="link" ref={avatarRef}/>
            <span className="form__error" id="avatar-error"> </span>
        </PopupWithForm>
    );
});
export default EditAvatarPopup;