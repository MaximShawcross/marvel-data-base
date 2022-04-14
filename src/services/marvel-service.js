class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=9c06721a7eb962698686f9911f07dd04";
    _baseOffset = 210;

    getResources = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`cloud not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter); /* call __transformCharacter func for every character(item) */
    }

    getCharacter = async (id) => { /* using getResourses for get data from server, then set data to res variable, and then call bottom func*/
        const  res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`); /*  */
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {        /* return object of character, for setState*/

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

    
}

export default MarvelService;