import { useState } from "react";

import ErrorBoundary from "../error-boundary/error-boundary";

import AppHeader from "../app-header/app-header";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info";

import decoration from '../../resources/img/vision.png';

const App = () =>  {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected = {onCharSelected}/> {/* method for state lifting */}                            
                    </ErrorBoundary>                        
                    
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                    </ErrorBoundary>
                    
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;