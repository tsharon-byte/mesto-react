const PopupWithForm = ({isOpen, onClose, name, title, children}) => (
    <div className={isOpen ? "popup popup_opened" : "popup"} id={name + 'Popup'}>
        <div className="popup__container">
            <form className="form" name={name} id={name + 'Form'} noValidate>
                <h2 className="form__title">{title}</h2>
                {children}
                <button className="button form__submit" type="submit">Сохранить</button>
            </form>
            <button className="image-button popup__close-icon" type="button" onClick={onClose}/>
        </div>
    </div>
);
export default PopupWithForm;