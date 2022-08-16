import {useState, useEffect} from "react";
import Add from "../images/add.svg";
import api from "../utils/api";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
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
        </main>);
}

export default Main;