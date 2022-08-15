import React, {useState, useEffect} from "react";
import Add from "../images/add.svg";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import Card from "./Card";

function Main({
                  onEditProfile, onAddPlace, onEditAvatar, isEditProfilePopupOpen,
                  isAddPlacePopupOpen, isEditAvatarPopupOpen, onClose, selectedCard, onCardClick
              }) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getUserInfo().then(user => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
            api.getInitialCards().then(data => {
                setCards(data.map(({name, link, _id, owner, likes}) => ({
                    name,
                    link,
                    _id,
                    ownerId: owner._id,
                    userId: user._id,
                    likes
                })));
            });
        })
    }, []);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info-group">
                    <div className="avatar">
                        <div className="avatar__picture" style={{backgroundImage: `url(${userAvatar})`}}/>
                        <div className="avatar__button">
                            <button className="image-button avatar__edit-button" type="button"
                                    onClick={onEditAvatar}/>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__title">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="image-button profile__edit-button" type="button"
                                    onClick={onEditProfile}/>
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button className="image-button profile__add-button" type="button"><img
                    src={Add}
                    alt="Добавить" onClick={onAddPlace}/></button>
            </section>
            <section className="elements">
                {cards.map(item => (<Card card={item} key={item._id} onCardClick={onCardClick}/>))}
            </section>
            <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen}
                           onClose={onClose}>
                <input className="input form__name" id="name" name="name" type="text" required minLength="2"
                       maxLength="40" placeholder="Имя"/>
                <span className="form__error" id="name-error"> </span>
                <input className="input form__description" id="about" name="about" type="text" required
                       minLength="2" maxLength="200" placeholder="Профессия"/>
                <span className="form__error" id="about-error"> </span>
            </PopupWithForm>
            <PopupWithForm name='placeAdd' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={onClose}>
                <input className="input form__name" id="place-name" name="placeName" type="text"
                       placeholder="Название места" required minLength="2" maxLength="30"/>
                <span className="form__error" id="place-name-error"> </span>
                <input className="input form__description" id="place-url" name="placeUrl" type="url"
                       placeholder="URL"
                       required/>
                <span className="form__error" id="place-url-error"> </span>
            </PopupWithForm>
            <PopupWithForm name='avatarEdit' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={onClose}>
                <input className="input form__name" id="avatar" name="avatar"
                       placeholder="URL аватара" required type="url"/>
                <span className="form__error" id="avatar-error"> </span>
            </PopupWithForm>
            <PopupWithForm name='cardDelete' title='Вы уверены?'>
            </PopupWithForm>
            {selectedCard && <ImagePopup card={selectedCard} onClose={onClose}/>}
        </main>);
}

export default Main;