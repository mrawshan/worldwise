import { Outlet } from 'react-router-dom';

// Styles
import styles from './Sidebar.module.css';

// Components
import Logo from './Logo';
import AppNav from './AppNav';
import Footer from './Footer';

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			{/* Here we are taking the nested route using <Outlet/> */}
			<Outlet />

			<Footer />
		</div>
	);
}

export default Sidebar;
