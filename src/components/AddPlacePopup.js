import {useState, memo} from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = memo(({isOpen, onClose, onSubmit}) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    return (
        <PopupWithForm name='placeAdd' title='Новое место' isOpen={isOpen} onClose={onClose}
                       buttonText='Создать' buttonTextLoading='Создание...' onSubmit={e => {
            e.preventDefault();
            onSubmit({name, link});
        }}>
            <input className="input form__name" id="place-name" name="placeName" type="text"
                   placeholder="Название места" required minLength="2" maxLength="30" value={name}
                   onChange={e => setName(e.target.value)}/>
            <span className="form__error" id="place-name-error"> </span>
            <input className="input form__description" id="place-link" name="placeUrl" type="link"
                   placeholder="URL"
                   required value={link}
                   onChange={e => setLink(e.target.value)}/>
            <span className="form__error" id="place-link-error"> </span>
        </PopupWithForm>
    );
});
export default AddPlacePopup;