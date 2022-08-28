import {useState, useContext, useEffect, memo} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = memo(({isOpen, onClose, onUpdateUser}) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isOpen}
                       onClose={onClose} onSubmit={handleSubmit}>
            <input className="input form__name" id="name" name="name" type="text" required minLength="2"
                   maxLength="40" placeholder="Имя" value={name} onChange={e => setName(e.target.value)}/>
            <span className="form__error" id="name-error"> </span>
            <input className="input form__description" id="about" name="about" type="text" required
                   minLength="2" maxLength="200" placeholder="Профессия" value={description}
                   onChange={e => setDescription(e.target.value)}/>
            <span className="form__error" id="about-error"> </span>
        </PopupWithForm>
    );
});
export default EditProfilePopup;