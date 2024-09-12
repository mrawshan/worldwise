// Hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Style
import styles from './Login.module.css';

// Componetns
import PageNav from '../components/PageNav';
import Button from '../components/Button';

// Context API
import { useAuth } from '../contexts/FakeAuthContext';

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');

	// Consuming context value
	const { login, isAuthenticated } = useAuth();

	// Programatic navigation (To navigate after submit the login form)
	const navigate = useNavigate();

	// Handle Login
	function handleLogin(e) {
		e.preventDefault();

		if (email && password) login(email, password);
	}

	// Checking if isAuthenticated is true
	useEffect(
		function () {
			if (isAuthenticated) navigate('/app', { replace: true });
		},
		[isAuthenticated, navigate]
	);

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleLogin}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type='primary'>Login</Button>
				</div>
			</form>
		</main>
	);
}
