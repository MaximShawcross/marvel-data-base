import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../../services/marvel-service';
import setContent from '../../../utils/set-content';

import AppBanner from '../../app-banner/app-banner';

// import Skeleton from '../../skeleton/skeleton';

import './single-сomic.scss';

const SingleComicPage = () => { 
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {getComics, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line
    }, [comicId]);

    const updateComic = () => {
        clearError()
        getComics(comicId)
            .then(onChomicLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onChomicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="comic page"
                    content="page with choosen comic"
                    />
                <title>Comic #{comicId}</title>
            </Helmet>
            <AppBanner/>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {

    const {thumbnail, title, description, pageCount, language, price} = data;

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