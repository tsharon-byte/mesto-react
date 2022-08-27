import {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Snackbar from "./Snackbar";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingContext from "../contexts/LoadingContext";
import CardDeleteConfirmationPopup from "./CardDeleteConfirmationPopup";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardOpen, setDeleteCardOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [toUpdate, setToUpdate] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        api.getUserInfo().then(user => {
            setCurrentUser(user);
        })
    }, []);
    useEffect(() => {
        api.getInitialCards().then(data => {
            setCards(data.map(({name, link, _id, owner, likes}) => ({
                name,
                link,
                _id,
                owner,
                likes
            })));
        });
    }, [currentUser._id, toUpdate]);
    const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setEditProfilePopupOpen(true);
    const showError = (err) => {
        setError(err);
        setTimeout(() => {
            setError(null);
        }, 3000);
    }
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }
    const handleCardClick = card => {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }
    const handleUpdateUser = data => {
        setLoading(true);
        api.patchUserInfo(data).then(res => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch(err => showError(err)).finally(() => setLoading(false));
    };
    const handleDeleteCard = id => {
        setLoading(true);
        api.deleteCard(id).then(res => {
            closeAllPopups();
        }).catch(err => showError(err)).finally(() => {
            setLoading(false);
            setToUpdate(!toUpdate)
        });
    };
    const handleUpdateAvatar = data => {
        setLoading(true);
        api.patchAvatar(data).then(res => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch(err => showError(err)).finally(() => setLoading(false));
    }
    const handleCardLike = card => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            setLoading(true);
            api.putCardLikes(card._id).then(() =>
                setToUpdate(!toUpdate)).finally(() => setLoading(false));
        } else {
            setLoading(true);
            api.deleteCardLikes(card._id).then(() =>
                setToUpdate(!toUpdate)).finally(() => setLoading(false));
        }
    };
    const handleCardDelete = card => {
        setSelectedCard(card);
        setDeleteCardOpen(true);
    };
    const handleAddPlaceSubmit = newCard => {
        setLoading(true);
        api.postCard(newCard).then(res => {
            setToUpdate(!toUpdate);
            closeAllPopups();
        }).catch(err => showError(err)).finally(() => setLoading(false));
    }
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
        setDeleteCardOpen(false);
        setSelectedCard({});
    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <LoadingContext.Provider value={loading}>
                <div className="page">
                    <Snackbar show={error !== null} error={error}/>
                    <Header/>
                    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                          cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                    />
                    <Footer/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                      onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen}
                                   onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit}/>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                     onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                    <CardDeleteConfirmationPopup isOpen={isDeleteCardOpen}
                                                 onClose={closeAllPopups}
                                                 onSubmit={() => handleDeleteCard(selectedCard._id)}/>
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
                </div>
            </LoadingContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
