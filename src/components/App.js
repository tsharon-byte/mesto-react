import {useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
    const handleCardClick = card => {
        setSelectedCard(card);
    }
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({});
    }
    return (
        <div className="page">
            <div className="snackbar"/>
            <Header/>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
            <Footer/>

            <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}>
                <input className="input form__name" id="name" name="name" type="text" required minLength="2"
                       maxLength="40" placeholder="Имя"/>
                <span className="form__error" id="name-error"> </span>
                <input className="input form__description" id="about" name="about" type="text" required
                       minLength="2" maxLength="200" placeholder="Профессия"/>
                <span className="form__error" id="about-error"> </span>
            </PopupWithForm>
            <PopupWithForm name='placeAdd' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                           buttonText='Создать'>
                <input className="input form__name" id="place-name" name="placeName" type="text"
                       placeholder="Название места" required minLength="2" maxLength="30"/>
                <span className="form__error" id="place-name-error"> </span>
                <input className="input form__description" id="place-url" name="placeUrl" type="url"
                       placeholder="URL"
                       required/>
                <span className="form__error" id="place-url-error"> </span>
            </PopupWithForm>
            <PopupWithForm name='avatarEdit' title='Обновить аватар' isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}>
                <input className="input form__name" id="avatar" name="avatar"
                       placeholder="URL аватара" required type="url"/>
                <span className="form__error" id="avatar-error"> </span>
            </PopupWithForm>
            <PopupWithForm name='cardDelete' title='Вы уверены?' buttonText='Да'>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
    );
}

export default App;
