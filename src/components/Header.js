import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import vector from "../images/vector.svg";

const Header = ({ email, signOut }) => {
    return (
        <header className="header">
            <img className="header__logo" src={vector} alt="Логотип" />
            <Switch>
                <Route path="/sign-in">
                    <Link className="header__link" to="/sign-up">
                        Регистрация
                    </Link>
                </Route>
                <Route path="/sign-up">
                    <Link className="header__link" to="/sign-in">
                        Войти
                    </Link>
                </Route>
                <Route path="/">
                    <div className="header__flex">
                        <p className="header__email">{email}</p>
                        <Link className="header__exit-button" onClick={signOut} to="/sign-in">
                            Выйти
                        </Link>
                    </div>
                </Route>
            </Switch>
        </header>
    );
};

export default Header;
