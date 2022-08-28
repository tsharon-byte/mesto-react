import {memo, useContext} from "react";
import Add from "../images/add.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";

const Main = memo(({
                       onEditProfile,
                       onAddPlace,
                       onEditAvatar,
                       onCardClick,
                       cards,
                       onCardLike,
                       onCardDelete,
                       loadingCards
                   }) => {
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="content">
            {!currentUser ? <Spinner/> : <section className="profile">
                <div className="profile__info-group">
                    <div className="avatar">
                        <div className="avatar__picture" style={{backgroundImage: `url(${currentUser.avatar})`}}/>
                        <div className="avatar__button">
                            <button className="image-button avatar__edit-button" type="button"
                                    onClick={onEditAvatar}/>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__title">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="image-button profile__edit-button" type="button"
                                    onClick={onEditProfile}/>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button className="image-button profile__add-button" type="button"><img
                    src={Add}
                    alt="Добавить" onClick={onAddPlace}/></button>
            </section>}
            <section className="elements">
                {loadingCards ? <Spinner/> : cards.map(item => (
                    <Card card={item} key={item._id} onCardClick={onCardClick} onCardLike={onCardLike}
                          onCardDelete={onCardDelete}/>))}
            </section>
        </main>);
});

export default Main;