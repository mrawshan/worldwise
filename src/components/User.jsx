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

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
