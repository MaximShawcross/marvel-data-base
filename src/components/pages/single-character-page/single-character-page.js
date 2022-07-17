import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../../services/marvel-service';

import AppBanner from '../../app-banner/app-banner';
import Spinner from '../../spinner/spinner';
import ErrorMessage from '../../error-message/error-message';
import Skeleton from '../../skeleton/skeleton';

import './singleComicLayout.scss';

const SingleCharacterPage = ({data}) => {

    const {title, description, pageCount, thumbnail, language, price} = data;

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
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage;