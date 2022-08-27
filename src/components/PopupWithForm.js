import {memo, useContext} from "react";
import LoadingContext from "../contexts/LoadingContext";

const PopupWithForm = memo(({
                                onSubmit, isOpen, onClose, name, title, buttonText = 'Сохранить',
                                buttonTextLoading = 'Сохранение...', children
                            }) => {
    const loading = useContext(LoadingContext);
    return (
        <div className={`popup ${isOpen && "popup popup_opened"}`} id={name + 'Popup'}>
            <div className="popup__container">
                <form className="form" name={name} id={name + 'Form'} noValidate onSubmit={onSubmit}>
                    <h2 className="form__title">{title}</h2>
                    {children}
                    <button className={`button form__submit ${loading?'form__submit_disabled':''}`}
                            type="submit" disabled={loading}>{loading ? buttonTextLoading : buttonText}</button>
                </form>
                <button className="image-button popup__close-icon" type="button" onClick={onClose}/>
            </div>
        </div>
    )
});
export default PopupWithForm;