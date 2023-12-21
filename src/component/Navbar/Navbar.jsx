import styles from "./Navbar.module.scss"
import { NavLink } from 'react-router-dom';
import {useAuthValue} from "../../context/useAuthContext"


const Navbar = () => {

  const {user} = useAuthValue()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <p>Post</p> 
        <span>+</span>
      </NavLink>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!user && (
          <>
            <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Cadastrar</NavLink>
          </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create">Novo post</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about">Sobre</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar