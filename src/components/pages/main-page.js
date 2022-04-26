import { useState } from "react";

import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info";

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
                {/* method for state lifting */}  
            <ErrorBoundary>
                    <CharList onCharSelected = {onCharSelected}/>                           
            </ErrorBoundary>
                        
            <ErrorBoundary>
                <CharInfo charId = {selectedChar}/>
            </ErrorBoundary>
            <img className="bg-decoration" src={decoration} alt="vision"/>
            </div>  
        </>
    )
}

export default MainPage;