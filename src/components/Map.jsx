import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from 'react-leaflet';

// Custom hook
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';

// Context API related
import { useCities } from '../contexts/CitiesContext';

// styles
import styles from './Map.module.css';

// Components
import Button from './Button';

function Map() {
	// 3) Consuming context value
	const { cities } = useCities();

	const [mapPosition, setMapPosition] = useState([40, 0]);

	// From useUrlPosition custom hook
	const [mapLat, mapLng] = useUrlPosition();

	// From useGeolocation custom hook
	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();

	// Setting the current mapLat and mapLng
	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	// Synchronizing the user current location with mapPosition
	useEffect(
		function () {
			if (geolocationPosition)
				setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
		},
		[geolocationPosition]
	);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type='position' onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use youe position'}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>
								{city.emoji} <span>{city.cityName}</span>
							</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

// Custom component to move to the selected location on the map
function ChangeCenter({ position }) {
	const map = useMap(); // useMap() hook is given by leaflet library (Getting the current instance of the map currently being displayed )
	map.setView(position);
	return null;
}

// Custom component to detect the click on the map (To pop up a form on click)
function DetectClick() {
	// Here we are using useNavigate hook to move to the form
	const navigate = useNavigate();

	// useMapEvents() hook is Provided by leaflet library
	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); // Query string to store the data in the url
		},
	});
}

export default Map;
