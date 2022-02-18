import React, { useEffect, useState, useRef } from 'react';
import Icon from "./Icon.js";
import Checkbox from "./Checkbox.js";
import Success from "../Components/Success.js";
import axios from 'axios';

export default function SignupForm () {
    const firstRender = useRef(true);

    const [disable, setDisabled] = useState(false);
  
    const [nameError, setNameError] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
    setDisabled(formValidation());
    }, [email, isChecked]); 
  
    const formValidation = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let valid = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'); // check if email is valid
        let restrict = new RegExp('(.co)$'); // restricts Colombia from subscription
        if (email === "") {
          setNameError('Email address is required');
          return true;
        }
        else if (valid.test(email) === false) {
            setNameError('Please provide a valid e-mail address');
            return true;
        }    
        else if (restrict.test(email) === true) {
            setNameError('We are not accepting subscriptions from Colombia emails.');
            return true;
        }
        else if (isChecked === false) {
            setNameError('You must accept the terms and conditions');
            return true;
        }
        else {
          setNameError(null);
          return false;
        }
    }

    const handleChange = ({target}) => {
        setEmail(target.value);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("email", email);
        const url = '/api/insertData.php';
        axios.post(url, formData).then(response => console.log(response.data))
            .catch(err => console.log(err));
        setSubscribed(true);
    }


    return (

        <div className="signup__form">
          {subscribed && (
            <Success 
              heading="Thanks for subscribing!" 
              description="You have successfully subscribed to our email listing. Check your email for the discount code." 
              className="text__section--success" />
            )}          
          {!subscribed && (
            <Success 
              heading="Subscribe to newsletter" 
              description="Subscribe to our newsletter and get 10% discount on pineapple glasses." />
            )}
          {!subscribed && (
            <form onSubmit={handleSubmit}>
                <div className={`input__field input__field--text global__margin ${disable ? 'input__field--error' : '' }`}>
                    <label htmlFor=""></label>
                        <input 
                            id="email"
                            type="email"
                            name="email" 
                            required
                            value={email} 
                            onChange={handleChange} 
                            placeholder="Type your email address here..."
                            className="field__text" />
                        <div className="field__submit">
                            <Icon name="arrow-right"/>
                            <input type="submit" value="" disabled={disable}/>
                        </div>
                    { nameError && <p className="error">{nameError}</p> }
                </div>
                <div className="input__field input__field--checkbox global__margin">
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => {
                              setIsChecked(!isChecked);
                            }}
                          />
                      <span className={`checkbox ${isChecked ? "checkbox--active" : ""}`}>
                          <Icon name="checkmark" />
                      </span>
                      <span>I agree to </span>
                    </label>
                    <a href="#">terms of service</a>
                </div>
            </form>
            )}
        </div>
    );
};