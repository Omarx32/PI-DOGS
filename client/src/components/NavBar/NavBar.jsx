import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {

  return (
   
      <div className={`${style.container} ${style.transparentBackground }`} >
        <div className={style.logo}>DogsApi</div>
        <ul>
          <li>
            <Link to="/home" className={style.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className={style.link}>
              Create
            </Link>
          </li>
          <li>
            <Link to="/about" className={style.link}>
              About
            </Link>
          </li>
        </ul>
      </div>
   
  );
};

export default NavBar;
