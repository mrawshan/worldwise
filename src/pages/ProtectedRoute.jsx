// Hooks
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Context API
import { useAuth } from '../contexts/FakeAuthContext';

function ProtectedRoute({ children }) {
	// Consuming context value
	const { isAuthenticated } = useAuth();

	// Here we are using useNavigate hook
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated) navigate('/');
		},
		[isAuthenticated, navigate]
	);

	return isAuthenticated ? children : null;
}

export default ProtectedRoute;
