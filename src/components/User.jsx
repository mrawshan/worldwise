// Hooks
import { useNavigate } from 'react-router-dom';

// Styles
import styles from './User.module.css';

// Context API
import { useAuth } from '../contexts/FakeAuthContext';

function User() {
	// Consuming context value
	const { user, logout } = useAuth();

	// Here we are using useNavigate hook to move to backwards
	const navigate = useNavigate();

	// Logout
	function handleClick() {
		logout();
		navigate('/');
	}

	return (
		<div className={styles.user}>
			<img src={user.avatar} alt={user.name} />
			<span>Welcome, {user.name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default User;
