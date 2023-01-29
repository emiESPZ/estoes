import './NavBar.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <nav className='navBar'>
        <div className='nav-logo'>
          <Link to='/'>
            <img className='logo ' src={logo} alt='logo' />
          </Link>
        </div>
        <div className='separadorFino'></div>
      </nav>
    </>
  );
}

export default NavBar;
