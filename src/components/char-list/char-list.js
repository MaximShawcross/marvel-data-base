import { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/marvel-service';

import './char-list.scss';


const CharList = (props) => {
    const [charList, setCharList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded, setCharEnded] = useState(false);
          const [inAnim, setInAnim] = useState(false)
    // animantion blocl 20-34, 59, 118-128
    const duration = 1200;
    
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: "visible"
    }
    
    const transitionStyles = {
        entering: { opacity: 1, visibility: 'visible'},
        entered:  { opacity: 1, visibility: 'visible' },
        exiting:  { opacity: 0, visibility: 'hidden' },
        exited:  { opacity: 0, visibility: 'hidden' },
    };

    const {error, loading, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])  

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(true): setNewItemLoading(false);

        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
        setInAnim(value => true);
    }

    //refs and active style for char-items
    const itemRefs = useRef([]);

    //active style

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // this method was created for optimization, for dont put it to render ()
    function renderItems(characters) {

        const items =  characters.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return ( 
                <li className = "char__item"
                    key = {item.id}
                    tabIndex = {0}
                    ref={el => itemRefs.current[i] = el}
                    onClick = {() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress = {(e) => {
                        if(e.key === " " || e.key === "Enter"){
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src = {item.thumbnail} alt = {item.name} style = {imgStyle}/>
                    <div className = "char__name">{item.name}</div>
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
        
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (    
        <div className="char__list">
            <Transition timeout={duration} in = {inAnim}>
                {
                    state => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]}}>
                            {items}
                        </div>
                    )
                }
            </Transition>
            {errorMessage}
            {spinner}
            <button className="button button__main button__long"
            disabled = {newItemLoading}
            style = {{'display': charEnded ? 'none': 'block'}}
            onClick = {() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;