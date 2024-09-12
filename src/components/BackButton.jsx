import { useNavigate } from 'react-router-dom';

// Component
import Button from './Button';

function BackButton() {
	// Here we are using useNavigate hook to move to backwards
	const navigate = useNavigate();
	return (
		<Button
			type='back'
			onClick={(e) => {
				e.preventDefault();
				navigate(-1);
			}}
		>
			&larr; Back
		</Button>
	);
}

export default BackButton;
