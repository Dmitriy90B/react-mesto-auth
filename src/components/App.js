import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";
import InfoTooltip from "./InfoTooltip";

const App = () => {
    const [isEditProfilePopupOpen, setPopupEdit] = useState(false);
    const [isAddPlacePopupOpen, setPopupAdd] = useState(false);
    const [isEditAvatarPopupOpen, setPopupAvatar] = useState(false);
    const [selectedCard, setPopupWithConfirmation] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [isTooltipPopupOpen, setTooltipPopup] = useState(false);
    const [onInfoTooltip, setOnInfoTooltip] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const history = useHistory();

    const signOut = () => {
        removeToken();
        setData({
            email: "",
            password: "",
        });
        setIsLogin(false);
        history.push("/sign-in");
    };

    const handleRegister = (email, password) => {
        auth.register(email, password)
            .then(() => {
                setTooltipPopup(true);
                setOnInfoTooltip(true);
                history.push("/sign-in");
            })
            .catch((res) => {
                console.log(res);
                setTooltipPopup(true);
                setOnInfoTooltip(false);
            });
    };

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then((data) => {
                setToken(data.token);
                setData({
                    email: data.email,
                });
                setIsLogin(true);
                history.replace({ pathname: "/" });
            })
            .catch((res) => {
                console.log(res);
                setTooltipPopup(true);
                setOnInfoTooltip(false);
            });
    };

    useEffect(() => {
        const tokenCheck = () => {
            const jwt = getToken();
            if (jwt) {
                auth.getContent(jwt)
                    .then((res) => {
                        if (res && res.data.email) {
                            setData({
                                email: res.data.email,
                            });
                            setIsLogin(true);
                            history.push("/");
                        } else {
                            history.push("/sign-in");
                        }
                    })
                    .catch((err) => console.error(err));
            }
        };
        tokenCheck();
    }, [history, isLogin]);

    function handleEditClick() {
        setPopupEdit(true);
    }

    const handleAddClick = () => {
        setPopupAdd(true);
    };

    const handleAvatarClick = () => {
        setPopupAvatar(true);
    };

    const handleCardClick = (card) => {
        setPopupWithConfirmation(card);
    };

    const closeAllPopups = () => {
        setPopupEdit(false);
        setPopupAdd(false);
        setPopupAvatar(false);
        setPopupWithConfirmation(null);
        setTooltipPopup(false);
    };

    const handleUpdateUser = (card) => {
        api.replaceUserInfo(card)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка при изменении данных пользователя: ${err}`)
            );
    };

    const handleUpdateAvatar = (card) => {
        api.replaceAvatar(card)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка при изменени на аватар: ${err}`)
            );
    };

    const handleAddPlaceSubmit = (card) => {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка при создание карточки: ${err}`)
            );
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        const changeLikeCardStatus = !isLiked
            ? api.addLike(card._id)
            : api.deleteLike(card._id);
        changeLikeCardStatus
            .then((newCard) => {
                setCards((item) =>
                    item.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(`Ошибка лайка: ${err}`));
    };

    const handleCardDelete = (card) => {
        api.deleteByTrash(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(`Ошибка при клике на корзину: ${err}`));
    };

    useEffect(() => {
        function handleUserInfo() {
            api.getUserInfo()
                .then((item) => {
                    setCurrentUser(item);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        isLogin && handleUserInfo();
    }, [isLogin]);

    useEffect(() => {
        function initialCards() {
            api.getInitialCards()
                .then((item) => {
                    setCards(item);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        isLogin && initialCards();
    }, [isLogin]);

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    signOut={signOut}
                    loggedIn={isLogin}
                    email={data.email}
                />

                <Switch>
                    <ProtectedRoute
                        onEditProfile={handleEditClick}
                        onAddPlace={handleAddClick}
                        onEditAvatar={handleAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        component={Main}
                        loggedIn={isLogin}
                        exact
                        path="/"
                    />

                    <Route path="/sign-in">
                        <Login handleLogin={handleLogin} />
                    </Route>

                    <Route path="/sign-up">
                        <Register handleRegister={handleRegister} />
                    </Route>

                    <Route>
                        {isLogin ? (
                            <Redirect to="/" />
                        ) : (
                            <Redirect to="/sign-in" />
                        )}
                    </Route>
                </Switch>

                {isLogin && <Footer />}

                <InfoTooltip
                    isOpen={isTooltipPopupOpen}
                    onClose={closeAllPopups}
                    onInfoTooltip={onInfoTooltip}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
};

export default App;
