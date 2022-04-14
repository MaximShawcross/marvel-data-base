import { Component } from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import Skeleton from '../skeleton/skeleton'

import MarvelService from '../../services/marvel-service';

import './char-info.scss';



class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.unpdateCharacter();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.componentDidMount()
        }
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({error})

    }

    unpdateCharacter = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        }

        this.onCharacterLoading();

        this.marvelService.getCharacter(charId)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    onCharacterLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    onCharacterLoading = () => {
        this.setState({loading: true})
    }

    onError = (char) => {
        this.setState({
            char, 
            loading: false,
            error: true
        })
    }
   
    render() {
        const {char, loading, error} = this.state;
     
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
                    {/* <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li> */}
                </ul>
            </>
    )
}

    // CharInfo.propTypes ={
    //     charId: PropTypes.array
    // }

export default CharInfo;