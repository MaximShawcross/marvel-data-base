import { useState } from "react";

import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info";
import CharSearchForm from "../char-search-form/char-search-form";

import ErrorBoundary from "../error-boundary/error-boundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);


    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                    <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                {/* method for state lifting */}  
                        <CharList onCharSelected = {onCharSelected}/>                           
                </ErrorBoundary>             
                <div>
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>   
                    </ErrorBoundary>
                </div>
            </div>  
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;