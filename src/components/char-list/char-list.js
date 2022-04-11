import { Component } from 'react';

import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';
import MarvelService from '../../services/marvel-service';

import './char-list.scss';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,                   //start value
        charEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }   

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }


        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    onRequest = (offset) => {
        this.onCharListLoading();

        this.marvelService.getALlCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    // this method was created for optimization, for dont put it to render ()
    renderItems(characters) {
        const items =  characters.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick = {() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // constuction for centring error/loading
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (    
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                disabled = {newItemLoading}
                style = {{'display': charEnded ? 'none': 'block'}}
                onClick = {() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;