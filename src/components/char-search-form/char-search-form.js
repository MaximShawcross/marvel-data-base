import { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import './char-search-form.scss';

const CharSearchForm = () => {

    return (
        <Formik initialValues={{
                char: ''
            }}
            validationSchema ={ 
                Yup.object({
                    char: Yup.string()
                        .min(3, '3 symbols is required')
                        .required('name is required field')
                })
            }
        onSubmit = { values => console.log(JSON.stringify(values.char, null, 2))}>
            <Form className = "char__search-form">
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper"> 
                    <Field 
                        type="text" 
                        placeholder = "Enter character name"
                        id = "name"
                        name = "char"/>      
                    <button type='submit' 
                        className="button button__main"
                        id = "btn">           
                        <div className="inner">find</div>
                    </button>
                </div>
                <ErrorMessage className = "char__search-error" name = "char" component = "div"/>  
            </Form>
        </Formik>
    )
}   

export default CharSearchForm;