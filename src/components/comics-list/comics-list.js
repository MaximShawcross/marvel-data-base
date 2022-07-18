import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/marvel-service';
import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';

import './comics-list.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting': {
            return <Spinner/>
            break;
        } case 'loading': {
            return newItemLoading ? <Component/> : <Spinner/>;
        } case 'confirmed': {
            return <Component/>;
        } case 'error': {
            return <ErrorMessage/>
        } default: {
            throw new Error ('Unexpected process state');    
        }
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {error, loading, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []); 

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false): setNewItemLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    } 

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    // console.log('render');

    function renderItems(comicsList) {
        const items = comicsList.map((item, i) => {
            return (
                <li className="comics__item"
                    key = {item.id} 
                    >
                    <Link to = {`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.thumbnail} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return(
            <ul className="comics__grid">
                {items}
            </ul>           
        )
    }


    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button className="button button__main button__long"
                disabled = {newItemLoading}
                style = {{'display': comicsEnded ? 'none': 'block'}}
                onClick = {() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;