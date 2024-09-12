import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
	// Getting the data from the url using useSearchParams hook (Query String)
	const [searchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	return [lat, lng];
}
