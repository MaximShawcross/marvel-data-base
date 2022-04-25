import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {error, loading, request, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=9c06721a7eb962698686f9911f07dd04";
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter); /* call __transformCharacter func for every character(item) */
    }

    const getCharacter = async (id) => { /* using getResourses for get data from server, then set data to res variable, and then call bottom func*/
        const  res = await request(`${_apiBase}characters/${id}?${_apiKey}`); /*  */
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (character) => {        /* return object of character, for setState*/
        return {
            id: character.id,
            name: character.name, 
            description: character.description ? `${character.description.substring(0, 205)}...}` : "There is no description for this character",
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,     
            homepage: character.urls[0].url, 
            wiki: character.urls[1].url,
            comics: character.comics.items
        }          
    }

    return {
        getAllCharacters,
        getCharacter,
        loading,
        error,
        clearError
    }

    
}

export default useMarvelService;