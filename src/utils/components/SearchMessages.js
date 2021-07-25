import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

//Conditional rendering of messages
function SearchMessages() {
    //Context
    const { resultsMessage, searchResults, isLoading } = useContext(AppContext);

    //Search messages
    const doTheSearch = "Realiza una búsqueda para encontrar tus gifs";
    const notFound = `No se encontraron resultados, por favor intenta de nuevo modificando tu busqueda`;
    const resultsFound = `Resultados de tu búsqueda`;

    //Condition
    if (resultsMessage === false) {
        return [doTheSearch];
    } else if (searchResults.length === 0 && isLoading === false) {
        return [notFound];
    } else {
        return [resultsFound];
    }
}

export default SearchMessages;
