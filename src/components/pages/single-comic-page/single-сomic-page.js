import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../../services/marvel-service';

import AppBanner from '../../app-banner/app-banner';
import Spinner from '../../spinner/spinner';
import ErrorMessage from '../../error-message/error-message';
import Skeleton from '../../skeleton/skeleton';

import './single-сomic.scss';

const SingleComicPage = () => { 
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {getComics, clearError, loading, error} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError()
        getComics(comicId)
            .then(onChomicLoaded)
    };

    const onChomicLoaded = (comic) => {
        setComic(comic);
    }


    const errorMassage = error ? <ErrorMessage/>: null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic = {comic}/>: null;
    
    return (
        <>
            <AppBanner/>
            {errorMassage}            
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {

    const {thumbnail, title, description, pageCount, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={thumbnail} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to ="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;