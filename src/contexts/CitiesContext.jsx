import {
	createContext,
	useEffect,
	useContext,
	useReducer,
	useCallback,
} from 'react';

// API url
const BASE_URL = 'http://localhost:8000';

// Context (Provider)
const CitiestContext = createContext();

// Initial state for the reducer hook
const intialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};

// Reducer function
function reducer(crrState, action) {
	switch (action.type) {
		case 'loading':
			return {
				...crrState,
				isLoading: true,
			};

		case 'cities/loaded':
			return {
				...crrState,
				isLoading: false,
				cities: action.payload,
			};

		case 'city/loaded':
			return {
				...crrState,
				isLoading: false,
				currentCity: action.payload,
			};

		case 'city/created':
			return {
				...crrState,
				isLoading: false,
				cities: [...crrState.cities, action.payload],
				currentCity: action.payload,
			};

		case 'city/deleted':
			return {
				...crrState,
				isLoading: false,
				cities: crrState.cities.filter(
					(city) => city.id !== action.payload
				),
				currentCity: {},
			};

		case 'rejected':
			return {
				...crrState,
				isLoading: false,
				error: action.payload,
			};

		default:
			throw new Error('Unknown action type');
	}
}

// 1) Provider component
function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		intialState
	);

	// API call
	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: 'loading' });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading cities...',
				});
			}
		}
		fetchCities();
	}, []);

	// Getting the city object by fetching
	const getCity = useCallback(
		async function getCity(id) {
			// If it's a current city then just return no need to call the API again
			if (Number(id) === currentCity.id) return;

			dispatch({ type: 'loading' });
			try {
				const res = await fetch(`${BASE_URL}/cities/${id}`);
				const data = await res.json();
				dispatch({ type: 'city/loaded', payload: data });
			} catch {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading city...',
				});
			}
		},
		[currentCity.id]
	);

	// Adding the new city object to the fake API (Post request to API)
	async function createCity(newCity) {
		dispatch({ type: 'loading' });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();

			// Adding the newCity to the state with the current city
			dispatch({ type: 'city/created', payload: data });
		} catch {
			dispatch({
				type: 'rejected',
				payload: 'There was an error creating the city...',
			});
		}
	}

	// Deleting the city
	async function deleteCity(id) {
		dispatch({ type: 'loading' });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});

			// Adding the newCity to the state with the current city
			dispatch({ type: 'city/deleted', payload: id });
		} catch {
			dispatch({
				type: 'rejected',
				payload: 'There was an error deleting the city...',
			});
		}
	}

	return (
		// 2) Provide value to child components
		<CitiestContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiestContext.Provider>
	);
}

// Custom corresponding hook (Basicaly to Consum the context value)
function useCities() {
	const context = useContext(CitiestContext);
	if (context === undefined)
		throw new Error('CitiesContext was used outside the CitiesProvider');
	return context;
}

export { CitiesProvider, useCities };
