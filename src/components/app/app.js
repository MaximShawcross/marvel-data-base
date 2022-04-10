import { Component } from "react";

import ErrorBoundary from "../error-boundary/error-boundary";

import AppHeader from "../app-header/app-header";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedCharacter: null,
    }

    onCharSelected = (id) => {
        this.setState({selectedCharacter: id})
    }

    render () {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected = {this.onCharSelected}/> {/* method for state lifting */}                            
                        </ErrorBoundary>                        
                       
                        <ErrorBoundary>
                            <CharInfo charId = {this.state.selectedCharacter}/>
                        </ErrorBoundary>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;