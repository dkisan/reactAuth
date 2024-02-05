import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth_context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const [isLogin, setIsLogin] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formHandler = (event) => {
    event.preventDefault()
    setIsSending(true)
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68'
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        setIsSending(false)
        if (res.ok) {
          const data = await res.json()
          if (isLogin) {
            authCtx.login(data.idToken)
history.push('/profile')
          } else {
            console.log(data)
          }
        } else {
          return res.json().then(data => {
            alert(data.error.message)
          })
        }
      })


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            ref={passwordRef}
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
          {!isSending && <button>{isLogin ? 'Login' : 'Signup'}</button>}
          {isSending && <p>sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
