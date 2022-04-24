import { useState, useEffect, useCallback } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import Skeleton from '../skeleton/skeleton'

import MarvelService from '../../services/marvel-service';

import './char-info.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null),
          [loading, setLoading] = useState(false),
          [error, setError] = useState(false);

    
    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacter();
    }, [])

    const updateCharacter = useCallback(() => {
        const {charId} = props;
        
        if ( !charId ) {
            return;
        }

        onCharacterLoading();

        marvelService.getCharacter(charId)
            .then(onCharacterLoaded)
            .catch(onError);

        console.log('func runs');
    }, [props.charId]);

    useEffect(() => {
        updateCharacter();        
    }, [updateCharacter])


    const onCharacterLoaded = (char) => {
        setChar(item => char);
        setLoading(item => false);
    }

    const onCharacterLoading = () => {
        setLoading(item => true);
    }

    const onError = (char) => {
        setChar(item => char);
        setLoading(false);
        setError(true);
    }

     
    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMassage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || errorMassage || !char) ? <View character={char}/>: null
    
    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spinner}
            {content} 
        </div>
    )
    
}

const View = ({character}) => {
    const {name, thumbnail, homepage, wiki, comics, description} = character;
    
    let imgStyle = {'objectFit' : 'cover'};
    if (character.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
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