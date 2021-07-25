import React, { useContext } from "react";
import "./Results.css";
import { AppContext } from "../../context/AppContext";

function Results() {
    // Context
    const { searchResults, isLoading } = useContext(AppContext);

    //Loading icon/message
    return isLoading ? (
        <>
            <p className="loading-message">Loading...</p>
            <div className="loader"></div>
        </>
    ) : (
        //Search results
        <div className="gifs-container">
            {searchResults.map((results) => {
                return <img key={results.id} src={results.images.downsized_medium.url} className="gifs" alt="Gif resulting of the search" />;
            })}
        </div>
    );
}
export default Results;
