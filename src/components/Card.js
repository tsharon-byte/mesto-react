import React from "react";

const Card = ({card, onCardClick}) => (
    <div className="elements__item" onClick={() => onCardClick(card)}>
        <img className="elements__image"
             src={card.link}
             alt='Байкал'/>
        <div className="elements__title">
            <h2 className="elements__name">{card.name}</h2>
            <div className="elements__likes-container">
                <button className="image-button elements__like" type="button"/>
                <span className="elements__likes-count">{card.likes.length}</span>
            </div>
        </div>
        <button className="image-button elements__delete" type="button"/>
    </div>
);
export default Card;