import { createContext, useContext, useReducer } from 'react';

// Context (Provider)
const AuthContext = createContext();

// Initial state for the reducer hook
const initialState = {
	user: null,
	isAuthenticated: false,
};

// Reducer function
function reducer(crrState, action) {
	switch (action.type) {
		case 'login':
			return {
				...crrState,
				user: action.payload,
				isAuthenticated: true,
			};

		case 'logout':
			return {
				...crrState,
				user: null,
				isAuthenticated: false,
			};

		default:
			throw new Error('Unknown action');
	}
}

// User details
const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

// 1) Provider component
function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	// Login function
	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: 'login', payload: FAKE_USER });
	}

	// Logout function
	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

// Custom corresponding hook (Basically to Consume the context value)
function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error('AuthContext was used outside the AuthProvider');
	return context;
}

export { AuthProvider, useAuth };
