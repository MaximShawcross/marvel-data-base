import { Component } from 'react';

import Spinner from '../spinner/spinner';
import MarvelService from '../../services/marvel-service';
import ErrorMassage from '../error-massage/error-massage';

import './random-char.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
    
    state = {
        character: { },
        loading: true,
        error: false
    }
    
    componentDidMount(){
        this.updateCharacter();
    }

    marvelService = new MarvelService(); /* our exemplar of service class */

    onCharacterLoaded = (character) => {
        this.setState({
            character, 
            loading: false
        })
    }

    onError = (character) => {
        this.setState({
            character, 
            loading: false,
            error: true
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000 ) + 1011000);

        this.marvelService
            .getCharacter( id )
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    render() {
        const {character, loading, error} = this.state;
     
        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || errorMassage) ? <View character={character}/> : null

        return (
            <div className="randomchar">
                {errorMassage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                    onClick={this.updateCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({character}) => {  /* rendering component */

    const {name, description, thumbnail, homepage,  wiki} = character;
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