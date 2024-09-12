import { NavLink } from 'react-router-dom';

// Styles
import styles from './PageNav.module.css';

// Components
import Logo from '../components/Logo';

function PageNav() {
	return (
		<>
			<img className={styles.mobNav} src='/public/mobile-nav.gif' alt='' />
			<nav className={styles.nav}>
				<Logo />

				<ul>
					<li>
						<NavLink to='/pricing'>Pricing</NavLink>
					</li>
					<li>
						<NavLink to='/product'>Product</NavLink>
					</li>
					<li>
						<NavLink to='/login' className={styles.ctaLink}>
							Login
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default PageNav;
