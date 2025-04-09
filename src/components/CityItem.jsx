import { Link } from 'react-router-dom';

// Styles
import styles from './CityItem.module.css';

// Context API related
import { useCities } from '../contexts/CitiesContext';

// Function to formate date
const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

function CityItem({ city }) {
	// Consuming context value
	const { currentCity, deleteCity } = useCities();
	const { cityName, emoji, date, id, position } = city;

	// Handler click function
	function handleClick(e) {
		e.preventDefault(); // By doing this we can prevent the Link open.
		deleteCity(id);
	}

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					id === currentCity.id ? styles['cityItem--active'] : ''
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
