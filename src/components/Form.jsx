// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // npm date picker

// Custom hook
import { useUrlPosition } from '../hooks/useUrlPosition';

// Styles
import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css'; // npm date picker css

// Components
import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';

// Context API
import { useCities } from '../contexts/CitiesContext';

// Function to convert the contryCode to an Emoji
export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [emoji, setImoji] = useState('');
	const [geocodingError, setGeocodingError] = useState('');

	// From useUrlPosition custom hook
	const [lat, lng] = useUrlPosition();

	// Consuming context value
	const { createCity, isLoading } = useCities();

	// Programatic navigation (To navigate after submit the form)
	const navigate = useNavigate();

	// Reverse geocoding
	useEffect(
		function () {
			if (!lat && !lng) return; // If the lat and lng is null then just return

			async function fatchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeocodingError('');
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`
					);
					const data = await res.json();

					if (!data.countryCode)
						throw new Error(
							"That doesn't seem to be a city. Click somewhere else 🫣"
						);

					setCityName(data.city || data.locality || '');
					setCountry(data.countryName);
					setImoji(convertToEmoji(data.countryCode));
				} catch (err) {
					setGeocodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fatchCityData();
		},
		[lat, lng]
	);

	// Form submit function
	async function handleSubmit(e) {
		e.preventDefault();

		if (!cityName || !date) return;

		// New city object
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};

		await createCity(newCity);
		navigate('/app/cities');
	}

	if (isLoadingGeocoding) return <Spinner />;

	if (!lat && !lng)
		return <Message message='Start by clicking somewhere on the map' />;

	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ''}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>

				<DatePicker
					id='date'
					selected={date}
					onChange={(date) => setDate(date)}
					dateFormat='dd/MM/yyyy'
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea
					id='notes'
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type='primary'>Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
