import React, { useContext } from "react";
import "./App.css";
import "./darkMode.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Results from "./components/Results/Results";
import { AppContext } from "./context/AppContext";

export default function App() {
    //Context
    const { isDarkMode, setIsDarkMode } = useContext(AppContext);

    //Handler
    const darkModeHandler = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <main className={`App ${isDarkMode ? "darkMode" : "lightMode"}`}>
            <div className="general-container">
                <Header isDarkMode={isDarkMode} darkModeHandler={darkModeHandler} />
                <Search />
                <Results />
            </div>
        </main>
    );
}
