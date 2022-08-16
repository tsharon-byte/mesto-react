const ImagePopup = ({card, onClose}) => (
    <div className={`popup popup_large ${card.name && "popup popup_opened popup_large" }`} id="placeViewerPopup">
        <div className="popup__container popup__container_size_large">
            <figure className="figure">
                <img className="popup__image" src={card.link&&card.link} alt={card.name&&card.name}/>
                <figcaption className="figure__caption">{card.name&&card.name}</figcaption>
            </figure>
            <button className="image-button popup__close-icon" type="button" onClick={onClose}/>
        </div>
    </div>
);
export default ImagePopup;