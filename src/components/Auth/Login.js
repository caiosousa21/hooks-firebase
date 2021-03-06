import React, { useState } from "react";

import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser(){
    const { name, email, password } = values;
    try{
      login 
        ? await firebase.login(email, password) 
        : await firebase.register(name, email, password)
      props.history.push("/");
    }catch(err){
      setFirebaseError(err.message);
    }
  }

  return (
    <div>
      <h2 className='mv3'>{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className='flex flex-column'>
        {!login && <input 
          type='text'
          placeholder='Your name'
          autoComplete='off'
          name='name'
          value={values.name}
          onChange={handleChange}
        />}
        <input 
          type='email'
          onBlur={handleBlur}
          placeholder='Your email'
          autoComplete='off'
          name='email'
          className={ errors.email && 'error-input' }
          value={values.email}
          onChange={handleChange}
        />
        { errors.email && <p className="error-text">{errors.email}</p> }
        <input 
          type='password'
          onBlur={handleBlur}
          placeholder='Choose a sacure password'
          name='password'
          className={ errors.password && 'error-input' }
          value={values.password}
          onChange={handleChange}
        />
        { errors.password && <p className="error-text">{errors.password}</p> }
        { firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className='flex mt3'>
          <button 
            type='submit' 
            className='button pointer mr2' 
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange"}}
          >
            Submit
          </button>
          <button type='button' className="pointer button" onClick={()=>setLogin(prevLogin => !prevLogin)}>
            {login ? "need to create account" : "already have an account"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;
