import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth_context';

const ProfileForm = () => {

  const passRef = useRef()
  const ctx = useContext(AuthContext)

  const formHandler = (event) => {
    event.preventDefault();
    const password = passRef.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
      method: 'POST',
      body: JSON.stringify({
        password: password,
        idToken: ctx.token,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err.message)
      })

  }

  return (
    <form className={classes.form} onSubmit={formHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={passRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
