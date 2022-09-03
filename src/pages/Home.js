import Main from "../components/Main";
import Footer from "../components/Footer";
import {useEffect, useState} from "react";
import api from "../utils/api";
import EditProfilePopup from "../components/EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import CardDeleteConfirmationPopup from "../components/CardDeleteConfirmationPopup";
import ImagePopup from "../components/ImagePopup";
import Snackbar from "../components/Snackbar";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingContext from "../contexts/LoadingContext";

const Home = () => {
    const [cards, setCards] = useState([]);
    const [loadingCards, setLoadingCards] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardOpen, setDeleteCardOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [toUpdate, setToUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState('');
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
        setDeleteCardOpen(false);
        setSelectedCard({});
    }
    const handleCardLike = card => {
        if (card && card.likes && currentUser && currentUser._id) {
            const isLiked = card.likes.some(i => i._id === currentUser._id);

            if (!isLiked) {
                setLoading(true);
                api.putCardLikes(card._id).then(() =>
                    setToUpdate(!toUpdate)).catch(err => showError(err)).finally(() => setLoading(false));
            } else {
                setLoading(true);
                api.deleteCardLikes(card._id).then(() =>
                    setToUpdate(!toUpdate)).catch(err => showError(err)).finally(() => setLoading(false));
            }
        }
    };

    const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setEditProfilePopupOpen(true);
    const handleCardDelete = card => {
        setSelectedCard(card);
        setDeleteCardOpen(true);
    };
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
        api.deleteCard(id).then(() => {
            closeAllPopups();
        }).catch(err => showError(err)).finally(() => {
            setLoading(false);
            setToUpdate(!toUpdate)
        });
    };
    const handleUpdateAvatar = data => {
        setLoading(true);
        api.patchAvatar(data).then(res => {
            if (res) {
                setCurrentUser(res);
            }
            closeAllPopups();
        }).catch(err => showError(err)).finally(() => setLoading(false));
    }
    const handleAddPlaceSubmit = newCard => {
        setLoading(true);
        api.postCard(newCard).then(res => {
            setToUpdate(!toUpdate);
            closeAllPopups();
        }).catch(err => showError(err)).finally(() => setLoading(false));
    }
    const showError = (err) => {
        setError(err);
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    useEffect(() => {
        setLoading(true);
        api.getUserInfo().then(user => {
            if (user) {
                setCurrentUser(user);
            }
        }).catch(err => showError(err)).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (currentUser._id) {
            setLoadingCards(true);
            api.getInitialCards().then(data => {
                if (data) {
                    setCards(data.map(({name, link, _id, owner, likes}) => ({
                        name,
                        link,
                        _id,
                        owner,
                        likes
                    })));
                }
            }).catch(err => showError(err)).finally(() => setLoadingCards(false));
        }
    }, [currentUser._id, toUpdate]);
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <LoadingContext.Provider value={loading}>
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                      cards={cards} onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      loadingCards={loadingCards}
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
                                             onSubmit={() => {
                                                 if (selectedCard && selectedCard._id) {
                                                     handleDeleteCard(selectedCard._id);
                                                 }
                                             }}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
                <Snackbar show={error !== ''} error={error}/>
            </LoadingContext.Provider>
        </CurrentUserContext.Provider>);
}
export default Home;