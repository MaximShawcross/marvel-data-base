import { useEffect, useState } from 'react';

import useMarvelService from '../../services/marvel-service';
import setContent from '../../utils/set-content';

import './random-char.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = (props) =>  {
    const [character, setCharacter] = useState({});
    const {getCharacter, clearError, process, setProcess}  = useMarvelService();    /* our exemplar of service class */

    useEffect(() => {
        updateCharacter();
    }, [])

    const onCharacterLoaded = (character) => {
        setCharacter(item => character);
    }

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000 ) + 1011000);
        getCharacter(id)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
    }

    
    // const errorMassage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || errorMassage)` ? <View character={character}/> : null

    return (
        <div className="randomchar">
            {setContent(process, View, character)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
        )
    
}

const View = ({data}) => {  /* rendering component */

    const {name, description, thumbnail, homepage,  wiki} = data;
    let imgStyle = {'objectFit' : 'cover'}

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style ={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;