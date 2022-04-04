class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=9c06721a7eb962698686f9911f07dd04";

    getResources = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`cloud not fetch ${url}, status: ${(await res).status}`)
        }

        return await res.json();
    }

    getALlCharacters = async () => {
        const res =await this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter); /* call __transformCharacter func for every character(item) */
    }

    getCharacter = async (id) => { /* using getResourses for get data from server, then set data to res variable, and then call bottom func*/
        const  res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`); /*  */
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {        /* return object of character, for setState*/
        if (char.description.length < 5){
            char.description = "We are sorry, we dont have a desctiption for this character, you can check wiki or official web cite"
        }        

        return {
            name: char.name, 
            description: char.description.length < 210 ? 
            char.description: (`${char.description.substring(0, 199)}...`),
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,     
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url
        }          
    }

    
}

export default MarvelService;