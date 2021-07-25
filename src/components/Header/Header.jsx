import React, { useContext } from "react";
import "./Header.css";
import logoDesktop from "../../assets/logo-desktop.svg";
import darkModeLogo from "../../assets/darkModeLogo.svg";
import { AppContext } from "../../context/AppContext";

function Header() {
    //Context
    const { isDarkMode, setIsDarkMode } = useContext(AppContext);

    //Alternate between logoDesktop and darkModeLogo
    const showLogo = () => (isDarkMode ? darkModeLogo : logoDesktop);

    return (
        <div className="header">
            <div className="logo-button-container">
                <img src={showLogo()} alt="Web page logo, a paper sheet with the word gifos inside" className="logo-desktop" />
                <button className="btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                    MODO {isDarkMode ? "LIGHT" : "DARK"}
                </button>
            </div>
            <h1 className="title">
                ¡Inspirate y busca los mejores <span className="gifs-span">GIFS!</span>
            </h1>
        </div>
    );
}

export default Header;
