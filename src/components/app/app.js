import { Component } from "react";

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
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected = {this.onCharSelected}/> {/* method for state lifting */}
                        <CharInfo charId = {this.state.selectedCharacter}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;