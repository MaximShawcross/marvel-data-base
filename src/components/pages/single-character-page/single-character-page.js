import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../../services/marvel-service';

import AppBanner from '../../app-banner/app-banner';
import Spinner from '../../spinner/spinner';
import ErrorMessage from '../../error-message/error-message';
// import Skeleton from '../../skeleton/skeleton';

import './single-character-page.scss';

const SingleCharacterPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, loading, error} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMassage = error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner/>: null;
    const content = !(loading || error || !char) ? <View char = {char}/> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="character page"
                    content="page with choosen character"
                    />
                <title>Character #{charId}</title>
            </Helmet>
            <AppBanner/>        
            {errorMassage}
            {spinner}
            {content}
        </>
    )
}



const View = ({char}) => {

    const {title, description, pageCount, thumbnail, language, price} = char;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage;