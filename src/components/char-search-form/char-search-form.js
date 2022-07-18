import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage as FormikErrorMassage } from "formik";
import * as Yup from 'yup';

import useMarvelService from "../../services/marvel-service";

import './char-search-form.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null); 
    // const linked = useNavigate(); 

    const { getCharacterByName, error, clearError, loading  } = useMarvelService(); 

    // console.log(getCharacterByName("Wolverine"));
    const onCharLoaded = (char) => {
        setChar(char);
    }    
    
    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded);
    }
    const errorMassage = error ? <div className="char__search-critical-error"></div> : null;
    const content = !char ? null : char.length > 0 ? 
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to = {`/character/${char[0].id}`} className = "button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> : 
        <div className="char__search-error">
            The character was not found. Check the name and try again.
        </div>
 
    return (
        <div className = "char__search-form"> 
            <Formik initialValues={{
                    charName: ''
                }}
                validationSchema ={ 
                    Yup.object({
                        charName: Yup.string()
                            .min(3, '3 symbols is required')
                            .required('name is required field')
                    })
                }
            onSubmit = { ({charName}) => {
                updateChar(charName)

            }}>
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper"> 
                        <Field 
                            type="text" 
                            placeholder = "Enter character name"
                            id = "charName"
                            name = "charName"/>      
                        <button type='submit' 
                            className="button button__main"
                            id = "btn">           
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMassage className = "char__search-error" name = "charName" component = "div"/>  
                </Form>
            </Formik>
            {content}
            {errorMassage}
        </div>
    )
}   

export default CharSearchForm;