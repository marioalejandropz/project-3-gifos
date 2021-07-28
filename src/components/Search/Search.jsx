import React, { useState, useEffect, useContext } from "react";
import "./Search.css";
import ilustration from "../../assets/ilustration.svg";
import searchWhiteIcon from "../../assets/search-white.svg";
import searchGrayIcon from "../../assets/search-gray.svg";
import closeIcon from "../../assets/close.svg";
import SearchMessages from "../../utils/components/SearchMessages";
import { AppContext } from "../../context/AppContext";
import { uniqueId } from "lodash";

function Search() {
   // Context
   const { setResultsMessage, setSearchResults, setIsLoading, keyword, setKeyword } = useContext(AppContext);

   //States
   const [searchBtn, setSearchBtn] = useState(false);
   const [suggestions, setSuggestions] = useState([]);
   const [autocomplete, setAutocomplete] = useState([]);

   //Handlers
   const keywordHandler = (e) => {
      let matches = [];
      if (keyword.length > 0) {
         matches = autocomplete.filter((results) => {
            const regex = new RegExp(`^${keyword}`, "gi");
            return results.title.match(regex);
         });
      }
      setSuggestions(matches);
      setKeyword(e.target.value);
   };

   const suggestionsHandler = (keyword) => {
      setKeyword(keyword);
      setSuggestions([]);
      setSearchBtn(!searchBtn);
   };

   // useEffect
   useEffect(() => {
      //Api request
      async function gifRequest() {
         if (searchBtn && keyword.length > 0) {
            const request = async (keyword) =>
               await fetch(
                  `https://api.giphy.com/v1/gifs/search?api_key=9Xeud89q30yZQfwEiPENLc1mDwNYtaqP&q=${keyword}&limit=12&offset=0&rating=g&lang=en`
               );
            try {
               setIsLoading(true);
               setResultsMessage(true);
               const response = await request(keyword);
               const gifs = await response.json();
               setSearchBtn(false);
               setIsLoading(false);
               setSearchResults(gifs.data);
            } catch (error) {
               setSearchBtn(false);
               setIsLoading(false);
               setResultsMessage(false);
               console.log(error);
            }
            //Condition to autocomplete suggestions
         } else {
            const request = async (keyword) =>
               await fetch(
                  `https://api.giphy.com/v1/gifs/search?api_key=JepwNxeR6QzKBpT5WkAVOvDstlSKlduS&q=${keyword}&limit=5&offset=0&rating=g&lang=en`
               );
            try {
               const response = await request(keyword);
               const gifs = await response.json();
               setAutocomplete(gifs.data);
            } catch (error) {
               console.log(error);
            }
         }
      }
      gifRequest();
   }, [searchBtn, keyword, setIsLoading, setResultsMessage, setSearchResults]);

   //Keyboard search
   function keyboardSearch(e) {
      if (e.key === "Enter" && keyword.length > 0) {
         setSearchBtn(!searchBtn);
         setSuggestions([]);
      }
   }

   return (
      <div className="search-container">
         <img src={ilustration} alt="Three people raising their hands and smiling " className="ilustration" />
         <div className="search-bar-container">
            <div className="input-container">
               <div className={`${keyword.length > 0 ? "gray-icon-container" : "hide"}`}>
                  <img src={searchGrayIcon} alt="Gray magnifying glass icon" className="icon-search-gray" onClick={() => setSearchBtn(!searchBtn)} />
               </div>
               <input
                  className="search-bar"
                  type="text"
                  placeholder="Busca gifs"
                  value={keyword}
                  onChange={keywordHandler}
                  onKeyDown={(e) => keyboardSearch(e)}
                  //Clear autocomplete suggestions clicking outside
                  onBlur={() =>
                     setTimeout(() => {
                        setSuggestions([]);
                     }, 100)
                  }
               />
               <div className={`${keyword.length > 0 ? "close-icon-container" : "hide-icon"}`}>
                  <img src={closeIcon} alt="Blue X icon" className="close-icon" onClick={() => setKeyword("")} />
               </div>
               <div className={`${keyword.length > 0 ? "hide-icon" : "icon-search-container"}`}>
                  <img src={searchWhiteIcon} alt="White magnifying glass icon" className="search-icon" onClick={() => setSearchBtn(!searchBtn)} />
               </div>
            </div>
            <hr className={`${keyword.length > 0 ? "divider" : "hide"}`} />
            {/* Autocomplete suggestions */}
            {keyword.length > 0
               ? suggestions &&
                 suggestions.map((suggestions) => (
                    <div key={uniqueId()} className="autocomplete-container">
                       <img
                          key={uniqueId()}
                          src={searchGrayIcon}
                          alt="Gray magnifying glass icon"
                          className="icon-search-autocomplete"
                          onClick={() => setSearchBtn(!searchBtn)}
                       />
                       <div key={suggestions.id} onClick={() => suggestionsHandler(suggestions.title)} className="autocomplete">
                          {suggestions.title}
                       </div>
                    </div>
                 ))
               : null}
         </div>
         <p className="search-results-message">
            {/* Conditional rendering of messages */}
            <SearchMessages />
         </p>
      </div>
   );
}

export default Search;
