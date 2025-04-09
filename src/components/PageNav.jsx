import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import styles from './PageNav.module.css';

// Components
import Logo from '../components/Logo';

function PageNav() {
	const [activeMobNav, setActiveMobNav] = useState(false);

	return (
		<>
			{/* Mobile nav button */}
			<img
				className={styles.mobNav}
				onClick={() => setActiveMobNav((crrV) => !crrV)}
				src='/public/mobile-nav.gif'
				alt='Mobile Navigation'
			/>

			{/* Overlay for mobile nav menu */}
			<div
				className={`${styles.mobileNavOverlay} ${
					activeMobNav ? '' : `${styles.hidden}`
				}`}
			></div>

			<nav className={styles.nav}>
				<Logo />

				<ul style={{ display: `${activeMobNav ? 'inline-flex' : ''}` }}>
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
