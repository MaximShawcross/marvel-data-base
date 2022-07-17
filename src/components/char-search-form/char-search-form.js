import { Formik } from "formik";

import './char-search-form.scss';

const CharSearchForm = () => {
    return (
        <div className = "char__search-form">
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
            <div className="char__search-wrapper"> 
                <input type="text"/>         
                <button type='submit' 
                    className="button button__main">           
                    <div className="inner">find</div>
                </button>
            </div>
            
        </div>
    )
}   

export default CharSearchForm;