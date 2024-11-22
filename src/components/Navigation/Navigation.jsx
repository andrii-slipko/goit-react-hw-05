import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'

const Navigation = () => (
  <nav>
    <ul className={styles.list}>
      <li className={styles.listItem}><Link to="/">Home</Link></li>
      <li className={styles.listItem}><Link to="/movies">Movies</Link></li>
    </ul>
  </nav>
);

export default Navigation;