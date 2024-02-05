import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth_context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainNavigation = () => {
  const ctx = useContext(AuthContext)

  const history = useHistory()

  const logoutHandler = ()=>{
    ctx.logout();
    history.push('/auth')
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!ctx.isLoggedin && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {ctx.isLoggedin && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {ctx.isLoggedin && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
