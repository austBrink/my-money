import react, { useState, useEffect } from 'react';
import {
    login
} from '../../utils/firebase';
import { TextField, Button } from '../OurComponents/OurComponents'
import './login.css';

const Login = () => {

    const initialCredentials = {
        username: '',
        password: '',
    }

    // set formValues will be called onChange of the username and password field pairs. 
    const [ formValues, setFormValues ] = useState(initialCredentials);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState({});

    useEffect(() => {
        if(Object.keys(formErrors).length == 0 && isSubmitting){
            submit();
        }
    }, [formErrors, isSubmitting]);

    /**
     * @Todo might be leaving the front end work to my man Teo...
     * login form needs returned...
     * With a username and password text field
     * signin button. 
     * signup button -> will navigate (or be link to) the signup page.
     */
    // 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors({...validate(formValues)});
        setIsSubmitting(true);
    }

    const validate = () => {
        const errors = {}
        return {};
        // for(key in formValues) {

        // }
    }

    const submit = () => {
        console.log(formValues);
        login(formValues.username, formValues.password)
        .then((userCredential) => {
            console.log(userCredential.user);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className = 'App-login-wrapper'>
            <form className = 'App-login-form' onSubmit = {handleSubmit}>
                <TextField 
                    label = {'username'}
                    name = {'username'}
                    value = {formValues.username}
                    onChange = {handleChange}
                />
                <TextField 
                    label = {'password'}
                    name = {'password'}
                    value = {formValues.password}
                    type = {'password'}
                    onChange = {handleChange}
                />
                <Button type = 'submit' label = 'LOGIN'>
                    
                </Button>
            </form>
        </div>
    )
}

export default Login;