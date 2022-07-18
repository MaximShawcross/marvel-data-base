import { useState, useEffect } from 'react';

import useMarvelService from '../../services/marvel-service';
import setContent from '../../utils/set-content';   

import './char-info.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    const {getCharacter, clearError,  setProcess, process} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [props.charId]);

    const updateCharacter = () => {
        const {charId} = props;
        
        if ( !charId ) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));

        // console.log('func runs');
    };

    const onCharacterLoaded = (char) => {
        // setLoading(false);
        setChar(item => char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
    
}

const View = ({data}) => {
    const {name, thumbnail, homepage, wiki, comics, description} = data;
    
    let imgStyle = {'objectFit' : 'cover'};
    if (data.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return ( 
        <>
            <div className="char__basics">
                <img src = {thumbnail} alt = {name} style = {imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href = {homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href = {wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">              {/* comics list rendering  */}
                {comics.lenght > 0 ? null : "There is no comics for this characters"}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                    if(i >= 10) return;
                        return(                        
                            <li key = {i} className="char__comics-item">
                                {item.name}
                            </li>
                        )                         
                    })
                }
            </ul>
        </>
    )
}


export default CharInfo;