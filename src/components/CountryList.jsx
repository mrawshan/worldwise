// Styles
import styles from './CountryList.module.css';

// Components
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

// Context API
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
	// 3) Consuming context value
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message='Add your first city by clicking on a city on the map' />
		);

	// Getting only the unic contries from the cities
	const countries = cities.reduce((arr, crrCity) => {
		if (!arr.map((el) => el.country).includes(crrCity.country))
			return [...arr, { country: crrCity.country, emoji: crrCity.emoji }];
		else return arr;
	}, []);

	console.log(cities);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
}

export default CountryList;
