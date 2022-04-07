import { Component } from 'react';

import ErrorMassage from '../error-massage/error-massage';
import Spinner from '../spinner/spinner';
import MarvelService from '../../services/marvel-service';

import './char-list.scss';


class CharList extends Component {
    state = {
        loading: true,
        chars: null,
        error: false
    }
    

    componentDidMount() {
        this.updateCharacterLodaed()
    }
    
    marvelService = new MarvelService()
    
    updateCharacterLodaed = () => {
        this.marvelService.getALlCharacters()
            .then(this.onCharacterListLoaded)
            .catch(this.error)
    }
    
    onCharacterListLoaded = (chars) => {
        this.setState ({
            loading: false, 
            error: false,           
            chars: chars
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const {chars, loading, error} = this.state;
        
        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || errorMassage) ? chars.map(item => {return <View key ={item.id} character={item}/>}) : null


        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMassage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    

}

const View = ({character}) => {
    const {name, thumbnail} = character;

    return(
        <li className="char__item">   {/* _selected */}
            <img src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;