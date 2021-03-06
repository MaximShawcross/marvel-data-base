import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {MainPage, ComicsPage, Pages404, SingleComicPage, SingleCharacterPage} from "../pages";

import AppHeader from "../app-header/app-header";

const App = () =>  {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
                <main>
                    <Routes>
                        <Route path = "*" element = { <Pages404/> }/>                        
                        <Route path = "/" element = {<MainPage/>}/>
                        <Route path = "/comics" element = { <ComicsPage/>}/>
                        <Route path = "/comics/:comicId" element = {<SingleComicPage/>}/>
                        <Route path = "/character/:charId" element = {<SingleCharacterPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;